import { colors, fonts, breakPoints } from '../styles/theme';

const SplitHero = ({ children }) => {
  return (
    <div className="hero l-wrapper">
      <div className="heroImg-container">
        <picture>
          <source
            srcSet={require('../assets/images/tarutoa-QIymolbz7G0-unsplash.png?webp')}
            type="image/webp"
          />
          <source
            srcSet={require('../assets/images/tarutoa-QIymolbz7G0-unsplash.png')}
            type="image/png"
          />
          <img
            className="heroImg"
            alt="Young woman wearing T-Shirt"
            src={require('../assets/images/tarutoa-QIymolbz7G0-unsplash.png')}
          />
        </picture>
        <div className="hero__text">{children}</div>
        <div className="photo-credit">
          Photo from <a href="https://unsplash.com/photos/PDxIL5Jbqew">Tarutoa</a> on
          <a href="https://unsplash.com/"> Unsplash</a>
        </div>
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

        .heroImg-container {
          width: 50%;
          flex-grow: 1;
          position: relative;
        }

        .heroImg {
          width: 100%;
          flex-grow: 1;
          object-fit: cover;
          background-size: cover;
          background-position: center;
          height: 100%;
          background-color: rgb(${colors.violet});
        }

        .photo-credit {
          position: absolute;
          top: 8px;
          right: 8px;
          color: rgb(${colors.bg});
          font-size: 1.2rem;
        }

        .photo-credit a {
          color: rgb(${colors.violet});
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
          z-index: 50;
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

          .heroImg-container {
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
