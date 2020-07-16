import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { AppContext } from '../components/context/AppContext';
import GET_CATEGORY_KEYS from '../queries/get-category-keys';
import { colors, fonts, breakPoints } from '../styles/theme';
import MobileMenuShopCategories from './MobileMenuShopCategories';
import MobileMenuItem from './MobileMenuItem';

const CloseIcon = (props) => (
  <svg height="40px" viewBox="0 0 512 512" width="40px" xmlSpace="preserve" {...props}>
    <path d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z" />
  </svg>
);

const MobileMenu = ({ token }) => {
  const { mobMenuOpen, toggleMenuOpen, toggleSearchOpen } = useContext(AppContext);
  const { loading, error, data } = useQuery(GET_CATEGORY_KEYS);

  const infoSubMenuContents = [
    { name: 'shipping', url: '/shipping' },
    { name: 'privacy note', url: '/privacy' },
    { name: 'cookie note', url: '/cookies' },
    { name: 'legal notice', url: '/legal' },
  ];

  return (
    <div className={`mobile-menu-container ${mobMenuOpen ? 'mobile-menu--active ' : ''}`}>
      <div className="icon-wrapper close-icon" aria-label="Close">
        <CloseIcon onClick={toggleMenuOpen} />
      </div>
      <nav className="nav-mobile">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/">
              <a onClick={toggleMenuOpen}>
                <h1 className="title">Home</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/about">
              <a onClick={toggleMenuOpen}>
                <h1 className="title">About</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            {loading && <p>...</p>}
            {!loading && !error && (
              <MobileMenuShopCategories
                title="Shop"
                toggleMenuOpen={toggleMenuOpen}
                items={data.productCategories.nodes}
              />
            )}
          </li>

          <li className="nav-item">
            <Link href={token ? '/myAccount' : '/login'}>
              <a onClick={toggleMenuOpen}>
                <h1 className="title">{token ? 'Account' : 'Login'}</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <MobileMenuItem
              title="Info"
              toggleMenuOpen={toggleMenuOpen}
              items={infoSubMenuContents}
            />
          </li>

          <li className="nav-item">
            <div
              onClick={() => {
                toggleMenuOpen();
                toggleSearchOpen();
              }}
            >
              <h1 className="title">Search</h1>
            </div>
          </li>

          <li className="nav-item">
            <Link href="/contact">
              <a onClick={toggleMenuOpen}>
                <h1 className="title">Contact</h1>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .mobile-menu-container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          height: 100%;
          min-height: 100vh;
          max-height: 100vh;
          width: 70vw;
          min-width: 500px;
          overflow-y: auto;
          background-color: rgb(${colors.lighterblue});
          z-index: 1400;
          padding: 10rem 6rem;
          transform: translateX(-120%);
          transition: transform 0.5s ease-in;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu--active {
          transform: translateX(0);
          z-index: 102;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 5rem;
          left: 5rem;
          fill: rgb(${colors.darkpink});
          cursor: pointer;
        }

        .nav-mobile {
          width: 80%;
          position: fixed;
          top: 20%;
          margin-bottom: 4rem;
        }

        .nav-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
        }

        .nav-item {
          width: 100%;
          border-bottom: 1px solid rgb(${colors.darkpink});
        }

        .title {
          font-family: ${fonts.text};
          font-size: 4.2rem;
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .mobile-menu-container {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;
