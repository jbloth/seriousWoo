import { useQuery } from '@apollo/react-hooks';

import GET_PAYMENT_METHODS from '../queries/get-payment-methods';
import { colors } from '../styles/theme';
// import InfoIcon from '../assets/info.svg';

const InfoIcon = (props) => (
  <svg
    viewBox="0 0 50 50"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    {...props}
  >
    <path d="M25 0c13.798 0 25 11.202 25 25S38.798 50 25 50 0 38.798 0 25 11.202 0 25 0zm0 5c11.038 0 20 8.962 20 20s-8.962 20-20 20S5 36.038 5 25 13.962 5 25 5z" />
    <path d="M21.5 18H28.5V42H21.5z" />
    <circle cx={25} cy={11.5} r={4} />
  </svg>
);

const PaymentSelector = ({ input, handleOnChange }) => {
  const { loading, error, data } = useQuery(GET_PAYMENT_METHODS);

  return (
    <div>
      {loading && <div className="loading-msg">Loading payment methods...</div>}
      {error && <div className="error-msg">Could not load payment methods.</div>}

      {data && data.paymentGateways && data.paymentGateways.nodes ? (
        data.paymentGateways.nodes.map((payment, idx) => {
          return (
            <div key={idx} className="payment-input-container">
              <input
                onChange={handleOnChange}
                value={payment.id}
                className="radio-btn"
                name="paymentMethod"
                type="radio"
              />
              <span className="payment-title">{payment.title}</span>
              <div className="info-icon-wrap">
                <InfoIcon />
                <div className="info-modal">{payment.description}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="error-msg">Could not load payment methods.</div>
      )}

      <style jsx>{`
        .payment-input-container {
          display: flex;
          align-items: center;
        }

        .radio-btn {
          margin-right: 5px;
          width: 15px;
          height: 15px;
          border-radius: 0;
          border: 1px solid rgb(${colors.violet});
        }

        .info-icon-wrap {
          margin: 0 5px;
          display: inline-block;
          width: 15px;
          fill: rgb(${colors.lightgray});
          display: grid;
          cursor: pointer;
          position: relative;
        }

        .info-icon-wrap:hover .info-modal {
          display: block;
        }

        .info-modal {
          max-width: 50rem;
          background-color: rgb(${colors.lightyellow});
          border: 1px solid rgb(${colors.textblue});
          z-index: 98;
          position: absolute;
          padding: 0.5rem;
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PaymentSelector;
