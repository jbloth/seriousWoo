import { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

import { UserContext } from '../components/context/UserContext';
import { breakPoints } from '../styles/theme';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      authToken
      user {
        id
        userId
        nicename
        databaseId
        jwtAuthToken
        jwtAuthExpiration
        jwtRefreshToken
      }
      customer {
        customerId
        id
        jwtAuthToken
        jwtAuthExpiration
        jwtRefreshToken
      }
    }
  }
`;

const SET_TOKEN = gql`
  mutation SetToken($token: String!) {
    setToken(token: $token) @client
  }
`;

const LoginForm = () => {
  const { currentUser, loginUser } = useContext(UserContext);
  if (currentUser) {
    Router.push('/myAccount');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Input for Login mutation
  const [loginInput, setLoginInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // const [setToken, { data: setTokenData }] = useMutation(SET_TOKEN);

  // Use login-mutation
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(
    LOGIN_USER,
    {
      // onCompleted: async (data) => {
      //   if (data.login && data.login.user) {
      //     loginUser(data.login.user);
      //     console.log('token from login:');
      //     console.log(data.login.user.jwtAuthToken);
      //     await setToken({ variables: { token: data.login.user.jwtAuthToken } });
      //     // Set form field vaues to empty.
      //     setErrorMessage('');
      //     setEmail('');
      //     setPassword('');
      //     // Send the user to My Account page on successful login.
      //     Router.push('/myAccount');
      //   } else {
      //     setErrorMessage('User not found'); // TODO
      //   }
      // },
      // onError: (error) => {
      //   if (error) {
      //     console.log(error);
      //     setErrorMessage(error.graphQLErrors[0].message);
      //   }
      // },
    }
  );

  useEffect(() => {
    async function doLoginMutations() {
      if (null !== loginInput) {
        const ldata = await login({
          variables: {
            input: loginInput,
          },
        });

        if (loginError) {
          console.log(loginError);
          setErrorMessage(loginError);
          return;
        }

        if (ldata.data && ldata.data.login && ldata.data.login.user) {
          loginUser(ldata.data.login.user);

          // const tdata = await setToken({
          //   variables: { token: ldata.data.login.user.jwtAuthToken },
          // });

          // Set form field vaues to empty.
          setErrorMessage('');
          setEmail('');
          setPassword('');

          // Send the user to My Account page on successful login.
          Router.push('/myAccount');
        } else {
          setErrorMessage('Login failed. No user data received');
        }
      }
    }
    doLoginMutations();
  }, [loginInput]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: validate and sanitize
    setLoginInput({ clientMutationId: 'uniqueId', username: email, password });
  };

  return (
    <div className="login-form-container">
      <form method="post" className="login-form" onSubmit={(e) => handleLogin(e)}>
        <div className="textInput-wrap">
          <TextInput
            name="email"
            type="text"
            label="Email or Username"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="password"
            type="password"
            label="Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="submit-wrap">
          <Button type="submit" extraClass="btn--big" disabled={loginLoading ? 'disabled' : ''}>
            LOGIN
          </Button>
        </div>

        {errorMessage && (
          <div className="error-wrap">
            <p className="error-msg">{'Login failed. Error: ' + errorMessage}</p>
          </div>
        )}
      </form>

      <style jsx>{`
        .login-form-container {
          display: flex;
          flex-direction: column;
          width: 50%;
          max-width: 50rem;
          min-height: 300px;
        }

        .textInput-wrap,
        .textArea-wrap,
        .submit-wrap {
          flex-grow: 1;
          margin-top: 3rem;
        }

        .error-wrap {
          margin: 2rem 0;
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .login-form-container {
            width: 80%;
            max-width: 40rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
