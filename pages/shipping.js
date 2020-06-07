import { colors, breakPoints } from '../styles/theme';

const Shipping = () => {
  return (
    <section className="shipping-page section">
      <h1>Shipping</h1>
      <p className="no-fullfill-msg">
        Currently this site only serves demonstration purposes and it is not possible to place
        orders. Shipping information will be added once we are ready to accept orders.
      </p>

      <style jsx>{`
        .shipping-page {
          flex-direction: column;
          justify-content: center;
        }

        .no-fullfill-msg {
          max-width: 100rem;
        }
      `}</style>
    </section>
  );
};

export default Shipping;
