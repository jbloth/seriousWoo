import { colors, breakPoints } from '../styles/theme';

import GET_NEWEST_PRODUCTS from '../queries/get-newest-products';
import BgShape from '../components/BgShape';
import SplitHero from '../components/SplitHero';
import CategoryGallery from '../components/CategoryGallery';
import ProductGallery from '../components/ProductGallery';

const Index = ({ newestProducts }) => {
  return (
    <main>
      <section className="home-hero section">
        <BgShape version={1} fillColor={colors.lightyellow} extraClass="bg-shape-01" />
        <BgShape version={2} fillColor={colors.lightyellow} extraClass="bg-shape-02" />
        <SplitHero imgUrl={'/images/tarutoa-QIymolbz7G0-unsplash 1.png'}>
          <p>This is</p>
          <p>serious!</p>
          {/* <p>Serious Sally!</p> */}
        </SplitHero>
      </section>

      <section className="about section">
        <div className="banner banner--about l-wrapper">
          <p>We make clothes for earnest people!</p>
          <p>No Joke!</p>
        </div>
      </section>

      <section className="categories section">
        <CategoryGallery />
        <BgShape version={3} fillColor={colors.lightyellow} extraClass="bg-shape-03" />
      </section>

      <section className="quote section">
        <div className="banner banner--quote l-wrapper">
          <p className="banner--quote__text">Being earnest is kind of important.</p>
          <p className="banner--quote__source">(kind of Oscar Wilde)</p>
        </div>
      </section>

      <section className="newIn section">
        <div className="productGallery-container">
          <h1 className="galleryTitle">New In</h1>
          <ProductGallery products={newestProducts} />
        </div>
      </section>

      <style jsx>{`
        main {
           {
            /* overflow-x: hidden;
          position: relative; */
          }
        }

        .home-hero {
          padding: 6rem 8rem 8rem 8rem;
        }

        .about {
          height: 400px;
          background-color: ${colors.lightviolet};
        }

        .banner {
          font-family: $font-text;
          font-size: 4.85rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
           {
            /* width: 100%; */
          }
        }

        .banner--about {
          color: ${colors.textgreen};
          text-align: center;
        }

        .banner--quote {
          color: ${colors.orange};
        }

        .banner--quote__text {
          font-weight: bold;
        }

        .banner--quote__source {
          font-size: 3rem;
          position: relative;
          align-self: flex-end;
        }

        .categories {
          padding: 8rem 14rem;
          position: relative;
        }

        .quote {
          height: 300px;
          background-color: ${colors.lightyellow};
        }

        .productGallery-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .galleryTitle {
          color: ${colors.lightblue};
        }

        :global(.bg-shape-01) {
          right: -14vw;
          top: 30px;
          width: 60vw;
          z-index: -3;
          max-width: 600px;
        }

        :global(.bg-shape-02) {
          left: -12vw;
          top: 240px;
          width: 60vw;
          max-width: 570px;
          z-index: -3;
        }

        :global(.bg-shape-03) {
          right: -10%;
          top: -32%;
          width: 80%;
          z-index: -3;
        }

        @media only screen and (max-width: ${breakPoints.bp_large}) {
          .about {
            height: 300px;
          }

          .banner {
            font-size: 4rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .home-hero {
            padding: 4rem 6rem 8rem 6rem;
          }

          :global(.bg-shape-02) {
            top: 4%;
          }

          :global(.bg-shape-03) {
            right: -13%;
            top: 48%;
            width: 80%;
          }

          .banner {
            font-size: 3rem;
          }

          .banner--quote__source {
            font-size: 2.5rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          :global(.bg-shape-01) {
            top: 85px;
            width: 150vw;
          }

          .categories {
            padding: 6rem 8rem;
          }

          :global(.bg-shape-02) {
            display: none;
          }

          :global(.bg-shape-03) {
            width: 100%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          :global(.bg-shape-01) {
            width: 100vw;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .home-hero {
            padding: 2rem 4rem 8rem 4rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          :global(.bg-shape-01) {
            top: -25px;
          }

          .banner {
            font-size: 2.5rem;
          }

          .banner--quote__source {
            font-size: 2rem;
          }
        }
      `}</style>
    </main>
  );
};

Index.getInitialProps = async function (context) {
  const number = 4;
  const client = context.apolloClient;

  const res = await client.query({
    query: GET_NEWEST_PRODUCTS,
    variables: { number: number },
  });

  return {
    newestProducts: res.data.products.nodes,
  };
};

export default Index;
