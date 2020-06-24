const Loading = ({ width }) => {
  return (
    <div className="container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 193 193"
        x="0px"
        y="0px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="pathForText" d="M12,96A84,84 0 1 1180,96A84,84 0 1 112,96" />
          {/* <path id="pathForText" d="M12,96a84,84 0 1,0 168,0a84,84 0 1,0 -168,0" /> */}
          {/* <circle cx="96" cy="96" r="84"/> */}
        </defs>

        <circle cx="96" cy="96" r="74" fill="#df6738" />
        <path
          id="fish"
          d="M21.873,95.942c0.004,-4.639 -0.762,-12.431 -1.254,-16.947c-0.075,-0.717 0.239,-1.418 0.824,-1.839c0.584,-0.421 1.349,-0.497 2.005,-0.2c3.428,1.684 9.371,4.845 16.763,9.786c1.015,0.675 2.304,0.787 3.421,0.298c11.709,-5.251 19.338,-14.572 55.637,-14.766c28.614,-0.153 46.223,16.898 50.994,22.188c0.762,0.889 0.762,2.201 -0.002,3.089c-4.78,5.284 -22.419,22.318 -51.034,22.137c-36.305,-0.231 -43.914,-9.257 -55.618,-14.487c-1.112,-0.487 -2.395,-0.377 -3.407,0.291c-7.45,4.95 -13.428,7.987 -16.851,9.564c-0.654,0.274 -1.405,0.183 -1.973,-0.241c-0.569,-0.424 -0.872,-1.116 -0.797,-1.822c0.496,-4.499 1.288,-12.376 1.292,-17.051Z"
          style={{ fill: '#f7f5f5' }}
        />
        <g id="exclam">
          <path
            d="M113.545,56.201c0,-1.652 -0.27,-2.873 -2.279,-2.874l-27.119,0.108c-2.008,-0.001 -2.09,1.102 -2.09,2.754l6.468,55.85c0,1.652 1.547,1.675 3.555,1.675l9.685,0.041c2.821,0.02 3.238,-0.456 3.238,-2.108l8.542,-55.446Z"
            style={{ fill: '#d5b6e4' }}
          />
          <path
            d="M96.275,119.305c5.836,0.002 10.573,4.372 10.573,9.752c0,5.38 -4.737,9.746 -10.573,9.743c-5.835,-0.002 -10.573,-4.371 -10.573,-9.751c0,-5.38 4.738,-9.746 10.573,-9.744Z"
            style={{ fill: '#d5b6e4' }}
          />
        </g>

        <g id="circleAndText">
          <circle cx="96" cy="96" r="104" fill="none" />

          <text className="circleText">
            <textPath xlinkHref="#pathForText">LOADING</textPath>
          </text>
        </g>
      </svg>

      <style jsx>{`
        .container {
          width: ${width}px;
        }

        #circleAndText {
          animation: rotateText 6s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        .circleText {
          font-family: 'Monda';
          font-size: 2rem;
          fill: #d5b6e4;
        }

        #exclam {
          animation: fadeExclam 4s linear infinite;
        }

        #fish {
          animation: moveFish 4s linear infinite;
        }

        @keyframes rotateText {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes moveFish {
          0% {
            transform: translateX(-80%);
          }
          50% {
            transform: translateX(80%);
          }
          100% {
            transform: translateX(80%);
          }
        }

        @keyframes fadeExclam {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
