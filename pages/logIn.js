import { colors } from '../styles/theme';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <section className="login-page section">
      <h1>Login</h1>
      <LoginForm />

      <style jsx>{`
        .login-page {
          flex-direction: column;
        }

        h1 {
          color: rgb(${colors.lightblue});
        }
      `}</style>
    </section>
  );
};

export default Login;
