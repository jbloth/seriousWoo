import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts, breakPoints } from '../styles/theme';
import auth from '../lib/auth';
import GET_CATEGORY_KEYS from '../queries/get-category-keys';
import CartModal from './CartModal';
import SearchModal from './SearchModal';
import MobileMenu from './MobileMenu';
import Logo from '../assets/seriousLogo_09.svg';
import CartIcon from '../assets/cart.svg';
import SearchIcon from '../assets/search.svg';
import AccountIcon from '../assets/account.svg';

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
  const { loading, error, data } = useQuery(GET_CATEGORY_KEYS);
  const hasData = data && data.productCategories && data.productCategories.nodes;
  const router = useRouter();

  // Get toggle-cart-open mutation and number of cart items (for display in cart icon)
  const { toggleCartOpen, cart, toggleMenuOpen, toggleSearchOpen } = useContext(AppContext);

  // Get auth token (to decide wether to render link to login or account page)
  // let initialToken = auth.getAuthToken();
  // Use null as initial state so that inital render has the same content on server and client
  const [token, setToken] = useState(null);

  // Subscribe to auth token observable to show login-link in the header when the
  // user logs out.
  useEffect(() => {
    const tokenSubscription = auth.authTokenObservable.subscribe({
      next: (newToken) => {
        setToken(newToken);
      },
      error: (err) => {
        console.log(err);
      },
    });
    return () => tokenSubscription.unsubscribe();
  });

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
              <Link href={'/shop/[category]'} as={`/shop/all`}>
                <a className="nav-link">Shop</a>
              </Link>
              <div className="nav__dropdown-content dropdown-content">
                {loading && <div className="nav-dropdown-link">loading...</div>}
                {hasData &&
                  data.productCategories.nodes.map(({ id, name, slug }) => {
                    if (slug === 'uncategorized' || slug === 'all') return ''; // Exclude "uncategorized" and "all" category
                    return (
                      <Link href={'/shop/[category]'} as={`/shop/${slug}`} key={id}>
                        <a className="nav-dropdown-link">{name}</a>
                      </Link>
                    );
                  })}
              </div>
            </li>

            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link">About</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="logo">
          <Link href="/">
            <a className="logo__img">
              <Logo />
            </a>
          </Link>
        </div>

        <nav className="nav nav--right">
          <ul className="nav__list nav__list--right">
            <li className="nav-item dropdown">
              {token ? (
                <div>
                  <Link href="/myAccount">
                    <a className="nav-link">
                      <div className="account-icon-wrapper">
                        <AccountIcon />
                      </div>
                    </a>
                  </Link>
                  <div className="nav__dropdown-content dropdown-content">
                    <Link href="/myAccount">
                      <a className="nav-dropdown-link">My Account</a>
                    </Link>
                    <div
                      className="nav-dropdown-link"
                      onClick={() => {
                        auth.logoutUser();
                        if (router.pathname === '/myAccount') {
                          Router.push('/login');
                        }
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Link href="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                  <div className="nav__dropdown-content dropdown-content">
                    <Link href="/login">
                      <a className="nav-dropdown-link">Login</a>
                    </Link>
                    <Link href="/createAccount">
                      <a className="nav-dropdown-link">Create Account</a>
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-item">
              <div className="nav-link searchIcon-wrapper" onClick={toggleSearchOpen}>
                <SearchIcon />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link cartIcon-wrapper" onClick={toggleCartOpen}>
                <CartIcon />
                <div className="cart-item-count">
                  <span className="cart-item-count-text">{itemCount}</span>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="mob-cart item-mobile">
          <div className="nav-link cartIcon-mobile-wrapper" onClick={toggleCartOpen}>
            <CartIcon id="cart-icon-mobile" />
            <div className="cart-item-count cart-item-count-mobile">
              <span className="cart-item-count-text">{itemCount}</span>
            </div>
          </div>
        </div>

        <MobileMenu token={token} />
        <SearchModal />
        <CartModal />
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
          color: rgb(${colors.orange});
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
          color: rgb(${colors.orange});
          font-size: 2.4rem;
          cursor: pointer;
          fill: rgb(${colors.orange});
        }

        .nav-dropdown-link {
          color: rgb(${colors.orange});
          font-family: ${fonts.text};
          cursor: pointer;
        }

        .nav-dropdown-link &:hover {
          color: rgb(${colors.lightBlue});
        }

        // ---- Search Icon ---- //
        .searchIcon-wrapper {
          width: 2.8rem;
          height: auto;
        }

        // ---- Account Icon ---- //
        .account-icon-wrapper {
          width: 2.8rem;
          height: auto;
        }

        // ---- Cart Icon ---- //
        .cartIcon-wrapper {
          width: 2.8rem;
          height: auto;          
          position: relative;
        }

        .cartIcon-mobile-wrapper {
          width: 3.6rem;
          height: 3.6rem;          
          position: relative;
        }

        .cart-item-count {
          font-family: ${fonts.text};
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background-color: rgb(${colors.lightblue});
          border-radius: 50%;
          font-size: 1rem;
          right: -10%;
          top: -10%;
          color: rgb(${colors.bg});
        }

        .cart-item-count-mobile {
          width: 2.2rem;
          height: 2.2rem;
          font-size: 1.2rem;
          right: -20%;
        }

        // ---- burger ---- //
        /*.burger {
           z-index: 1500;
          transition: all 0.5s ease;
        }*/

        .burger__line {
          width: 30px;
          height: 4px;
          margin: 6px;
          background-color: rgb(${colors.orange});
          // transition: all 0.5s ease;
        }

        // ---- mobile only ---- //
        .item-mobile {
          display: none;
          /*width: 25px;*/
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

          .logo {
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
            width: 90%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {

        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .header-inner {
            width: 100%;
          }

          .logo {
            width: 60%;
          }
        }

        }

      `}</style>
    </header>
  );
};

export default Header;
