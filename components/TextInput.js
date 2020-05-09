import { colors, fonts, breakPoints } from '../styles/theme';

const TextInput = ({ extraClass, label, error, ...otherProps }) => (
  <div className="group">
    <input className={`textInput ${extraClass}`} {...otherProps} />

    {label && (
      <label className={`${otherProps.value && otherProps.value.length ? 'shrink' : ''} label`}>
        {label + (otherProps.required ? ' (required)' : '')}
      </label>
    )}

    {error && <div className="error-msg">{error}</div>}

    <style jsx>{`
      .group {
        position: relative;
        width: 100%;
      }

      .textInput {
        font-family: ${fonts.text};
        font-size: 1.6rem;
        color: rgb(${colors.textred});
        height: 3rem;
        width: 100%;
        background-color: rgb(${colors.bg});
        border: 2px solid rgb(${colors.violet});
        padding-left: 5px;
      }

      .textInput--bottomOnly {
        color: rgb(${colors.textblue});
        border: none;
        border-bottom: 1px solid rgb(${colors.violet});
      }

      .textInput--red {
        color: rgb(${colors.textblue});
        border: 1px solid rgb(${colors.textred});
      }

      .textInput--large {
        height: 4rem;
      }

      .textInput--large ~ .label {
        top: 6px;
        left: 8px;
      }

      .textInput--large:focus ~ .label {
        top: -20px;
        font-size: 1.4rem;
      }

      .textInput--large ~ .label.shrink {
        top: -18px;
        font-size: 1.2rem;
      }

      .textInput::placeholder {
        color: rgb(${colors.darkpink});
      }

      .textInput:focus ~ .label {
        top: -20px;
        font-size: 1.4rem;
      }

      .label {
        color: rgb(${colors.darkpink});
        position: absolute;
        left: 6px;
        top: 2px;
        pointer-events: none;
        transition: 300ms ease all;
      }

      .label.shrink {
        top: -18px;
        font-size: 1.2rem;
      }

      .error-msg {
        color: rgb(${colors.textred});
        font-size: 1.4rem;
      }

      @media only screen and (max-width: ${breakPoints.bp_md}) {
        .textInput {
          height: 4rem;
          font-size: 1.8rem;
        }

        .textInput--red {
          border: 2px solid rgb(${colors.textred});
        }
      }
    `}</style>
  </div>
);

export default TextInput;
