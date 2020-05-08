import { colors, fonts, breakPoints } from '../styles/theme';

const SplitHero = ({ imgUrl, children }) => {
  return (
    <div className="hero l-wrapper">
      <div style={{ backgroundImage: `url('${imgUrl}')` }} className="hero__img">
        <div className="hero__text">{children}</div>
      </div>

      <div className="hero__greeting">{children}</div>

      <style jsx>{`
        .hero {
          width: 70vw;
          max-width: 900px;
          max-height: 514px;
          height: 40vw;

          display: flex;
          justify-content: center;
        }

        .hero__img {
          width: 50%;
          flex-grow: 1;
          background-size: cover;
          background-position: center;
          height: auto;
          background-color: rgb(${colors.violet});
        }

        .hero__text {
          padding: 10rem 6rem;
          font-size: 6rem;
          display: none;
          background-color: rgb(${colors.lightyellow});
          border-radius: 50%;
          line-height: 1;
          font-family: ${fonts.text};

          font-weight: normal;
          color: rgb(${colors.orange});
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 55%;
          left: -40px;
          z-index: 100;
        }

        .hero__greeting {
          font-family: ${fonts.heading};
          font-size: 6rem;
          font-weight: normal;
          text-decoration: underline;

          width: 50%;

          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background-color: rgb(${colors.lightpink});
          color: rgb(${colors.textred});
        }

        @media only screen and (max-width: ${breakPoints.bp_largest}) {
          .hero__greeting {
            font-size: 4rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .hero {
            width: 100%;
            max-height: 700px;
            height: 100vw;
            flex-direction: column;
            align-items: center;
          }

          .hero__img {
            width: 100%;
            max-height: 700px;
            height: 100vw;
            position: relative;
          }

          .hero__text {
            display: flex;
          }

          .hero__text p {
            margin: 1rem 0;
            line-height: 0.5;
            letter-spacing: 0.08em;
            padding: 10px 10px;
          }

          .hero__greeting {
            display: none;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .hero {
            width: 100%;
          }

          .hero__text {
            font-size: 4rem;
            padding: 8rem 6rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .hero__text {
            font-size: 3rem;
            left: -30px;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .hero__text {
            font-size: 2.5rem;
            padding: 6rem 5rem;
            line-height: 1.3;
            left: -20px;
          }
        }
      `}</style>
    </div>
  );
};

export default SplitHero;
