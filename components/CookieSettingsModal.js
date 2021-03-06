import { useContext, useEffect } from 'react';
import { withApollo } from 'react-apollo'; // To reset Apollo cache on logout
import Link from 'next/link';

import auth from '../lib/auth';
import { CookieConsentContext } from '../components/context/CookieConsentContext';
import CloseIcon from './graphics/CloseIcon';
import { colors, breakPoints } from '../styles/theme';
import Button from './Button';

const CookieSettingsModal = ({ active, closeModal, client }) => {
  const { consentState, dispatchCookieConsent } = useContext(CookieConsentContext);

  // Add Listener to close modal when "ESC" key is pressed
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        closeModal();
      }
    }

    document.addEventListener('keydown', keyListener);
    return () => document.removeEventListener('keydown', keyListener);
  }, []);
  
  return (
    <div className={`background-modal ${active ? 'background-modal--active' : ''}`}>
      <div className="cookie-settings-modal">
        <div className="icon-wrapper close-icon" aria-label="Close">
          <CloseIcon onClick={closeModal} />
        </div>
        <h2>Cookie Settings</h2>
        <p>
          Here you can accept or decline cookies on our website. If you decide to decline all
          cookies, there will still be a few essential cookies, like the one that remembers your
          decision regarding cookies. Also, if cookies are disabled, login is no longer possible. If
          your are logged in, you will be logged out immediately.
        </p>
        <p>
          To learn more about how this site uses cookies, please visit our{' '}
          <Link href="/cookies">
            <a onClick={closeModal}>cookie statement.</a>
          </Link>
        </p>

        <div className="row">
          <div className="buttons-container">
            <div className="button-wrap">
              <Button
                onClick={() => {
                  dispatchCookieConsent({ type: 'agree' });
                  closeModal();
                }}
              >
                I agree
              </Button>
            </div>
            <div className="button-wrap">
              <Button
                extraClass="btn--inverted"
                onClick={() => {
                  dispatchCookieConsent({ type: 'decline' });
                  auth.logoutUser();
                  client.resetStore();
                  closeModal();
                }}
              >
                I decline
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .background-modal {
          display: none;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: fixed;
          background-color: rgba(${colors.bg}, 0.6);
        }

        .background-modal--active {
          display: block;
          z-index: 100;
        }

        .cookie-settings-modal {
          position: relative;
          max-height: 100vh;
          overflow-y: auto;
          top: 15%;
          margin: 0 auto;
          width: 60rem;
          background-color: rgb(${colors.lighterblue});
          padding: 6rem;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: rgb(${colors.darkpink});
          cursor: pointer;
        }

        h2 {
          color: rgb(${colors.orange});
          padding-bottom: 2rem;
        }

        p {
          color: rgb(${colors.textblue});
          margin-bottom: 2rem;
        }

        .row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 3rem;
        }

        .buttons-container {
          width: 40%;
          display: flex;
          justify-content: space-between;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .buttons-container {
            width: 50%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .cookie-settings-modal {
            width: 50rem;
          }

          .buttons-container {
            width: 60%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .cookie-settings-modal {
            width: 100%;
            top: 5%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .buttons-container {
            width: 80%;
          }

          .button-wrap {
            margin: 0 1rem 0 0;
          }

          .button-wrap:last-of-type {
            margin: 0 0 0 1rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .cookie-settings-modal {
            padding: 6rem 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default withApollo(CookieSettingsModal);
