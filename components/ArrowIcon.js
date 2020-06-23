const ArrowIcon = ({ color, open, width }) => {
  return (
    <div className={`icon-wrapper arrow-icon ${open ? 'arrow-open' : ''}`}>
      <svg width={width} height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.551,22.781l-9.914,-6.212l2.42,-3.862l13.455,8.432l6.406,3.861l-6.406,3.861l-13.455,8.432l-2.42,-3.862l9.914,-6.212l-27.469,0l0,-4.438l27.469,0Z" />
      </svg>

      <style jsx>{`
        .arrow-icon {
          display: flex;
          align-items: center;
          fill: rgb(${color});
        }

        .arrow-icon svg {
          width: ${width};
        }

        .arrow-open {
          transform: rotate(90deg) translate(0, 6px);
        }
      `}</style>
    </div>
  );
};

export default ArrowIcon;
