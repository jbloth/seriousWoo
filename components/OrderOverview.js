import { useState, useContext, useEffect } from 'react';
import { colors, breakPoints } from '../styles/theme';
import ArrowIcon from './ArrowIcon';

const OrderOverview = ({ order }) => {
  const [open, setOpen] = useState(false);
  let date = order.date;
  if (date) {
    date = date.split('T')[0];
  }

  const products = order.lineItems && order.lineItems.nodes ? order.lineItems.nodes : null;
  const billing = order.billing ? order.billing : null;
  const shipping = order.shipping ? order.shipping : null;

  return (
    <div className="order-container">
      <div className="order-heading">
        <div className="order-heading-item">
          <span className="row-name">Order Nr: </span>
          {order.orderNumber}
        </div>
        <div className="order-heading-item">{date}</div>
        <div className="order-heading-item">{order.total}</div>
        <div className="arrow-wrapper">
          <ArrowIcon color={colors.darkpink} width={24} open={open} />
        </div>
      </div>

      <div className="order-details">
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
                      <td className="product-detail product-name">{item.product.name}</td>
                      <td className="product-detail"> {item.product.price}</td>
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
                <p className="address-row">
                  <span>{billing.firstName ? billing.firstName + ' ' : ''}</span>
                  <span>{billing.lastName ? billing.lastName : ''}</span>
                </p>
                {billing.address1 && <p className="row">{billing.address1}</p>}
                {billing.address2 && <p className="row">{billing.address2}</p>}
                {billing.postcode && <p className="row">{billing.postcode}</p>}
                {billing.city && <p className="row">{billing.city}</p>}
                {billing.state && <p className="row">{billing.state}</p>}
                {billing.country && <p className="row">{billing.country}</p>}
                <br />
                {billing.email && <p className="row">{billing.email}</p>}
                {billing.phone && <p className="row">{billing.phone}</p>}
              </div>
            )}
          </div>

          <div className="address-container">
            <h4 className="address-title">Shipping Address</h4>
            {shipping && (
              <div className="address-data">
                <p className="address-row">
                  <span>{shipping.firstName ? shipping.firstName + ' ' : ''}</span>
                  <span>{shipping.lastName ? shipping.lastName : ''}</span>
                </p>
                {shipping.address1 && <p className="row">{shipping.address1}</p>}
                {shipping.address2 && <p className="row">{shipping.address2}</p>}
                {shipping.postcode && <p className="row">{shipping.postcode}</p>}
                {shipping.city && <p className="row">{shipping.city}</p>}
                {shipping.state && <p className="row">{shipping.state}</p>}
                {shipping.country && <p className="row">{shipping.country}</p>}
                <br />
                {shipping.email && <p className="row">{shipping.email}</p>}
                {shipping.phone && <p className="row">{shipping.phone}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        th,
        td {
          text-align: start;
        }

        .order-container {
          border-top: 2px solid rgb(${colors.violet});
        }

        .order-heading {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 2px solid rgb(${colors.violet});
          font-weight: bold;
          color: rgb(${colors.orange});
        }

        .order-heading-item {
        }

        .info-section {
          font-size: 1.4rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgb(${colors.violet});
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
          width: 25%;
          font-size: 1.4rem;
        }

        .product-name {
          font-weight: bold;
        }

        .address-section {
          display: flex;
        }

        .address-container {
          width: 50%;
        }
      `}</style>
    </div>
  );
};

export default OrderOverview;
