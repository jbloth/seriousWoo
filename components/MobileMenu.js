import { useContext } from 'react';
import Link from 'next/link';

import { AppContext } from '../components/context/AppContext';
import { colors } from '../styles/theme';
import CloseIcon from '../assets/icon-close_211652.svg';

const MobileMenu = () => {
  const { mobMenuOpen, toggleMenuOpen } = useContext(AppContext);

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
                <h1>Home</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/">
              <a onClick={toggleMenuOpen} className="nav-link">
                <h1>About</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/shop/all">
              <a onClick={toggleMenuOpen} className="nav-link">
                <h1>Shop</h1>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/">
              <a onClick={toggleMenuOpen} className="nav-link">
                <h1>Login</h1>
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
          background-color: ${colors.lighterblue}; // TODO: blur background
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
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 5rem;
          left: 5rem;
          fill: ${colors.darkpink};
          cursor: pointer;
        }

        .nav-mobile {
          position: fixed;
          top: 20%;
        }

        .nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;
