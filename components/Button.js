import { colors, fonts } from '../styles/theme';

const Button = ({ className, children, ...otherProps }) => (
  <button className={`btn ${className ? className : ''}`} {...otherProps}>
    {children}

    <style jsx>
      {`
        .btn {
          font-family: ${fonts.text};
          font-size: 1.4rem;
          height: 3rem;
          background-color: ${colors.orange};
          color: ${colors.bg};
          border: 2px solid transparent;

          text-align: center;
          padding: 0 12px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: ${colors.bg};
          color: ${colors.orange};
          border: 2px solid ${colors.orange};
        }

        .btn--big {
          font-size: 1.8rem;
          height: 4rem;
          width: 100%;
        }

        .btn--inverted {
          background-color: ${colors.bg};
          color: ${colors.orange};
          border: 2px solid ${colors.orange};
        }

        .btn--inverted:hover {
          background-color: ${colors.orange};
          color: ${colors.bg};
          border: 2px solid transparent;
        }

        .btn--blue {
          background-color: ${colors.vibrantblue};
        }

        .btn--blue:hover {
          background-color: ${colors.bg};
          color: ${colors.vibrantblue};
          border: 2px solid ${colors.vibrantblue};
        }
      `}
    </style>
  </button>
);

export default Button;
