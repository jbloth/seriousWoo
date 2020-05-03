import React, { useState, useEffect, createContext } from 'react';
// import { createNewProduct, addToProductArray, removeFromProductArray } from '../../lib/functions';

// export const AppContext = createContext([{}, () => {}]);
export const AppContext = createContext();

export const AppProvider = (props) => {
  // ------- Cart Data ------- //

  // Initial state (get from local storage if there is anything)
  const [cart, setCart] = useState(null);
  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem('seriousCart');
      cartData = null !== cartData ? JSON.parse(cartData) : null;
      setCart(cartData);
    }
  }, []);

  // const addProductToCart = (product) => {
  //   console.log('addProductToCart');
  //   console.log(cart);
  //   if (process.browser) {
  //     let newCart = null;
  //     if (cart === null) {
  //       // No cart in context
  //       const newProduct = createNewProduct(product, 1);
  //       newCart = {
  //         products: [],
  //         totalProductsCount: 1,
  //         totalProductsPrice: newProduct.price,
  //       };
  //       newCart.products.push(newProduct);
  //     } else {
  //       // If we already have a cart...
  //       const updatedProducts = addToProductArray(cart.products, product);
  //       const newTotals = getProductsTotals(updatedProducts);

  //       newCart = {
  //         ...cart,
  //         products: updatedProducts,
  //         totalProductsCount: newTotals.totalCount,
  //         totalProductsPrice: parseFloat(newTotals.totalPrice.toFixed(2)),
  //       };
  //     }
  //     setCart(newCart);
  //     console.log(newCart);
  //     localStorage.setItem('seriousCart', JSON.stringify(newCart));
  //     return newCart;
  //   }
  // };

  // const reduceProductQuantity = (product) => {
  //   if (process.browser) {
  //     const updatedProducts = removeFromProductArray(cart.products, product, false);
  //     const newTotals = getProductsTotals(updatedProducts);
  //     const newCart = {
  //       ...cart,
  //       products: updatedProducts,
  //       totalProductsCount: newTotals.totalCount,
  //       totalProductsPrice: parseFloat(newTotals.totalPrice.toFixed(2)),
  //     };

  //     setCart(newCart);

  //     // Remove cart from localStorage if it's empty
  //     if (newCart.products.length === 0) {
  //       localStorage.removeItem('seriousCart');
  //     } else {
  //       localStorage.setItem('seriousCart', JSON.stringify(newCart));
  //     }

  //     return newCart;
  //   }
  // };

  // const removeProductFromCart = (product) => {
  //   if (process.browser) {
  //     const updatedProducts = removeFromProductArray(cart.products, product, true);
  //     const newTotals = getProductsTotals(updatedProducts);
  //     const newCart = {
  //       ...cart,
  //       products: updatedProducts,
  //       totalProductsCount: newTotals.totalCount,
  //       totalProductsPrice: parseFloat(newTotals.totalPrice.toFixed(2)),
  //     };

  //     setCart(newCart);

  //     // Remove cart from localStorage if it's empty
  //     if (newCart.products.length === 0) {
  //       localStorage.removeItem('seriousCart');
  //     } else {
  //       localStorage.setItem('seriousCart', JSON.stringify(newCart));
  //     }

  //     return newCart;
  //   }
  // };

  // Get total amount and total price of products in cart

  const getProductsTotals = (products) => {
    const initial = { totalCount: 0, totalPrice: 0 };

    const totalReducer = (acc, product) => {
      return {
        totalCount: acc.totalCount + product.qty,
        totalPrice: acc.totalPrice + product.totalPrice,
      };
    };

    return products.reduce(totalReducer, initial);
  };

  // ------- Cart Modal Open State ------- //
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
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
        cartOpen,
        toggleCartOpen,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );

  // return (
  //   <AppContext.Provider
  //     value={{
  //       cart,
  //       setCart,
  //       addProductToCart,
  //       reduceProductQuantity,
  //       selectedTag,
  //       setSelectedTag,
  //       cartOpen,
  //       toggleCartOpen,
  //     }}
  //   >
  //     {props.children}
  //   </AppContext.Provider>
  // );
};
