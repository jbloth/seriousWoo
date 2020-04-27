import { useContext } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import GET_CART from '../queries/get-cart';
import { AppContext } from '../components/context/AppContext';
import { fonts, colors } from '../styles/theme';
import CloseIcon from '../assets/icon-close_211652.svg';
import CartItem from './CartItem';

const CartModal = () => {
  const { cart, setCart, cartOpen, toggleCartOpen } = useContext(AppContext);
  const hidden = !cartOpen;

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.log(data);
      // // Update cart in the localStorage.
      // const updatedCart = getFormattedCart( data );
      // localStorage.setItem( 'woo-next-cart', JSON.stringify( updatedCart ) );

      // // Update cart in context
      // setCart( updatedCart );
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
        <div className="items">
          {cartItems.length ? (
            cartItems.map((item) => <CartItem key={item.productId} product={item} />)
          ) : (
            <p className="empty-message">Your cart is empty.</p>
          )}
        </div>
        {cartItems.length ? (
          <div>
            <div className="subtotal">
              <span className="subtotal-text">Subtotal: </span>
              <span className="subtotal-price">{cart.totalProductsPrice.toFixed(2)} $</span>
            </div>
            <Link href="/shop/checkout">
              <button className="btn checkout-btn">GO TO CHECKOUT</button>
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
          color: ${colors.darkpink};
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

        .checkout-btn {
          font-family: ${fonts.text};
          color: ${colors.bg};
          border: 2px solid transparent;

          text-align: center;
          padding: 0 12px;
          cursor: pointer;
          background-color: ${colors.darkpink};
          height: 4rem;
          font-size: 1.8rem;
        }

        .checkout-btn:hover {
          background-color: ${colors.bg};
          color: ${colors.darkpink};
          border: 2px solid ${colors.darkpink};
        }
      `}</style>
    </div>
  );
};

export default CartModal;
