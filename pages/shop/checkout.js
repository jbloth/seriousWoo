import { colors } from '../../styles/theme';
import CheckoutForm from '../../components/CheckoutForm';

const Checkout = ({ categorySlug }) => {
  return (
    <div className="section checkout-page">
      <h1>Checkout</h1>
      <CheckoutForm />
      <style jsx>{`
        .checkout-page {
          flex-direction: column;
        }

        h1 {
          color: ${colors.lightblue};
        }
      `}</style>
    </div>
  );
};

export default Checkout;
