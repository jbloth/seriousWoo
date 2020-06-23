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
        .cart {
          display: flex;
          flex-direction: column;
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
