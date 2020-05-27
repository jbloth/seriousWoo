import { breakPoints } from '../styles/theme';

const ConnectAreaItem = ({ children, title }) => {
  return (
    <li className="connectArea__item">
      <p className="connectArea__cta">
        <span>{title}</span> <span className="connectArea__arrow">:</span>
      </p>
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
            flex-direction: column;
            align-items: flex-start;
          }

          .connectArea__cta {
            width: unset;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
        }
      `}</style>
    </li>
  );
};

export default ConnectAreaItem;
