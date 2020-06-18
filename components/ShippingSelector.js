import { useMutation } from '@apollo/react-hooks';
import { useState, useContext, useEffect } from 'react';

import { AppContext } from '../components/context/AppContext';
import { colors } from '../styles/theme';

import SET_SHIPPING_METHOD from '../mutations/set-shipping-method';

const ShippingSelector = ({ rates, refetch, initialShippingId }) => {
  const { cart, setCart } = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  const [setShippingMethod, { data, loading, error: setSHippingError }] = useMutation(
    SET_SHIPPING_METHOD,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            setRequestError(error.graphQLErrors[0].message);
          }
          console.log(error);
        }
      },
    }
  );

  let minRate = rates.reduce(
    (min, rate) => (parseFloat(rate.cost) < parseFloat(min.cost) ? rate : min),
    rates[0]
  );

  // Find lowest shipping rate and select by default.
  useEffect(() => {
    if (minRate?.id && initialShippingId !== minRate.id) {
      setShippingMethod({
        variables: {
          input: {
            clientMutationId: 'whatever',
            shippingMethods: [minRate.id],
          },
        },
      });
    }
  }, []);

  // selector callback
  const onChange = (event) => {
    setShippingMethod({
      variables: {
        input: {
          clientMutationId: 'whatever',
          shippingMethods: [event.target.value],
        },
      },
    });
  };

  return (
    <div className="shipping-rates-container">
      {rates.length ? (
        rates.map((rate, idx) => {
          return (
            <div key={idx} className="rate-details">
              <input
                onChange={onChange}
                value={rate.id}
                className="radio-btn"
                name="shippingMethod"
                type="radio"
                defaultChecked={rate.id === minRate.id ? 'checked' : false}
              />
              <p>
                <span className="rate-label">{rate.label}:</span>{' '}
                <span className="rate-price">&euro;{rate.cost.replace('.', ',')}</span>
              </p>
            </div>
          );
        })
      ) : (
        <div className="error-msg">Could not load shipping methods.</div>
      )}
      {setSHippingError && <div className="error msg">Could not set shipping method.</div>}
      <style jsx>{`
        .rate-details {
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
      `}</style>
    </div>
  );
};

export default ShippingSelector;
