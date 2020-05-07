import { colors } from '../styles/theme';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <section className="contact-page section">
      <h1>Contact</h1>
      <ContactForm />

      <style jsx>{`
        .contact-page {
          flex-direction: column;
        }

        h1 {
          color: ${colors.lightblue};
        }
      `}</style>
    </section>
  );
};

export default Contact;
