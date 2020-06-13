import Link from 'next/link';

import { colors, breakPoints } from '../styles/theme';
import Button from './Button';

const CookieBanner = ({ dispatch }) => {
  return (
    <div className="cookie-banner">
      <div className="cookie-consent-container">
        <div className="banner-text">
          {/* <h4 className="cookie-claim">This website uses cookies.</h4> */}
          <p className="cookie-statement-msg">
            This website uses cookies to improve your user experience and to analyze how our site is
            used. Please read our{' '}
            <Link href="/cookies">
              <a>cookie statement</a>
            </Link>{' '}
            for more information.
          </p>
        </div>
        <div className="buttons-container">
          <div className="button-wrap">
            <Button onClick={() => dispatch({ type: 'agree' })}>I agree</Button>
          </div>
          <div className="button-wrap">
            <Button extraClass="btn--inverted" onClick={() => dispatch({ type: 'decline' })}>
              I decline
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cookie-banner {
          width: 100%;
          background-color: rgba(${colors.lightviolet}, 0.4);
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cookie-consent-container {
          display: flex;
          justify-content: space-between;
          width: 80%;
          max-width: 90rem;
        }

        .banner-text {
          display: flex;
          align-items: baseline;
        }

        .cookie-claim {
          margin-right: 2rem;
          color: rgb(${colors.orange});
        }

        .cookie-statement-msg {
          font-size: 1.4rem;
        }

        .buttons-container {
          display: flex;
          align-items: center;
        }

        .button-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
