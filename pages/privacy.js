import { colors, breakPoints } from '../styles/theme';

const PrivacyNote = () => {
  return (
    <section className="privacy-page section">
      <h1>Privacy Policy</h1>
      <div className="privacy-content">
        <h2>Who we are</h2>
        <p>Our website address is: http://seriouswoo.local.</p>

        <h2>What personal data do we collect and how do we collect it?</h2>
        <p>
          {' '}
          You directly provide Our Company with most of the data we collect. We collect data and
          process data when you:
        </p>
        <ul className="privacy-ul">
          <li>Fill out and submit a contact from</li>
          <li>Fill out and submit a form to place an order (chekout form)</li>
        </ul>

        <h4>Contact Form</h4>
        <p>
          If you contact us using the contact form, we will collect your name and e-mail address
          (and any additional data you may provide us with) to be able to respond to your questions.
          We
        </p>

        <h4>Newsletter Sign Up</h4>
        <p>
          Currently newsletter-signup is disabled. No data will be sent or stored when you submit
          your email address.
        </p>

        <h4>Regsitration</h4>
        <p>
          Currently registration is disabled. No data will be sent or stored when you submit the
          registration form.
        </p>

        <h4>Orders</h4>
        <p>
          We currently do not fulffill orders made on this website. We do however provide a checkout
          form. If you fill out and submit this form, the name, email, shipping- and billing-address
          you entered will be transmitted to our server. This is done to demonstrate the
          functionality of this website, not to collect user data. Orders made through this website
          (and all related data) will be deleted from the server on a regular basis (at least every
          3 months).
        </p>

        <h2>How we use your data</h2>
        <p>
          We only collect and further process your personal data for the purposes mentioned in the
          previous section. Unless the further use of your data is compatible with the original
          purpose for which the data was collected, we will ask for your consent before using your
          personal data for purposes other than those listed above. We will inform you of, and, if
          necessary ask your consent for, any changes in the use of your personal data.
        </p>

        <h2>How long do we store your data?</h2>
        <p>
          Any data submitted during the checkout process (order placement) will be deleted on a
          regular basis, at least every 3 months.
        </p>
        <p>
          Data submitted through the contact form will emailed directly to us and not stored in the
          database. Emails generated through this process will be stored as long as it is necessary
          to process your request and deleted afterwards.
        </p>

        <h2>How we may share your data</h2>
        <p>We do not share information with third parties.</p>
      </div>

      <style jsx>{`
        .privacy-page {
          flex-direction: column;
        }

        h1 {
          color: rgb(${colors.lightblue});
        }

        .privacy-content {
          max-width: 100rem;
        }

        h2 {
          padding: 2rem 0 1rem 0;
        }

        p,
        ul {
          text-align: justify;
          margin-bottom: 1rem;
        }

        .privacy-ul {
          list-style: initial;
          list-style-position: inside;
        }
      `}</style>
    </section>
  );
};

export default PrivacyNote;
