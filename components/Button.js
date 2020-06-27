import { colors, fonts, breakPoints } from '../styles/theme';

const Button = ({ extraClass, children, ...otherProps }) => (
  <button className={`btn ${extraClass ? extraClass : ''}`} {...otherProps}>
    {children}

    <style jsx>
      {`
        .btn {
          font-family: ${fonts.text};
          font-size: 1.4rem;
          height: 3rem;
          background-color: rgb(${colors.orange});
          color: rgb(${colors.bg});
          border: 2px solid transparent;
          width: auto;
          white-space: nowrap;

          text-align: center;
          padding: 0 12px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: rgb(${colors.bg});
          color: rgb(${colors.orange});
          border: 2px solid rgb(${colors.orange});
        }

        .btn--big {
          font-size: 1.8rem;
          height: 4rem;
          width: 100%;
        }

        .btn--inverted {
          background-color: rgb(${colors.bg});
          color: rgb(${colors.orange});
          border: 2px solid rgb(${colors.orange});
        }

        .btn--inverted:hover {
          background-color: rgb(${colors.orange});
          color: rgb(${colors.bg});
          border: 2px solid transparent;
        }

        .btn--blue {
          background-color: rgb(${colors.vibrantblue});
        }

        .btn--blue:hover {
          background-color: rgb(${colors.bg});
          color: rgb(${colors.vibrantblue});
          border: 2px solid rgb(${colors.vibrantblue});
        }

        .btn--grow {
          width: 100%;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .btn {
            height: 4rem;
            font-size: 1.8rem;
          }
        }
      `}
    </style>
  </button>
);

export default Button;
