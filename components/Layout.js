import { useState, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';

import globalStyles from '../styles/global.js';
import { CookieConsentContext } from './context/CookieConsentContext';

import Meta from './Meta'; // HTML head
import Header from './Header'; // page header
import Footer from './Footer'; // page footer
import ScrollToTopButton from './ScrollToTopButton.js';
import CookieBanner from './CookieBanner'; // Cookie Consent banner

const Layout = (props) => {
  // Use CookieConsentContext to determine wether to show cookie banner
  const { cookieBannerOpen, dispatchCookieConsent } = useContext(CookieConsentContext);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    if (process.browser) {
      setBannerOpen(cookieBannerOpen);
    }
  }, []);

  return (
    <div className="site-container">
      <Meta />
      {bannerOpen && <CookieBanner dispatch={dispatchCookieConsent} />}
      <Header />
      {props.children}
      <ScrollToTopButton />
      <Footer />
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export default Layout;
