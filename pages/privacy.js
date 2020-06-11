import { colors } from '../styles/theme';

const PrivacyNote = () => {
  return (
    <section className="privacy-page section">
      <h1>Privacy Policy</h1>
      <div className="privacy-content">
        <h2>Who we are</h2>
        <p>Controller of you personal data on this website is:</p>
        <p>TODO</p>
        <p>Our website address is: http://seriouswoo.local.</p>

        <h2>Collection of non-personal data</h2>
        <p>
          We automatically collect non-personal information, i.e., information that is not
          associated with a specific individual, from you when you visit the Websites and/or use our
          Services. This information may include your Internet Protocol ("IP") address (which is the
          number automatically assigned to your computer whenever you access the Internet), browser
          type and language, Internet service provider (“ISP”), referring and exit pages, operating
          system, date and time stamp, and other data. The IP address does not identify your name,
          email address, or other personal information. We may use your IP address to help diagnose
          problems with our server, to administer our Websites, understand and analyze trends, learn
          about user behavior on the site, and to gather demographic information about our user base
          as a whole.
        </p>

        <h2>What personal data do we collect and how do we collect it?</h2>
        <p>
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

        <h2>Where do we store your data?</h2>
        <p>
          We securely store your data at [TODO: enter the location and describe security precautions
          taken].
        </p>

        <h2>How we may share your data</h2>
        <p>We do not share information with third parties.</p>

        <h2>What rights you have over your data</h2>
        <p>
          If you have an account on this site, or have left comments, you can request to receive an
          exported file of the personal data we hold about you, including any data you have provided
          to us. You can also request that we erase any personal data we hold about you. This does
          not include any data we are obliged to keep for administrative, legal, or security
          purposes.
        </p>

        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise
          any of these rights, please contact us at our email:
        </p>
        <p>TODO: email here</p>

        <h2>Privacy policies of other websites</h2>
        <p>
          This website may contain links to other websites. Our privacy policy applies only to our
          website, so if you click on a link to another website, you should read their privacy
          policy.
        </p>

        <h2>Cookies</h2>
        <p>
          Cookies are text files placed on your computer to collect standard Internet log
          information and visitor behavior information. When you visit our websites, we may collect
          information from you automatically through cookies or similar technology
        </p>

        <h4>How do we use cookies?</h4>
        <p>
          We use cookies in a range of ways to improve your experience on our website, including:
        </p>
        <ul className="privacy-ul">
          <li>Keeping you signed in once you have filled out the login form</li>
          <li>
            Enhacing your user experience on this website for example by keeping track of items you
            put in your shopping cart
          </li>
        </ul>

        <h4>What type of cookies do we use?</h4>
        <p></p>
        <h2>How to contact us</h2>
        <p>
          If you have any questions about Our Company’s privacy policy, the data we hold on you, or
          you would like to exercise one of your data protection rights, please do not hesitate to
          contact us.
        </p>
        <p>TODO: email here</p>
        <p>TODO: address here</p>
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
