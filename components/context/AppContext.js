import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    // If component is rendered in browser, get cart data from local storage
    if (process.browser) {
      let cartData = localStorage.getItem('seriousCart');
      // //   cartData = cartData ? JSON.parse(cartData) : '';
      cartData = null !== cartData ? JSON.parse(cartData) : '';
      setCart({ product: 'cool tee' });
    }
  }, []);

  return <AppContext.Provider value={[cart, setCart]}>{props.children}</AppContext.Provider>;
};
