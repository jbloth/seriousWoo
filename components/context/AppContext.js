import React, { useState, useEffect, createContext } from 'react';

// export const AppContext = createContext([{}, () => {}]);
export const AppContext = createContext();

export const AppProvider = (props) => {
  // const [cart, setCart] = useState(null);
  // useEffect(() => {
  //   // If component is rendered in browser, get cart data from local storage
  //   if (process.browser) {
  //     let cartData = localStorage.getItem('seriousCart');
  //     // //   cartData = cartData ? JSON.parse(cartData) : '';
  //     cartData = null !== cartData ? JSON.parse(cartData) : '';
  //     setCart({ product: 'cool tee' });
  //   }
  // }, []);

  const [selectedTag, setSelectedTag] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <AppContext.Provider value={{ selectedTag, setSelectedTag, cartOpen, toggleCartOpen }}>
      {props.children}
    </AppContext.Provider>
  );
};
