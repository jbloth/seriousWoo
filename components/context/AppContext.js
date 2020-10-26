import React, { useState, createContext } from 'react';
import Cookies from 'js-cookie';

import clientConfig from '../../clientConfig';

function getCookie() {
  let demoMsgCookie = undefined;
  if (process.browser) {
    demoMsgCookie = Cookies.get(clientConfig.demoMsgCookieName);
    demoMsgCookie = demoMsgCookie && demoMsgCookie.length ? JSON.parse(demoMsgCookie) : undefined;
  }

  return demoMsgCookie;
}

const cookie = getCookie();
let initialCookieValue = cookie !== undefined ? cookie : true;

export const AppContext = createContext();

export const AppProvider = (props) => {
  // ------- Cart Data ------- //
  const [cart, setCart] = useState(null);

  // ------- Cart Modal Open State ------- //
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  // ------- Mobile Menu Open State ------- //
  const [mobMenuOpen, setMobMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setMobMenuOpen(!mobMenuOpen);
  };

  // ------- Search Modal Open State ------- //
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };

  // ------- Demo Msg Open State ------- //
  const [demoMsgOpen, setDemoMsgOpen] = useState(initialCookieValue);

  const closeDemoMsg = () => {
    Cookies.set(clientConfig.demoMsgCookieName, false, {
      expires: 7,
    });
    setDemoMsgOpen(false);
  };

  // ------- Selected Tag ------- //
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        selectedTag,
        setSelectedTag,
        mobMenuOpen,
        toggleMenuOpen,
        searchOpen,
		setSearchOpen,
        toggleSearchOpen,
        cartOpen,
		setCartOpen,
        toggleCartOpen,
        demoMsgOpen,
        closeDemoMsg,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
