import { breakPoints } from '../styles/theme';

const ConnectAreaItem = ({ children, title }) => {
  return (
    <li className="connectArea__item">
      <span className="connectArea__cta">{title} --></span>
      {children}

      <style jsx>{`
        .connectArea__item {
          display: flex;
          align-items: center;
        }

        .connectArea__cta {
          display: inline-block;
          width: 11rem;
          font-weight: bold;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .connectArea__item {
            margin: 10px 0 18px 0;
            width: 100%;
          }

          .connectArea__cta {
            display: none;
          }
        }
      `}</style>
    </li>
  );
};

export default ConnectAreaItem;
