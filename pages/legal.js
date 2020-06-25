import Head from 'next/head';

import { colors } from '../styles/theme';

const Legal = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="imprint-page section">
        <h1>Legal Notice/ Impressum</h1>
        <div className="imprint-content">
          <h2>Resposible for content/ Verantwortlich für den Inhalt gemäß § 5 TMG:</h2>

          <h4>Address: </h4>
          <p>Juliane Blothner</p>
          <p>Pettenkofer Str. 2</p>
          <p>50823 Köln</p>
          <p>Germany</p>

          <h2>Contact:</h2>
          <p>Email: info@serious-salmon.com</p>
          <p>Phone: +49 17696041817</p>

          <h2>Online dispute resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (OS). This is
            available at{' '}
            <a href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</a>.
          </p>
        </div>
        <style jsx>{`
          .imprint-page {
            flex-direction: column;
          }

          h1 {
            color: rgb(${colors.lightblue});
          }

          .imprint-content {
            max-width: 80rem;
          }

          h2 {
            padding: 2rem 0 1rem 0;
          }

          p,
          ul {
            text-align: justify;
            margin-bottom: 1rem;
          }
        `}</style>
      </section>
    </>
  );
};

export default Legal;
