import { useState } from 'react';
import { colors, breakPoints } from '../styles/theme';
import ArrowIcon from './ArrowIcon';

const OrderOverview = ({ order }) => {
  const [open, setOpen] = useState(false);
  const toggleCollapse = () => {
    setOpen(!open);
  };

  let date = order.date;
  if (date) {
    date = date.split('T')[0];
  }

  const products = order.lineItems && order.lineItems.nodes ? order.lineItems.nodes : null;
  const billing = order.billing ? order.billing : null;
  const shipping = order.shipping ? order.shipping : null;

  return (
    <div className="order-container">
      <div className="order-heading" onClick={toggleCollapse}>
        <div className="order-heading-info">
          <div className="order-heading-item">
            <span className="row-name">Order Nr: </span>
            {order.orderNumber}
          </div>
          <div className="order-heading-item">{date}</div>
          <div className="order-heading-item">{order.total}</div>
        </div>
        <div className="arrow-wrapper">
          <ArrowIcon color={colors.darkpink} width={24} open={open} />
        </div>
      </div>

      <div className={`order-details ${open ? 'order-details--active' : ''}`}>
        <div className="status info-section">
          <div className="order-detail">Status: {order.status}</div>
          <div className="order-detail">Payment: {order.paymentMethodTitle}</div>
          <div className="order-detail">Paid: {order.needsPayment}</div>
          <div className="order-detail">Subtotal: {order.subtotal}</div>
          <div className="order-detail">Shipping: {order.shippingTotal}</div>
          <div className="order-detail">Total: {order.total}</div>
        </div>

        <div className="section-title">Products</div>

        <div className="products info-section">
          {products && (
            <table className="products-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, idx) => {
                  return (
                    <tr key={idx} className="product">
                      <td className="product-detail product-name">
                        {item.product ? item.product.name : 'N/A'}
                      </td>
                      <td className="product-detail"> {item.total}</td>
                      <td className="product-detail">{item.quantity}</td>
                      <td className="product-detail">€{item.subtotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="section-title">Address</div>

        <div className="address-section info-section">
          <div className="address-container">
            <h4 className="address-title">Billing Address</h4>
            {billing && (
              <div className="address-data">
                <p className="address-detail">
                  <span>{billing.firstName ? billing.firstName + ' ' : ''}</span>
                  <span>{billing.lastName ? billing.lastName : ''}</span>
                </p>
                {billing.address1 && <p className="address-detail">{billing.address1}</p>}
                {billing.address2 && <p className="address-detail">{billing.address2}</p>}
                {billing.postcode && <p className="address-detail">{billing.postcode}</p>}
                {billing.city && <p className="address-detail">{billing.city}</p>}
                {billing.state && <p className="address-detail">{billing.state}</p>}
                {billing.country && <p className="address-detail">{billing.country}</p>}
                {billing.email && <p className="address-detail">{billing.email}</p>}
                {billing.phone && <p className="address-detail">{billing.phone}</p>}
              </div>
            )}
          </div>

          <div className="address-container">
            <h4 className="address-title">Shipping Address</h4>
            {shipping && (
              <div className="address-data">
                <p className="address-detail">
                  <span>{shipping.firstName ? shipping.firstName + ' ' : ''}</span>
                  <span>{shipping.lastName ? shipping.lastName : ''}</span>
                </p>
                {shipping.address1 && <p className="address-detail">{shipping.address1}</p>}
                {shipping.address2 && <p className="address-detail">{shipping.address2}</p>}
                {shipping.postcode && <p className="address-detail">{shipping.postcode}</p>}
                {shipping.city && <p className="address-detail">{shipping.city}</p>}
                {shipping.state && <p className="address-detail">{shipping.state}</p>}
                {shipping.country && <p className="address-detail">{shipping.country}</p>}
                {shipping.email && <p className="address-detail">{shipping.email}</p>}
                {shipping.phone && <p className="address-detail">{shipping.phone}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        th,
        td {
          text-align: start;
          padding-right: 1rem;
        }

        .order-container {
          border-top: 2px solid rgb(${colors.violet});
        }

        .order-container:last-of-type {
          border-bottom: 2px solid rgb(${colors.violet});
        }

        .order-heading {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          font-weight: bold;
          color: rgb(${colors.orange});
          cursor: pointer;
        }

        .order-heading-info {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-right: 1rem;
        }

        .order-heading-item {
          /* padding-right: 1rem; */
          min-width: 10rem;
        }

        .order-details {
          display: none;
        }

        .order-details--active {
          display: block;
          border-top: 2px solid rgb(${colors.violet});
        }

        .info-section {
          font-size: 1.4rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgb(${colors.violet});
        }

        .info-section:last-of-type {
          border-bottom: none;
        }

        .section-title {
          border-bottom: 1px solid rgb(${colors.violet});
          color: rgb(${colors.orange});
          width: 100%;
        }

        .products-table {
          width: 100%;
        }

        .product {
          width: 100%;
        }

        .product-detail {
          width: 20%;
          font-size: 1.4rem;
        }

        .product-name {
          width: 40%;
          font-weight: bold;
        }

        .address-section {
          display: flex;
        }

        .address-container {
          width: 50%;
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .order-heading-item {
            padding-right: 1rem;
            min-width: 5rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .order-heading-item {
            font-size: 1.4rem;
          }

          .order-heading-item:last-of-type {
            border-right: none;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .order-detail,
          .address-detail,
          .product-detail {
            font-size: 1.2rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .order-heading-info {
            flex-wrap: wrap;
          }

          th {
            font-size: 1.2rem;
          }

          .address-section {
            flex-direction: column;
          }

          .address-container {
            width: 100%;
            padding-bottom: 2rem;
          }

          .address-container:last-of-type {
            padding-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderOverview;
