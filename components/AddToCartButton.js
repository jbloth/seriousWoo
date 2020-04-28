import { useContext, useState } from 'react';
import { v4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AppContext } from './context/AppContext';
import GET_CART from '../queries/get-cart';
import ADD_TO_CART from '../mutations/add-to-cart';
import { getFormattedCart } from '../lib/functions';
import { colors, fonts } from '../styles/theme';

import Button from './Button';

const AddToCartButton = ({ product, children }) => {
  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
  };

  const { addProductToCart, cart, setCart } = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    ssr: false,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('seriousCart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0].message);
      }
      refetch();
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleClick = (e) => {
    e.preventDefault(); // Prevent routing if button is nested in a Link component.
    setRequestError(null);
    addToCart();
  };

  return (
    <React.Fragment>
      {addToCartLoading ? (
        <div className="loadingMsg">Adding to Cart...</div>
      ) : (
        <Button onClick={handleClick}>{children}</Button>
      )}
      <style jsx>{`
        .loadingMsg {
          font-family: ${fonts.text};
          height: 3rem;
          background-color: ${colors.orange};
          color: ${colors.bg};
          border: 2px solid transparent;

          text-align: center;
          padding: 0 12px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default AddToCartButton;
