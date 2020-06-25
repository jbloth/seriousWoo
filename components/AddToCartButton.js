import { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AppContext } from './context/AppContext';
import GET_CART from '../queries/get-cart';
import ADD_TO_CART from '../mutations/add-to-cart';
import { getFormattedCart } from '../lib/functions';
import { colors, fonts } from '../styles/theme';

import Button from './Button';

const AddToCartButton = ({ product, children, selectedVariation }) => {
  const productQtyInput = {
    clientMutationId: 'bobbel', // Generate a unique id.
    quantity: 1,
    productId: product.productId,
  };

  if (selectedVariation) productQtyInput.variationId = parseInt(selectedVariation);

  const { setCart } = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    ssr: false,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

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
      input: productQtyInput,
    },
    onCompleted: () => {
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0].message);
        console.log(addToCartError);
      }
      refetch();
    },
    onError: (error) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          setRequestError(error.graphQLErrors[0].message);
        }
        console.log(error);
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
      {requestError && (
        <div className="error-msg">
          <p>Could not add to cart</p>
          <p>Error : {requestError} </p>
        </div>
      )}
      <style jsx>{`
        .loadingMsg {
          font-family: ${fonts.text};
          height: 3rem;
          background-color: rgb(${colors.orange});
          color: rgb(${colors.bg});
          border: 2px solid transparent;

          text-align: center;
          padding: 0 12px;
        }

        .error-msg {
          font-size: 1.2rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default AddToCartButton;
