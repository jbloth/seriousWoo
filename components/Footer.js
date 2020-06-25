import Link from 'next/link';
import { useState } from 'react';

import { colors, breakPoints } from '../styles/theme';
import FooterMenu from './FooterMenu';
import ConnectAreaItem from './ConnectAreaItem';
import TextInput from './TextInput';
import Button from './Button';
import CookieSettingsModal from './CookieSettingsModal';

const Footer = () => {
  const [newsletterMsgOpen, setNewsletterMsgOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <footer className="footer section">
      <div className="footer-wrapper l-wrapper">
        <FooterMenu title="Find" isConnectArea={false}>
          <li>
            <Link href="/about">
              <a>about</a>
            </Link>
          </li>

          <li>
            <Link href="/contact">
              <a>contact</a>
            </Link>
          </li>

          <li>
            <Link href={'/shop/[category]'} as={`/shop/all`}>
              <a>shop</a>
            </Link>
          </li>

          <li>
            <span className="clickable" onClick={() => setCookieSettingsOpen(true)}>
              cookie settings
            </span>
          </li>
        </FooterMenu>

        <FooterMenu title="Info" isConnectArea={false}>
          <li>
            <Link href="/shipping">
              <a>shipping</a>
            </Link>
          </li>
          <li>
            <Link href="/legal">
              <a>legal notice</a>
            </Link>
          </li>
          <li>
            <Link href="/privacy">
              <a>privacy note</a>
            </Link>
          </li>
          <li>
            <Link href="/cookies">
              <a>cookie note</a>
            </Link>
          </li>
        </FooterMenu>

        <FooterMenu title="Connect" isConnectArea={true}>
          <ConnectAreaItem title="Subscribe">
            <div className="newsletter-signup">
              <div className="connect-input-wrap">
                <TextInput
                  onFocus={() => setNewsletterMsgOpen(true)}
                  extraClass="newsletter-input"
                  type="email"
                  placeholder="email"
                />
              </div>

              <div className="connect-btn-wrap">
                <Button extraClass="btn--grow" type="submit">
                  Sign Up
                </Button>
              </div>
            </div>
          </ConnectAreaItem>

          <div
            className={`newsletter-focus-msg ${
              newsletterMsgOpen ? 'newsletter-focus-msg--active' : ''
            }`}
          >
            Currently this is just a demo site and we don't have a newsletter yet. Entering your
            email address in this field will have no effect.
          </div>

          <ConnectAreaItem title="Follow">
            <div className="social-icons-container">
              <Link href="/">
                <a className="connect-icon">
                  <img
                    className="social-logo"
                    src="/images/IG_Glyph_Fill_50x50.png"
                    alt="instagram-icon"
                  />
                </a>
              </Link>

              <Link href="/">
                <a className="connect-icon">
                  <img
                    className="social-logo"
                    src="/images/badgeRGB-244px.png"
                    alt="pinterest-icon"
                  />
                </a>
              </Link>
            </div>
          </ConnectAreaItem>

          <ConnectAreaItem title="Say Hi">
            <Link href="/contact">
              <a>contact form</a>
            </Link>
          </ConnectAreaItem>
        </FooterMenu>

        {cookieSettingsOpen && (
          <CookieSettingsModal
            active={cookieSettingsOpen}
            closeModal={() => setCookieSettingsOpen(false)}
          />
        )}
      </div>

      {/* <div className="copyright">
        <span>&copy; Serious Salmon {new Date().getFullYear()}</span>
      </div> */}

      <style jsx>{`
        .footer {
          background-color: rgb(${colors.lightyellow});
          padding: 7rem 6rem 1rem 6rem;
          flex-direction: column;
        }

        .footer-wrapper {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          color: rgb(${colors.orange});
        }

        .connect-input-wrap {
          flex-grow: 0.6;
        }

        .connect-btn-wrap {
          margin: 0 0 0 10px;
          flex-grow: 0.4;
          align-self: flex-end;
          /*display: flex;
          align-items: center;
          justify-content: center; */
        }

        a {
          color: rgb(${colors.orange});
        }

        .clickable {
          cursor: pointer;
        }

        .social-icons-container {
          display: flex;
          padding: 2rem 0;
        }

        .connect-icon {
          margin: 0 20px 0 0;
          fill: rgb(${colors.orange});
          display: flex;
          align-items: center;
          /* font-size: 3rem; */
          width: 4rem;
          height: auto;
        }

        .social-logo {
          width: 3rem;
          height: auto;
        }

        .newsletter-signup {
          display: flex;
        }

        .newsletter-focus-msg {
          line-height: 1.2;
          font-size: 1.4rem;
          display: none;
          padding-bottom: 2rem;
        }

        .newsletter-focus-msg--active {
          display: block;
        }

        .copyright {
          color: rgb(${colors.orange});
          font-size: 1.2rem;
          margin-top: 3rem;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .footer-wrapper {
            padding: 0 6rem;
            flex-direction: column;
          }

          .social-logo {
            width: 5rem;
            height: auto;
          }

          .connect-icon {
            margin: 0 40px 0 0;
          }

          .newsletter-signup {
            width: 100%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .footer-wrapper {
            padding: 0 2rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .footer-wrapper {
            padding: 0;
          }

          .newsletter-signup {
            flex-direction: column;
            line-height: 3;
          }

          .connect-input-wrap {
            flex-grow: 1;
          }

          .connect-btn-wrap {
            margin: 0;
            flex-grow: 1;
            align-self: unset;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
