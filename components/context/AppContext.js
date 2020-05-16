import React, { useState, useEffect, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = (props) => {
  // ------- Cart Data ------- //

  // Initial state (get from local storage if there is anything)
  const [cart, setCart] = useState(null);
  // TODO: Is fecthing cart from local storage necessary?
  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem('seriousCart');
      cartData = null !== cartData ? JSON.parse(cartData) : null;
      setCart(cartData);
    }
  }, []);

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
        toggleSearchOpen,
        cartOpen,
        toggleCartOpen,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
