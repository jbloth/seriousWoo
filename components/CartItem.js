import { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { v4 } from 'uuid';

import UPDATE_CART from '../mutations/update-cart';
import { getUpdatedItems } from '../lib/functions';
import { AppContext } from '../components/context/AppContext';
import QuantityControl from './QuantityControl';
import { colors, breakPoints } from '../styles/theme';
import CloseIcon from '../assets/close-wt-circle.svg';

const CartItem = ({ product, refetch }) => {
  const { cart } = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  const { image, name, price, qty, totalPrice, size } = product; // TODO: size

  const imgUrl = image.sourceUrl;

  const [
    updateCart,
    { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const updateCartQuantities = (products, newQty, cartKey) => {
    if (updateCartProcessing) return;

    if (products.length) {
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
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
      <div
        className="img"
        style={{
          backgroundImage: `url('${imgUrl}')`,
        }}
      ></div>

      {!updateCartProcessing ? (
        <div className="info">
          <div className="row">
            <div className="description">
              <p className="name">{name}</p>
              {size && <p className="size">{size.name}</p>}
            </div>
            <div
              className="remove-icon"
              onClick={(e) => handleRemoveProductClick(e, product.cartKey, cart.products)}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="price-info">
            <span className="price--single">{price.toFixed(2)}</span>
            <QuantityControl
              quantity={qty}
              onDecrease={() => decreaseQuantity(product.cartKey, cart.products)}
              onIncrease={() => increaseQuantity(product.cartKey, cart.products)}
            />
            <span className="price--total">{totalPrice} $</span>
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
           {
            /* height: 140px; */
          }
          display: flex;
          border-bottom: 1px solid ${colors.darkpink};
          padding: 1.5rem 0;
        }

        .img {
          width: 24%;
          height: 120px;
          background-size: cover;
          background-position: center;
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
          fill: ${colors.textblue};
          align-self: flex-start;
          cursor: pointer;
        }

        .name {
          font-size: 2rem;
        }

        .qty-control {
          background-color: white;
          display: flex;
          width: 120px;
          height: 40px;
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
          color: ${colors.orange};
        }
      `}</style>
    </div>
  );
};

export default CartItem;
