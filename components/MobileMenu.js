import { useContext } from 'react';
// import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { AppContext } from '../components/context/AppContext';
// import GET_CATEGORY_KEYS from '../queries/get-category-keys';
import { colors, fonts, breakPoints } from '../styles/theme';
import CloseIcon from '../assets/icon-close_211652.svg';
import MobileMenuShopCategories from './MobileMenuShopCategories';
import MobileMenuItem from './MobileMenuItem';

const MobileMenu = ({ token }) => {
  const { mobMenuOpen, toggleMenuOpen, toggleSearchOpen } = useContext(AppContext);
  // const { loading, error, data } = useQuery(GET_CATEGORY_KEYS);

  const infoSubMenuContents = [
    { name: 'shipping', url: '/shipping' },
    { name: 'privacy note', url: '/privacy' },
    { name: 'cookie note', url: '/cookies' },
    { name: 'imprint', url: '/imprint' },
  ];

  const shopSubMenuContents = [
    { name: 'kids', url: '/shop/kids' },
    { name: 'womens', url: '/shop/womens' },
    { name: 'mens', url: '/shop/mens' },
    { name: 'accessories', url: '/shop/accessories' },
  ];

  return (
    <div className={`mobile-menu-container ${mobMenuOpen ? 'mobile-menu--active ' : ''}`}>
      <div className="icon-wrapper close-icon">
        <CloseIcon onClick={toggleMenuOpen}></CloseIcon>
      </div>
      <nav className="nav-mobile">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/">
              <a onClick={toggleMenuOpen} className="nav-link">
                <h1 className="title">Home</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/about">
              <a onClick={toggleMenuOpen} className="nav-link">
                <h1 className="title">About</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <MobileMenuItem
              title="Shop"
              toggleMenuOpen={toggleMenuOpen}
              items={shopSubMenuContents}
            />
          </li>

          <li className="nav-item">
            <Link href={token ? '/myAccount' : '/login'}>
              <a onClick={toggleMenuOpen} className="nav-link">
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
                console.log('click');
                toggleMenuOpen();
                toggleSearchOpen();
              }}
              className="nav-link"
            >
              <h1 className="title">Search</h1>
            </div>
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
          transform: translateX(-100%);
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
