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
      }

      .textInput {
        font-family: ${fonts.text};
        font-size: 1.6rem;
        color: ${colors.textred};
        height: 3rem;
        width: 100%;
        background-color: ${colors.bg};
        border: 2px solid ${colors.violet};
        padding-left: 5px;
      }

      .textInput--bottomOnly {
        color: ${colors.textblue};
        border: none;
        border-bottom: 1px solid ${colors.violet};
      }

      .textInput--red {
        color: ${colors.textblue};
        border: 1px solid ${colors.textred};
      }

      .textInput::placeholder {
        color: ${colors.darkpink};
      }

      .textInput:focus ~ .label {
        top: -20px;
        font-size: 1.4rem;
      }

      .label {
        color: ${colors.darkpink};
        position: absolute;
        left: 5px;
        top: 2px;
        pointer-events: none;
        transition: 300ms ease all;
      }

      .label.shrink {
        top: -18px;
        font-size: 1.2rem;
      }

      .error-msg {
        color: ${colors.textred};
        font-size: 1.4rem;
      }

      @media only screen and (max-width: ${breakPoints.bp_md}) {
        .textInput {
          height: 4rem;
          font-size: 1.8rem;
        }

        .textInput--red {
          border: 2px solid ${colors.textred};
        }
      }
    `}</style>
  </div>
);

export default TextInput;
