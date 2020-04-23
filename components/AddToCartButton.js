import { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import { addFirstProduct } from '../functions';
import Link from 'next/link';
import Button from './Button';

const AddToCartButton = ({ product, children }) => {
  const [cart, setCart] = useContext(AppContext);
  // If we have access to localStorage, add Item to cart
  const handleClick = (e) => {
    e.preventDefault(); // Prevent routing if button is nested in a Link component.

    if (process.browser) {
      let prevCartData = localStorage.getItem('seriousCart');

      if (prevCartData) {
      } else {
        const newCartData = addFirstProduct(product);
        setCart(newCartData);
      }
    }
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

export default AddToCartButton;
