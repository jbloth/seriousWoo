import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import Cookies from 'js-cookie';

import validateAndSanitizeLoginInput from '../lib/validateAndSanitizeLoginInput';
import clientConfig from '../clientConfig';
import { loginUser } from '../lib/auth';
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

const LoginForm = ({ authToken }) => {
  // Get auth token (to decide wether to render link to login or account page)
  // On server: get token from props (passed down from _app)
  let token = authToken;
  // In browser: get token from cookie
  if (process.browser) {
    const tokencookie = Cookies.get(clientConfig.authTokenName);
    token = tokencookie ? tokencookie : null;
  }

  if (token) {
    Router.push('/myAccount');
  }

  const initialState = {
    email: '',
    password: '',
    errors: null,
    mainError: null,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const newState = { ...formData, [event.target.name]: event.target.value };
    setFormData(newState);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Input for Login mutation
  const [loginInput, setLoginInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Use login-mutation
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(
    LOGIN_USER
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

    // validate and sanitize
    const validatededInput = validateAndSanitizeLoginInput(formData);
    if (!validatededInput.isValid) {
      setFormData({ ...formData, errors: validatededInput.errors });
      return;
    }

    // call mutation
    setLoginInput({
      clientMutationId: 'uniqueId',
      username: validatededInput.sanitizedData.email,
      password: validatededInput.sanitizedData.password,
    });
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
            value={formData.email}
            onChange={handleChange}
            error={formData.errors && formData.errors.email ? formData.errors.email : null}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="password"
            type="password"
            label="Password"
            required={true}
            value={formData.password}
            onChange={handleChange}
            error={formData.errors && formData.errors.password ? formData.errors.password : null}
          />
        </div>

        <div className="submit-wrap">
          <Button type="submit" extraClass="btn--big" disabled={loginLoading ? 'disabled' : ''}>
            {loginLoading ? 'loading...' : 'LOGIN'}
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
