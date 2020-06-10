import { colors, breakPoints } from '../styles/theme';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <section className="login-page section">
      <h1>Login</h1>
      <div className="demo-msg">
        <p>
          Currently, you can not create a new account on this site. To view an account page, you can
          log in with the following credentials:
        </p>
        <br />
        <p>Userame: Tach Auch</p>
        <p>Password: tach</p>
      </div>

      <LoginForm />

      <style jsx>{`
        .login-page {
          flex-direction: column;
        }

        h1 {
          color: rgb(${colors.lightblue});
        }

        .demo-msg {
          width: 70%;
          max-width: 70rem;
          text-align: left;
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .demo-msg {
            width: 80%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .demo-msg {
            width: 90%;
          }
        }
      `}</style>
    </section>
  );
};

export default Login;
