import { useState } from 'react';

import { colors, fonts, breakPoints } from '../styles/theme';

const SizeSelector = ({ sizes, onSelect }) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0].id);

  const handleChange = (e) => {
    setSelectedSize(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="select-wrapper">
      <select className="size-select" value={selectedSize} onChange={handleChange}>
        {sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.name}
          </option>
        ))}
      </select>
      <div className="icon-wrapper">
        <svg
          width="18px"
          height="100%"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24.992,30.642l17.268,-18.533l3.62,3.373l-20.88,22.409l0,0l0,0l-3.381,-3.629c0,0 -17.499,-18.78 -17.499,-18.78l3.62,-3.373l17.252,18.533Z" />
        </svg>
      </div>

      <style jsx>{`
        .select-wrapper {
          position: relative;
          width: 6rem;
        }

        select {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;

          height: 3rem;
          font-family: ${fonts.text};
          padding: 0 5px;
          background-color: rgb(${colors.bg});
          color: rgb(${colors.orange});
          border: 2px solid rgb(${colors.orange});
          width: 6rem;
          border-radius: 0;
        }

        select::-ms-expand {
          display: none;
        }

        .icon-wrapper {
          position: absolute;
          top: 3%;
          right: 5px;
          pointer-events: none;
          height: 3rem;
        }

        .icon-wrapper svg {
          width: 1.4rem;
          fill: rgb(${colors.orange});
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .select-wrapper {
            width: 7rem;
          }

          select {
            height: 4rem;
            font-size: 1.8rem;
            width: 7rem;
          }

          .icon-wrapper {
            top: 13%;
            right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default SizeSelector;
