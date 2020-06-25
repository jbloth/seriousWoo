import { colors, breakPoints } from '../styles/theme';

export default function Custom404() {
  return (
    <section className="not-found-page section">
      <h1>404</h1>
      <h2>That page doesn't exist. Sorry.</h2>

      <style jsx>{`
        .not-found-page {
          flex-direction: column;
          min-height: 36rem;
        }

        h1 {
          color: rgb(${colors.lightblue});
        }
      `}</style>
    </section>
  );
}
