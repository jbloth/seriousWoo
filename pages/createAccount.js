import { colors } from '../styles/theme';
import SigninForm from '../components/SigninForm';

const CreateAccount = () => {
  return (
    <section className="signin-page section">
      <h1>Create an Account</h1>
      <SigninForm />

      <style jsx>{`
        .signin-page {
          flex-direction: column;
        }

        h1 {
          color: rgb(${colors.lightblue});
        }
      `}</style>
    </section>
  );
};

export default CreateAccount;
