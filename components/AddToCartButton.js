import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Button from './Button';

const AddToCartButton = ({ product, children }) => {
  const { addProductToCart } = useContext(AppContext);
  // If we have access to localStorage, add Item to cart
  const handleClick = (e) => {
    e.preventDefault(); // Prevent routing if button is nested in a Link component.
    addProductToCart(product);
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

export default AddToCartButton;
