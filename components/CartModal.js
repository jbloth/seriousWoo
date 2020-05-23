import { useContext } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import GET_CART from '../queries/get-cart';
// import UPDATE_CART from '../mutations/update-cart';
import { AppContext } from '../components/context/AppContext';
import { getFormattedCart } from '../lib/functions';
import { fonts, colors, breakPoints } from '../styles/theme';
import CloseIcon from '../assets/icon-close_211652.svg';
import CartItem from './CartItem';

const CartModal = () => {
  const { cart, setCart, cartOpen, toggleCartOpen } = useContext(AppContext);
  const hidden = !cartOpen;

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    ssr: false,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('seriousCart', JSON.stringify(updatedCart));

      // Update cart in context
      setCart(updatedCart);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const cartItems = cart !== null ? cart.products : [];
  return (
    <div className={`cart-container ${hidden ? '' : 'cart-container--active'}`}>
      <div className="icon-wrapper close-icon">
        <CloseIcon onClick={toggleCartOpen}></CloseIcon>
      </div>
      <div className="cart">
        <h1 className="header">Cart</h1>
        {loading ? (
          <div className="loadingMsg">Loading Cart...</div>
        ) : (
          <div className="items">
            {cartItems.length ? (
              cartItems.map((item, idx) => <CartItem key={idx} refetch={refetch} product={item} />)
            ) : (
              <p className="empty-message">Your cart is empty.</p>
            )}
          </div>
        )}
        {cartItems.length ? (
          <div>
            <div className="subtotal">
              <span className="subtotal-text">Subtotal: </span>
              <span className="subtotal-price">{cart.subtotal} $</span>
            </div>
            <Link href="/shop/checkout">
              <button className="btn checkout-btn" onClick={toggleCartOpen}>
                GO TO CHECKOUT
              </button>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <style jsx>{`
        .cart-container {
          width: 40vw;
          min-width: 500px;
          height: 100%;
          min-height: 100vh;
          max-height: 100vh;
          background-color: rgb(${colors.lighterblue});
          position: fixed;
          overflow-y: auto;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 500;
          padding: 8rem 4rem 2rem 4rem;
          transform: translateX(100%);
          transition: transform 0.5s ease-in;
        }

        .cart-container--active {
          z-index: 101;
          transform: translateX(0);
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: rgb(${colors.darkpink});
          cursor: pointer;
        }

        .cart {
          display: flex;
          flex-direction: column;
        }

        .header {
          font-weight: bold;
          color: rgb(${colors.darkpink});
        }

        .empty-message {
          color: rgb(${colors.textblue});
        }

        .subtotal {
          align-self: flex-end;
          margin: 2rem 0;
          font-size: 2.4rem;
          font-weight: bold;
        }

        .subtotal-text {
          color: rgb(${colors.orange});
        }

        .subtotal-price {
          color: rgb(${colors.textblue});
          margin-left: 2rem;
        }

        .checkout-btn {
          font-family: ${fonts.text};
          color: rgb(${colors.bg});
          border: 2px solid transparent;

          text-align: center;
          padding: 0 12px;
          cursor: pointer;
          background-color: rgb(${colors.darkpink});
          height: 4rem;
          font-size: 1.8rem;
        }

        .checkout-btn:hover {
          background-color: rgb(${colors.bg});
          color: rgb(${colors.darkpink});
          border: 2px solid rgb(${colors.darkpink});
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .cart-container {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
};

export default CartModal;
