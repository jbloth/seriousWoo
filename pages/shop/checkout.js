import { colors } from '../../styles/theme';
import CheckoutForm from '../../components/CheckoutForm';

const Checkout = ({ categorySlug }) => {
  return (
    <section className="section checkout-page">
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
    </section>
  );
};

export default Checkout;
