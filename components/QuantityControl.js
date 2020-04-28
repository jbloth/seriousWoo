// import { useState } from 'react';

// import { colors } from '../styles/theme';

// const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
//   const [value, setValue] = useState(quantity);

//   const handleChange = (e) => {
//     let inp = e.target.value;
//     if (Number(inp)) {
//       setValue(Number(inp));
//     }
//     console.log(value);
//   };
//   const handleDecrease = () => {
//     value > 1 ? setValue(value - 1) : setValue(0);
//   };
//   const handleIncrease = () => {
//     value < 999 ? setValue(value + 1) : setValue(99);
//   };

//   return (
//     <div className="cart-item__quantity quantity-control">
//       <button onClick={handleDecrease} className="qc-child qc-button decrease">
//         -
//       </button>
//       <input
//         className="quantity qc-child"
//         name="quantity"
//         value={value}
//         onChange={handleChange}
//         type="text"
//       />
//       <button onClick={handleIncrease} className="qc-child qc-button increase">
//         +
//       </button>

//       <style jsx>{`
//         .quantity-control {
//           background-color: white;
//           display: flex;
//           width: 120px;
//           height: 40px;
//           border: 1px solid ${colors.textblue};
//         }

//         .qc-child {
//           font-size: 1.6rem;
//           width: 33.3%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0;
//           border: none;
//         }

//         .quantity-control input[type='number'] {
//           -webkit-appearance: textfield;
//           -moz-appearance: textfield;
//           appearance: textfield;
//         }

//         .quantity-control input[type='number']::-webkit-inner-spin-button,
//         .quantity-control input[type='number']::-webkit-outer-spin-button {
//           -webkit-appearance: none;
//         }

//         .qc-button {
//           -webkit-appearance: none;
//           cursor: pointer;

//           position: relative;
//         }

//         .quantity {
//           text-align: center;
//           border-left: 1px solid ${colors.lightgray};
//           border-right: 1px solid ${colors.lightgray};
//         }
//       `}</style>
//     </div>
//   );
// };

// export default QuantityControl;

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
    <div className="cart-item__quantity quantity-control">
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
      `}</style>
    </div>
  );
};

export default QuantityControl;
