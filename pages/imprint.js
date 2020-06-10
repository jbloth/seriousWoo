import Head from 'next/head';

import { colors } from '../styles/theme';

const Imprint = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="imprint-page section">
        <h1>Imprint</h1>
        <div className="imprint-content">
          <h2>Address</h2>
        </div>
        <style jsx>{`
          .imprint-page {
            flex-direction: column;
          }

          h1 {
            color: rgb(${colors.lightblue});
          }

          .imprint-content {
            max-width: 100rem;
          }
        `}</style>
      </section>
    </>
  );
};

export default Imprint;
