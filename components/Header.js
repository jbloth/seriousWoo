import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext } from 'react';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts, breakPoints } from '../styles/theme';
import CartModal from './CartModal';
import MobileMenu from './MobileMenu';
import Logo from '../assets/seriousLogo_08.svg';
import CartIcon from '../assets/shopping-cart.svg';
import SearchIcon from '../assets/forschung.svg';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  // Get toggle-cart-open mutation and number of cart items (for display in cart icon)
  const { toggleCartOpen, cart } = useContext(AppContext);
  const { toggleMenuOpen } = useContext(AppContext);
  const itemCount = cart !== null && Object.keys(cart).length ? cart.totalProductsCount : 0;

  return (
    <header className="header section">
      <div className="header-inner">
        <div className="burger item-mobile" onClick={toggleMenuOpen}>
          <div className="burger__line line-1"></div>
          <div className="burger__line line-2"></div>
          <div className="burger__line line-3"></div>
        </div>

        <nav className="nav nav--left">
          <ul className="nav__list nav__list--left">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link href="/shop/all">
                <a className="nav-link">Shop</a>
              </Link>
              <div className="nav__dropdown-content dropdown-content">
                <Link href="/shop/kids">
                  <a className="nav-dropdown-link">Kids</a>
                </Link>
                <Link href="/shop/womens">
                  <a className="nav-dropdown-link">Womens</a>
                </Link>
                <Link href="/shop/mens">
                  <a className="nav-dropdown-link">Mens</a>
                </Link>
                <Link href="/shop/accessories">
                  <a className="nav-dropdown-link">Accessories</a>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">About</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="logo">
          <Link href="/">
            <a className="logo__img">
              {' '}
              <Logo />
            </a>
          </Link>
        </div>

        <nav className="nav nav--right">
          <ul className="nav__list nav__list--right">
            <li className="nav-item dropdown">
              {/* {currentUser ? (
              <div className="nav-link"
            onClick={() => auth.signOut()}>
                Logout
              </div>
            ) : ( */}
              <div>
                <Link href="/login">
                  <a className="nav-link">Login</a>
                </Link>
                <div className="nav__dropdown-content dropdown-content">
                  <Link href="/login">
                    <a className="nav-dropdown-link">Login</a>
                  </Link>
                  <Link href="/signin">
                    <a className="nav-dropdown-link">Create Account</a>
                  </Link>
                </div>
              </div>
              {/* )} */}
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  <SearchIcon />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <div className="nav-link cartIcon-wrapper" onClick={toggleCartOpen}>
                <CartIcon />
                <span className="cart-item-count">{itemCount}</span>
              </div>
            </li>
          </ul>
        </nav>

        <div className="mob-cart item-mobile">
          <div className="nav-link cartIcon-wrapper" onClick={toggleCartOpen}>
            <CartIcon id="cart-icon-mobile" />
            <span className="cart-item-count">{itemCount}</span>
          </div>
        </div>

        <CartModal />
        <MobileMenu />
      </div>

      <style jsx>{`
        // ---- wrapper ---- //
        .header {
          flex-direction: column;
          padding: 2rem 0 0 0;
        }

        .header-inner {
          padding: 1rem 2rem 2rem 2rem;

          display: flex;
          justify-content: space-between;

          align-items: center;
          width: 96%;
          max-width: 1500px;
        }

        // ---- logo ---- //
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo__img {
          width: 300px;
        }

        // ---- navigation ---- //
        .nav {
          width: 20vw;
          min-width: 220px;
        }

        .nav ul {
          display: flex;
        }

        .nav .item-mobile {
          display: none;
          width: 25px;
          cursor: pointer;
        }

        .nav .item-mobile a i {
          color: ${colors.orange};
        }

        .nav__list--right {
          justify-content: flex-end;
        }

        .nav__list--left {
          justify-content: flex-start;
        }

        .nav-item {
          font-family: ${fonts.heading};
        }

        .nav__list--left .nav-item {
          margin: 0 3rem 0 0;
        }

        .nav__list--right .nav-item {
          margin: 0 0 0 3rem;
        }

        .nav-link {
          color: ${colors.orange};
          font-size: 2.4rem;
          cursor: pointer;
          fill: ${colors.orange};
        }

        .nav-dropdown-link {
          color: ${colors.orange};
          font-family: ${fonts.text};
        }

        .nav-dropdown-link &:hover {
          color: ${colors.lightBlue};
        }

        // ---- Cart Icon ---- //
        .cartIcon-wrapper {
          position: relative;
          font-size: 1.6rem;
        }

        div :global(#cart-icon-mobile) {
          transform: scale(1.3);
        }

        .cart-item-count {
          position: absolute;
          font-size: 1rem;
          left: 50%;
          top: 15%;
          color: ${colors.bg};
        }

        .mob-cart .cart-item-count {
          top: 8%;
        }

        // ---- burger ---- //
        .burger {
          // z-index: 1500;
          // transition: all 0.5s ease;
        }

        .burger__line {
          width: 30px;
          height: 4px;
          margin: 6px;
          background-color: ${colors.orange};
          // transition: all 0.5s ease;
        }

        // ---- mobile only ---- //
        .item-mobile {
          display: none;
          width: 25px;
          cursor: pointer;
        }

        .item-mobile a i {
          color: $color-orange;
        }

        // ---- media queries ---- //
        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .header-inner {
            width: 70%;
          }

          .nav {
            display: none;
          }

          .item-mobile {
            display: inline;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .header-inner {
            align-items: flex-end;
            width: 90%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .logo {
            width: 240px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
