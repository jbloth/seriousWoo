import { fonts, colors, breakPoints } from '../styles/theme';
import CheckoutCartItem from './CheckoutCartItem.js';

const CartOverview = ({ cart }) => {
  const cartItems = cart ? cart.products : [];
  return (
    <div className="cart">
      <div className="items">
        {cartItems.length ? (
          cartItems.map((item) => <CheckoutCartItem key={item.productId} product={item} />)
        ) : (
          <p className="empty-message">Your cart is empty.</p>
        )}
      </div>
      <div className="subtotal">
        <span className="subtotal-text">Subtotal: </span>
        <span className="subtotal-price">{cart.subtotal}</span>
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
          display: none;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: rgb(${colors.darkpink});
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
          color: rgb(${colors.darkpink});
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

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .subtotal {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CartOverview;
