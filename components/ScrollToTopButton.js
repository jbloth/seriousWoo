import { useState, useEffect } from 'react';

import { colors } from '../styles/theme';
import ArrowUp from '../assets/arrow-up.svg';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const checkScrollTop = () => {
    if (!visible && window && window.pageYOffset > 500) {
      setVisible(true);
    } else if (visible && window && window.pageYOffset <= 500) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  });

  return (
    <div
      className={`scroll-top-btn ${visible ? 'scroll-top-btn--active' : ''}`}
      onClick={scrollTop}
    >
      <div className="icon-container">
        <ArrowUp />
      </div>

      <style jsx>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background-color: rgb(${colors.violet});
          z-index: 93;
          cursor: pointer;
          height: 4.5rem;
          display: none;
        }

        .scroll-top-btn--active {
          display: flex;
          align-items: center;
        }

        .icon-container {
          width: 4rem;
          height: 4rem;
          padding: 0.4rem;
          fill: rgb(${colors.bg});
        }
      `}</style>
    </div>
  );
};

export default ScrollToTopButton;
