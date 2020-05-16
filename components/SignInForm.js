import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

import { isEmpty } from '../lib/functions';
import { isUserValidated } from '../lib/auth';
import { breakPoints } from '../styles/theme';
import clientConfig from '../clientConfig';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        jwtAuthToken
        jwtRefreshToken
        id
        name
        userId
        nicename
      }
    }
  }
`;

const SigninForm = () => {
  // TODO: evtl redirect zu myaccount
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Input for Register User mutation
  const [signinData, setSigninData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (null !== signinData) {
      // Call the login mutation when the value for loginData changes/updates.
      registerUser();
    }
  }, [signinData]);

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: {
      input: signinData,
    },
    onCompleted: (data) => {
      console.log(data);

      if (data.registerUser.user.jwtAuthToken) {
        // Set the authtoken, user id and username in the localStorage.
        localStorage.setItem(clientConfig.authTokenName, JSON.stringify(data.registerUser));

        // Set form field vaues to empty.
        setUsername('');
        setErrorMessage('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');

        // Send the user to My Account page on successful login.
        Router.push('/myAccount');
      }
    },
    onError: (error) => {
      if (error) {
        console.log(error);
        setErrorMessage(error.graphQLErrors[0].message);
      }
    },
  });

  const handleSignin = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage('Passwords fo not match');
      return;
    }

    // TODO: validate and sanitize
    setSigninData({ clientMutationId: 'Elmo', username, password, email });
  };

  return (
    <div className="signin-form-container">
      <form method="post" className="signin-form" onSubmit={(e) => handleSignin(e)}>
        <div className="textInput-wrap">
          <TextInput
            name="username"
            type="text"
            label="Name"
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="email"
            type="text"
            label="Email"
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

        <div className="textInput-wrap">
          <TextInput
            name="repeatPassword"
            type="password"
            label="Repeat Password"
            required={true}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <div className="submit-wrap">
          <Button type="submit" extraClass="btn--big" disabled={loading ? 'disabled' : ''}>
            CREATE ACCOUNT
          </Button>
        </div>

        {errorMessage && (
          <div className="error-wrap">
            <p className="error-msg">{errorMessage}</p>
          </div>
        )}
      </form>

      <style jsx>{`
        .signin-form-container {
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
          .signin-form-container {
            width: 80%;
            max-width: 40rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SigninForm;
