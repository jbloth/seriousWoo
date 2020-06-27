import { colors, breakPoints } from '../styles/theme';

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  const handleDecrease = (e) => {
    e.stopPropagation();
    onDecrease();
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    onIncrease();
  };

  return (
    <div className="quantity-control">
      <div onClick={handleDecrease} className="qc-child decrease">
        -
      </div>
      <div className="qc-child">{quantity}</div>
      <div onClick={handleIncrease} className="qc-child increase">
        +
      </div>

      <style jsx>{`
        .quantity-control {
          background-color: white;
          display: flex;
          width: 120px;
          height: 40px;
        }

        .qc-child {
          width: 33.3%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .decrease,
        .increase {
          cursor: pointer;
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .quantity-control {
            width: 100px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuantityControl;
