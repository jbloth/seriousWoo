import { colors, breakPoints } from '../styles/theme';
import BgShape from '../components/BgShape';

const Contact = () => {
  return (
    <section className="about-page section">
      <BgShape version={3} extraClass="bg-shape-03" />
      <BgShape version={2} extraClass="bg-shape-02" />
      <div className="about-content">
        <div className="about-images">
          <div className="img-frame">
            <img className="about-img" src={'/images/marco-xu-H1hdzdv7Jnw-unsplash 1.png'} />
          </div>
        </div>
        <div className="about-info">
          <h1>Here's what it's all about</h1>
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum.
            </p>
            <br />
            <p>
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          padding-bottom: 10rem;
        }

        .about-content {
          display: flex;
          justify-content: space-between;
          padding: 0 4rem;
        }

        :global(.bg-shape-02) {
          left: -12vw;
          top: 240px;
          width: 60vw;
          max-width: 570px;
          z-index: -3;
          fill: rgb(${colors.lightyellow});
        }

        :global(.bg-shape-03) {
          right: -10%;
          top: -22%;
          width: 70%;
          z-index: -3;
          fill: rgb(${colors.lightyellow});
        }

        .img-frame {
          width: 40vw;
          height: 38vw;
          background-color: rgba(${colors.lightblue}, 0.6);
          position: relative;
        }

        .about-img {
          width: 84%;
          height: auto;
          position: absolute;
          top: 16%;
          left: 11%;
        }

        .about-info {
          width: 46%;
          align-self: center;
        }

        h1 {
          color: ${colors.orange};
        }

        @media only screen and (max-width: ${breakPoints.bp_large}) {
          h1 {
            line-height: 1.2;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .about-content {
            flex-direction: column;
            align-items: center;
          }

          .img-frame {
            width: 60vw;
            height: 56vw;
            margin-bottom: 4rem;
          }

          .about-info {
            width: 80%;
            align-self: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
