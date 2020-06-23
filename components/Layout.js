import { useState, useContext, useEffect } from 'react';

import globalStyles from '../styles/global.js';
import { CookieConsentContext } from './context/CookieConsentContext';
import { AppContext } from '../components/context/AppContext';

import Meta from './Meta'; // HTML head
import Header from './Header'; // page header
import Footer from './Footer'; // page footer
import ScrollToTopButton from './ScrollToTopButton.js';
import CookieBanner from './CookieBanner'; // Cookie Consent banner
import DemoMsgModal from './DemoMsgModal';

const Layout = (props) => {
  // Use CookieConsentContext to determine wether to show cookie banner
  const { cookieBannerOpen, dispatchCookieConsent } = useContext(CookieConsentContext);
  const { demoMsgOpen } = useContext(AppContext);

  const [bannerOpen, setBannerOpen] = useState(false);
  const [demoBannerOpen, setDemoBannerOpen] = useState(false);

  // Only set banner open after inital render to prevent client and server discrepancy
  // on initial render.
  useEffect(() => {
    if (process.browser) {
      setBannerOpen(cookieBannerOpen);
    }
  }, [cookieBannerOpen]);

  // Same for the demo message popup
  useEffect(() => {
    if (process.browser) {
      setDemoBannerOpen(demoMsgOpen);
    }
  }, [demoMsgOpen]);

  return (
    <div className="site-container">
      <Meta />
      {bannerOpen && <CookieBanner dispatch={dispatchCookieConsent} />}
      {demoBannerOpen && <DemoMsgModal />}
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
