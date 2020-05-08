import { colors } from '../styles/theme';

import { colors, breakPoints } from '../styles/theme';
import BgShape from '../components/BgShape';

const Contact = () => {
  return (
    <section className="about-page section">
      <BgShape version={1} fillColor={colors.lightyellow} extraClass="bg-shape-01" />
      <BgShape version={2} fillColor={colors.lightyellow} extraClass="bg-shape-02" />
      <div className="about-content">
        <div className="about-images">
          <div className="img-frame" />
          <img className="about-img" src={'/images/marco-xu-H1hdzdv7Jnw-unsplash 1.png'} />
        </div>
        <div className="about-info">
          <h1>Here's what it's all about</h1>
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum.
            </p>
            <p>
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-content {
          display: flex;
        }

        .img-frame {
          width: 30vw;
          height: 30vw;
          background-color: ${colors.lightblue};
        }

        h1 {
          color: ${colors.orange};
        }
      `}</style>
    </section>
  );
};

export default Contact;
