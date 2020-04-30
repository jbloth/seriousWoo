import { colors, fonts } from '../styles/theme';

const TextArea = ({ extraClass, label, ...otherProps }) => (
  <div className="group">
    <textarea className={`textInput ${extraClass}`} {...otherProps} />

    {label ? (
      <label className={`${otherProps.value && otherProps.value.length ? 'shrink' : ''} label`}>
        {label + (otherProps.required ? ' (required)' : '')}
      </label>
    ) : null}

    <style jsx>{`
      .group {
        position: relative;
      }

      .textInput {
        resize: none;
        font-family: ${fonts.text};
        font-size: 1.4rem;
        color: ${colors.textblue};
        width: 100%;
        background-color: ${colors.bg};
        border: 2px solid ${colors.violet};
        padding-left: 5px;
      }

      .textInput--dark {
        color: ${colors.textblue};
        border: 2px solid ${colors.textblue};
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
    `}</style>
  </div>
);

export default TextArea;
