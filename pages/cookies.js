import { colors } from '../styles/theme';

const CookieNote = () => {
  return (
    <section className="cookie-page section">
      <h1>Cookies and Local Storage Statement</h1>
      <div className="cookie-content">
        <h2>What are cookies?</h2>
        <p>
          This website uses cookies. Cookies are text files placed on your computer that allow us to
          recognize and remember you and your interaction with our website. When you visit our
          website, we may collect information from you automatically through cookies or similar
          technology
        </p>

        <h2>What is local storage?</h2>
        <p>
          This website uses cookies. Cookies are text files placed on your computer that allow us to
          recognize and remember you and your interaction with our website. When you visit our
          website, we may collect information from you automatically through cookies or similar
          technology
        </p>

        <h2>What type of cookies do we use?</h2>
        <h4>Essential</h4>
        <p>
          These cookies are essential to provide the services that you request from us. We use
          cookies to determine whether a user is logged in and then deliver the right experience and
          features to that unique user. We also use cookies to save your preferences concerning
          cookies.
        </p>

        <h2>Disabling or removing cookies</h2>
        <p>
          You can set your browser not to accept cookies. However, in a few cases, some of our
          website features may not function as a result. All modern browsers provide information
          about the disabling of cookies. Below are a few links to instructions from the most
          commonly used browsers:
        </p>

        <ul className="cookie-ul">
          <li>
            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer?redirectlocale=en-US&redirectslug=Cookies">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.google.com/chrome/answer/95647?hl=en">Google Chrome</a>
          </li>
          <li>
            <a href="https://support.apple.com/de-de/guide/safari/sfri11471/mac">Apple Safari</a>
          </li>
          <li>
            <a href="https://www.opera.com/de/case-studies/clean-browser-and-remove-trackers">
              Opera
            </a>
          </li>
        </ul>

        <h2>Changes to this cookie statement</h2>
        <p>
          This cookie statement is subject to change, so please consult this page regularly for the
          correct and up-to-date version.
        </p>

        <h2>How to contact us</h2>
        <p>
          If you have any questions about Our Company’s cookie policy, the data we hold on you, or
          you would like to exercise one of your data protection rights, please do not hesitate to
          contact us.
        </p>
        <p>TODO: email here</p>
        <p>TODO: address here</p>
      </div>

      <style jsx>{`
        .cookie-page {
          flex-direction: column;
        }

        h1 {
          color: rgb(${colors.lightblue});
        }

        .cookie-content {
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

        .cookie-ul {
          list-style: disc;
        }

        .cookie-ul li {
          list-style-position: outside;
          margin-left: 1em;
        }
      `}</style>
    </section>
  );
};

export default CookieNote;
