import Link from 'next/link';

import { colors, breakPoints } from '../styles/theme';
import IconPinterest from '../assets/pinterest-square.svg';
import IconInstagram from '../assets/instagram.svg';
import FooterMenu from './FooterMenu';
import ConnectAreaItem from './ConnectAreaItem';
import TextInput from './TextInput';
import Button from './Button';

const Footer = () => {
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
            <Link href="/shop/all">
              <a>shop</a>
            </Link>
          </li>
        </FooterMenu>

        <FooterMenu title="Info" isConnectArea={false}>
          <li>
            <Link href="/">
              <a>shipping</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>legal</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>privacy</a>
            </Link>
          </li>
        </FooterMenu>

        <FooterMenu title="Connect" isConnectArea={true}>
          <ConnectAreaItem title="Subscribe">
            <div className="newsletter-signup">
              <div className="connect-input-wrap">
                <TextInput extraClass="textInput--red" type="email" placeholder="email" />
              </div>

              <div className="connect-btn-wrap">
                <Button extraClass="btn-grow" type="submit">
                  Sign Up
                </Button>
              </div>
            </div>
          </ConnectAreaItem>

          <ConnectAreaItem title="Follow">
            <Link href="/">
              <a className="connect-icon">
                <IconInstagram />
              </a>
            </Link>

            <Link href="/">
              <a className="connect-icon">
                <IconPinterest />
              </a>
            </Link>
          </ConnectAreaItem>

          <ConnectAreaItem title="Say Hi">
            <Link href="/contact">
              <a>Contact Form</a>
            </Link>
          </ConnectAreaItem>
        </FooterMenu>
      </div>

      <div className="copyright">
        <span>&copy; Serious Sally {new Date().getFullYear()}</span>
      </div>

      <style jsx>{`
        .footer {
          background-color: rgb(${colors.lightyellow});
          padding: 7rem 6rem 1rem 6rem;
          flex-direction: column;
        }

        .footer-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
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
        }

        a {
          color: rgb(${colors.orange});
        }

        .connect-icon {
          margin: 0 20px 0 0;
          fill: rgb(${colors.orange});
          display: flex;
          align-items: center;
          font-size: 3rem;
        }

        .newsletter-signup {
          display: flex;
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

          :global(.connect-icon) {
            transform: scale(1.4);
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
