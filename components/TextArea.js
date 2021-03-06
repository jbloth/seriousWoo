import { colors, fonts } from '../styles/theme';

const TextArea = ({ extraClass, label, error, ...otherProps }) => (
  <div className="group">
    <textarea className={`textInput ${extraClass}`} {...otherProps} />

    {label ? (
      <label className={`${otherProps.value && otherProps.value.length ? 'shrink' : ''} label`}>
        {label + (otherProps.required ? ' (required)' : '')}
      </label>
    ) : null}

    {error && <div className="error-msg">{error}</div>}

    <style jsx>{`
      .group {
        position: relative;
      }

      .textInput {
        resize: none;
        font-family: ${fonts.text};
        font-size: 1.4rem;
        color: rgb(${colors.textblue});
        width: 100%;
        background-color: rgb(${colors.bg});
        border: 2px solid rgb(${colors.violet});
        padding-left: 5px;
      }

      .textInput--dark {
        color: rgb(${colors.textblue});
        border: 2px solid rgb(${colors.textblue});
      }

      .textInput:focus ~ .label {
        top: -20px;
        font-size: 1.4rem;
      }

      .label {
        color: rgb(${colors.darkpink});
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
        color: rgb(${colors.textred});
        font-size: 1.4rem;
      }
    `}</style>
  </div>
);

export default TextArea;
