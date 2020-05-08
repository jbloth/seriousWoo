const BgShape = ({ version, fillColor, extraClass }) => {
  switch (version) {
    case 1:
      return (
        <>
          <svg
            className={`bg-shape ${extraClass}`}
            width="665"
            height="523"
            viewBox="0 0 665 523"
            fill={fillColor ? `rgb(${fillColor})` : 'none'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="1"
              d="M73.4545 273.427C73.1576 160.126 -11.1813 40.5199 175.493 39.6881C269.845 39.2678 414.678 42.9524 576.626 110.419C738.574 177.885 582.231 268.354 555.708 418.778C530.501 561.733 317.242 464.146 222.002 431.332C93.9409 387.209 73.5916 325.766 73.4545 273.427Z"
            />
          </svg>
          <style jsx>{`
            .bg-shape {
              position: absolute;
            }
          `}</style>
        </>
      );
    case 2:
      return (
        <>
          <svg
            className={`bg-shape ${extraClass}`}
            width="741"
            height="741"
            viewBox="0 0 741 741"
            fill={fillColor ? `rgb(${fillColor})` : 'none'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="1"
              d="M233.159 553.413C140.179 488.67 -6.17167 489.153 100.219 335.761C153.993 258.231 126.493 229.15 274.648 135.187C422.803 41.2234 520.827 133.738 628.833 241.744C731.477 344.388 616.155 494.218 534.648 553.413C425.053 633.007 276.112 583.321 233.159 553.413Z"
            />
          </svg>
          <style jsx>{`
            .bg-shape {
              position: absolute;
            }
          `}</style>
        </>
      );
    case 3:
      return (
        <>
          <svg
            className={`bg-shape ${extraClass}`}
            width="740"
            height="762"
            viewBox="0 0 540 562"
            fill={fillColor ? `rgb(${fillColor})` : 'none'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="1"
              d="M303.647 60.5201C382.528 76.5293 516.732 181.568 470.147 304.02C446.601 365.912 342.21 366.48 256.675 455.083C171.14 543.687 150.754 417.922 57.9154 361.664C-30.3134 308.199 122.385 256.401 168.147 202.52C229.678 130.071 168.147 33.0201 303.647 60.5201Z"
            />
          </svg>
          <style jsx>{`
            .bg-shape {
              position: absolute;
            }
          `}</style>
        </>
      );
    default:
      return '';
  }
};

export default BgShape;
