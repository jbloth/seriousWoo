// import Error from './Error';
import { colors, fonts } from '../styles/theme';

const PaymentSelector = ({ input, handleOnChange }) => {
  return (
    <div className="mt-3">
      {/* <Error errors={input.errors} fieldName={'paymentMethod'} /> */}
      {/*Direct bank transfers*/}
      {/* <div className="payment-input-container">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="bacs"
            className="radio-btn"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content">Direct Bank Transfer</span>
        </label>
      </div> */}
      {/*Pay with Paypal*/}
      <div className="payment-input-container">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="paypal"
            className="radio-btn"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content">Paypal</span>
        </label>
      </div>
      {/*Check Payments*/}
      {/* <div className="payment-input-container">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="cheque"
            className="radio-btn"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content">Check Payments</span>
        </label>
      </div> */}
      {/*Pay with Stripe*/}
      <div className="payment-input-container">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="cod"
            className="radio-btn"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content">Cash on Delivery</span>
        </label>
      </div>
      {/*	Payment Instructions*/}
      {/* <div className="payment-instructions">
        Please send a check to Store Name, Store Street, Store Town, Store State / County, Store
        Postcode.
      </div> */}
      <style jsx>{`
        .radio-btn {
          margin-right: 5px;
          width: 15px;
          height: 15px;
          border-radius: 0;
          border: 1px solid rgb(${colors.violet});
        }
      `}</style>
    </div>
  );
};

export default PaymentSelector;
