import { useState } from 'react';

import { colors, fonts } from '../styles/theme';
import countryList from '../assets/countryList';

const CountrySelector = ({ onSelect, label, ...otherProps }) => {
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="select-wrapper">
      {label ? (
        <label className="shrink label">
          {label + (otherProps && otherProps.required ? ' (required)' : '')}
        </label>
      ) : null}
      <select
        className="size-select"
        name="country"
        value={selectedCountry}
        onChange={handleChange}
      >
        {countryList.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
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
          width: 20rem;
        }

        .label {
          color: rgb(${colors.darkpink});
          position: absolute;
          left: 5px;
          top: 2px;
          pointer-events: none;
        }

        .label.shrink {
          top: -18px;
          font-size: 1.2rem;
        }

        select {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;

          height: 4rem;
          font-family: ${fonts.text};
          font-size: 1.4rem;
          color: rgb(${colors.textblue});
          padding: 0 5px;
          background-color: rgb(${colors.bg});
          border: 2px solid rgb(${colors.violet});
          width: 20rem;
          border-radius: 0;
        }

        select::-ms-expand {
          display: none;
        }

        .icon-wrapper {
          position: absolute;
          top: 0.8rem;
          right: 10px;
          pointer-events: none;
          height: 3rem;
        }

        .icon-wrapper svg {
          width: 1.4rem;
          fill: rgb(${colors.textblue});
        }
      `}</style>
    </div>
  );
};

export default CountrySelector;
