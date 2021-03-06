import { colors, breakPoints } from '../styles/theme';

const CheckoutCartItem = ({ product }) => {
  const { image, name, price, qty, totalPrice, size } = product; // TODO: size
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
            <span className="name">{name}</span>
            {size && <span className="size">{size.name}</span>}
          </div>
        </div>
        <div className="price-info">
          <span className="price--single">{price}</span>
          <span className="quantity">{`qty: ${qty}`}</span>
          <span className="price--total">{totalPrice}</span>
        </div>
      </div>

      <style jsx>{`
        .cart-item {
          width: 100%;
          display: flex;
          border-bottom: 1px solid rgb(${colors.violet});
          padding: 1.5rem 0;
        }

        .img {
          width: 80px;
          height: 90px;
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

        .name {
          font-size: 2rem;
        }

        .size {
          margin-left: 2rem;
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

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .cart-item {
            flex-direction: column;
          }

          .img {
            width: 100px;
            height: 100px;
          }

          .info {
            padding-left: 1rem;
          }

          .price-info {
            font-size: 1.4rem;
          }

          .price--total {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutCartItem;
