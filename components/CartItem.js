import { useContext } from 'react';

import { AppContext } from '../components/context/AppContext';
import QuantityControl from './QuantityControl';
import { colors, breakPoints } from '../styles/theme';
import CloseIcon from '../assets/close-wt-circle.svg';

const CartItem = ({ product }) => {
  const { addProductToCart, reduceProductQuantity, removeProductFromCart } = useContext(AppContext);

  const { image, name, price, qty, totalPrice } = product; // TODO: size
  //   const totalPrice = price * qty;

  const size = 'M';
  const imgUrl = image.sourceUrl;
  return (
    <div className="cart-item">
      <div
        className="img"
        style={{
          backgroundImage: `url('${imgUrl}')`,
        }}
      ></div>

      <div className="info">
        <div className="row">
          <div className="description">
            <p className="name">{name}</p>
            <p className="size">{size}</p>
          </div>
          <div className="remove-icon" onClick={() => removeProductFromCart(product)}>
            <CloseIcon />
          </div>
        </div>
        <div className="price-info">
          <span className="price--single">{price.toFixed(2)}</span>
          <QuantityControl
            quantity={qty}
            onDecrease={() => reduceProductQuantity(product)}
            onIncrease={() => addProductToCart(product)}
          />
          <span className="price--total">{totalPrice} $</span>
        </div>
      </div>
      <style jsx>{`
        .cart-item {
          width: 100%;
          height: 140px;
          display: flex;
          border-bottom: 1px solid ${colors.darkpink};
          padding: 1.5rem 0;
        }

        .img {
          width: 20%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .info {
          flex-grow: 1;
          padding-left: 2rem;
          color: ${colors.textblue};

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

        .price-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price--total {
          font-size: 1.8rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CartItem;
