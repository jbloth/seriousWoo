import { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import UPDATE_CART from '../mutations/update-cart';
import { getUpdatedItems } from '../lib/functions';
import { AppContext } from '../components/context/AppContext';
import QuantityControl from './QuantityControl';
import { colors, breakPoints } from '../styles/theme';
// import CloseIcon from '../assets/close-wt-circle.svg';

const CloseIcon = (props) => (
  <svg
    viewBox="0 0 50 50"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    aria-labelledby="closeCircleTitle"
    {...props}
  >
    <title id="closeCircleTitle">Close</title>
    <path d="M25.107 4.207c11.456 0 20.757 9.301 20.757 20.757 0 11.456-9.301 20.757-20.757 20.757-11.457 0-20.757-9.301-20.757-20.757 0-11.456 9.3-20.757 20.757-20.757zm0 3.354c9.605 0 17.403 7.798 17.403 17.403 0 9.605-7.798 17.404-17.403 17.404-9.606 0-17.404-7.799-17.404-17.404S15.501 7.561 25.107 7.561z" />
    <path d="M33.601 14.19l-19.47 19.47 2.149 2.15 19.47-19.47-2.149-2.15z" />
    <path d="M35.869 33.66l-19.47-19.47-2.149 2.15 19.47 19.47 2.149-2.15z" />
  </svg>
);
const CartItem = ({ product, refetch }) => {
  const { cart } = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  const { image, name, subtotal, qty, totalPrice, size } = product;
  const imgUrl = image.sourceUrl;

  const [
    updateCart,
    { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setRequestError(error.graphQLErrors[0].message);
      }
      console.log(error);
    },
  });

  const updateCartQuantities = (products, newQty, cartKey) => {
    if (updateCartProcessing) return;

    if (products.length) {
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: 'whatever',
            items: updatedItems,
          },
        },
      });
    }
  };

  const handleRemoveProductClick = (e, cartKey, products) => {
    updateCartQuantities(products, 0, cartKey);
  };

  const increaseQuantity = (cartKey, products) => {
    const newQty = qty < 999 ? qty + 1 : 999;
    updateCartQuantities(products, newQty, cartKey);
  };

  const decreaseQuantity = (cartKey, products) => {
    const newQty = qty > 0 ? qty - 1 : 0;
    updateCartQuantities(products, newQty, cartKey);
  };

  return (
    <div className="cart-item">
      <div className="img-row">
        <div
          className="img"
          style={{
            backgroundImage: `url('${imgUrl}')`,
          }}
        ></div>
        <div
          className="remove-icon tiny-only"
          onClick={(e) => handleRemoveProductClick(e, product.cartKey, cart.products)}
          aria-label="Close"
        >
          <CloseIcon />
        </div>
      </div>

      {!updateCartProcessing ? (
        <div className="info">
          <div className="row">
            <div className="description">
              <p className="name">{name}</p>
              {size && <p className="size">{size.name}</p>}
            </div>
            <div
              className="remove-icon non-tiny"
              onClick={(e) => handleRemoveProductClick(e, product.cartKey, cart.products)}
              aria-label="Close"
            >
              <CloseIcon />
            </div>
          </div>
          <div className="price-info">
            <span className="price--single">{subtotal}</span>
            <QuantityControl
              quantity={qty}
              onDecrease={() => decreaseQuantity(product.cartKey, cart.products)}
              onIncrease={() => increaseQuantity(product.cartKey, cart.products)}
            />
            <span className="price--total">{totalPrice}</span>
          </div>
          {requestError && <div className="errorMsg">{'Error: ' + requestError} </div>}
        </div>
      ) : (
        <div className="loadingMsg">
          <h3>Updating Cart...</h3>
        </div>
      )}
      <style jsx>{`
        .cart-item {
          width: 100%;
          display: flex;
          border-bottom: 1px solid rgb(${colors.darkpink});
          padding: 1.5rem 0;
        }

        .img-row {
          width: 120px;
          height: 120px;
          display: flex;
          justify-content: space-between;
        }

        .img {
          width: 100%;
          height: 120px;
          background-size: cover;
          background-position: center;
        }

        .tiny-only {
          display: none;
        }

        .info {
          flex-grow: 1;
          padding-left: 2rem;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .row {
          display: flex;
          justify-content: space-between;
        }

        .remove-icon {
          width: 2.7rem;
          fill: rgb(${colors.textblue});
          align-self: flex-start;
          cursor: pointer;
        }

        .name {
          font-size: 2rem;
        }

        .price-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price--total {
          font-size: 1.8rem;
          font-weight: bold;
        }

        .loadingMsg {
          padding: 2rem;
        }

        .errorMsg {
          padding-top: 1rem;
          color: rgb(${colors.orange});
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .cart-item {
            padding: 2.5rem 0;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .cart-item {
            flex-direction: column;
          }

          .img-row {
            width: 100%;
            height: 180px;
          }

          .img {
            width: 180px;
            height: 180px;
          }

          .tiny-only {
            display: block;
          }

          .non-tiny {
            display: none;
          }

          .remove-icon {
            width: 3.4rem;
          }

          .row {
            margin: 1rem 0;
          }

          .info {
            padding-left: 0;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .img-row {
            height: 120px;
          }

          .img {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;
