import { useContext, useEffect } from 'react';

import { AppContext } from '../components/context/AppContext';
import CloseIcon from './graphics/CloseIcon';
import { colors, breakPoints } from '../styles/theme';
import Button from './Button';

const DemoMsgModal = () => {
  const { closeDemoMsg } = useContext(AppContext);

  // Add Listener to close modal when "ESC" key is pressed
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        closeDemoMsg();
      }
    }

    document.addEventListener('keydown', keyListener);
    return () => document.removeEventListener('keydown', keyListener);
  }, []);

  return (
    <div className="background-modal">
      <div className="demo-msg-modal" role="dialog" aria-modal="true">
        <div className="icon-wrapper close-icon" aria-label="Close">
          <CloseIcon onClick={closeDemoMsg} />
        </div>
        <h2>This is just a demo</h2>
        <div className="msg-text">
          <p>
            This website is currently only serves demonstration purposes. You cannot purchase
            products from the shop and you cannot register as a user. While it is possible to place
            an order, these orders will not be fullfilled and deleted on a regular basis.
          </p>
          <p>
            If you really want to purchase any of the products on this site, or if you would like
            hire the developer of this site, you can message me using the contact form and I'll see
            what I can do...
          </p>
        </div>

        <div className="row">
          <div className="button-wrapper">
            <Button onClick={closeDemoMsg} tabIndex="5" extraClass="btn--big">
              OK
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .background-modal {
          display: block;
          z-index: 100;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: fixed;
          background-color: rgba(${colors.bg}, 0.6);
        }

        .demo-msg-modal {
          position: relative;
          top: 15%;
          margin: 0 auto;
          width: 60rem;
          max-height: 100vh;
          overflow-y: auto;
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
          margin: 1rem 0;
        }

        p {
          margin: 1rem 0;
        }

        .row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 3rem;
        }

        .buttons-container {
          margin-top: 3rem;
          width: 80%;
          display: flex;
          justify-content: space-between;
        }

        .button-wrapper {
          width: 16rem;
          margin: 0 1rem;
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .demo-msg-modal {
            width: 50rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .demo-msg-modal {
            width: 100%;
            top: 5%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .demo-msg-modal {
            padding: 6rem 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DemoMsgModal;
