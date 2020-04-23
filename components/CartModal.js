import { useContext } from 'react';

import { AppContext } from '../components/context/AppContext';
import { colors } from '../styles/theme';
import CloseIcon from '../assets/icon-close_211652.svg';

const CartModal = () => {
  const { cartOpen, toggleCartOpen } = useContext(AppContext);
  const hidden = !cartOpen;

  const cartItems = [];
  const cartTotal = 10.0;
  return (
    <div className={`cart-container ${hidden ? '' : 'cart-container--active'}`}>
      <div className="icon-wrapper close-icon">
        <CloseIcon onClick={toggleCartOpen}></CloseIcon>
      </div>
      <div className="cart">
        <h1 className="header">Cart</h1>
        <div className="items">
          {cartItems.length ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="empty-message">Your cart is empty.</p>
          )}
        </div>
        {cartItems.length ? (
          <div>
            <div className="subtotal">
              <span className="subtotal-text">Subtotal: </span>
              <span className="subtotal-price">{cartTotal.toFixed(2)} $</span>
            </div>
            <button onClick={() => {}} className="btn chekout-btn">
              GO TO CHECKOUT
            </button>
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
          background-color: ${colors.lighterblue};
          position: fixed;
          overflow-y: auto;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 500;
          padding: 8rem 4rem 2rem 4rem;
          display: none;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: ${colors.darkpink};
          cursor: pointer;
        }

        .cart-container--active {
          display: block;
        }

        .cart {
          display: flex;
          flex-direction: column;
        }

        .header {
          font-weight: bold;
          color: ${colors.darkpink}
        }

        .empty-message {
          color: ${colors.textblue};
        }

        .subtotal {
          align-self: flex-end;
          margin: 2rem 0;
          font-size: 2.4rem;
          font-weight: bold;
        }

        .subtotal-text {
          color: ${colors.orange};
        }

        .subtotal-price {
          color: ${colors.textblue};
          margin-left: 2rem;
        }

        .chekout-btn {
          background-color: ${colors.darkpink}
          height: 4rem;
          font-size: 1.8rem;
        }
      `}</style>
    </div>
  );
};

export default CartModal;
