import React, { useState, useEffect, useReducer, createContext } from 'react';
import Cookies from 'js-cookie';
// import cookies from 'next-cookies';

// import CookieBanner from '../CookieBanner'; // Cookie Consent banner

const COOKIE_NAME = 'consent';

export const CookieConsentContext = createContext();

function getCookie() {
  let consentCookie = undefined;
  if (process.browser) {
    consentCookie = Cookies.get(COOKIE_NAME);
    consentCookie = consentCookie && consentCookie.length ? JSON.parse(consentCookie) : undefined;
  }
  //   else {
  //     ({ [COOKIE_NAME]: consentCookie } = cookies(ctx));
  //   }
  return consentCookie;
}

const cookie = getCookie();
let initialCookieValue =
  cookie !== undefined
    ? cookie
    : {
        isSet: 0,
        agreed: 0,
      };

// Provides context about wether user has interacted with the cookie consent banner and
// wether cookier were accepted or declined and shows banner accordingly.
export const CookieConsentProvider = (props) => {
  const [cookieBannerOpen, setCookieBannerOpen] = useState(!initialCookieValue.isSet);

  const [consentState, dispatchCookieConsent] = useReducer((consentState, action) => {
    switch (action.type) {
      case 'agree':
        setCookieBannerOpen(false);
        return {
          ...consentState,
          isSet: 1,
          agreed: 1,
        };
      case 'decline':
        setCookieBannerOpen(false);
        return {
          isSet: 1,
          agreed: 0,
        };
      case 'showCookiePopup':
        setCookieBannerOpen(true);
        return consentState;
      default:
        throw new Error();
    }
  }, initialCookieValue);

  // Update the cookie when consentState changes
  useEffect(() => {
    Cookies.set(COOKIE_NAME, JSON.stringify(consentState), { expires: 7 });
  }, [consentState]);

  return (
    <CookieConsentContext.Provider
      value={{ consentState, dispatchCookieConsent, cookieBannerOpen }}
    >
      {props.children}
    </CookieConsentContext.Provider>
  );
};
