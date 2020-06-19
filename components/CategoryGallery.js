import Link from 'next/link';

import { colors, fonts, breakPoints } from '../styles/theme';

const CategoryGallery = () => {
  const categories = [
    {
      title: 'KIDS',
      imgUrl: '/images/sharon-garcia-QxLY0sKCDmo-unsplash 1.png',
      id: 1,
      linkUrl: 'shop/kids',
      photographerUrl: 'https://unsplash.com/photos/QxLY0sKCDmo',
      photographerName: 'Sharon Garcia',
    },
    {
      title: 'WOMENS',
      imgUrl: '/images/sule-makaroglu-iz7PNf7Daoc-unsplash 1.png',
      id: 2,
      linkUrl: 'shop/womens',
      photographerUrl: 'https://unsplash.com/@sulemakaroglu',
      photographerName: 'ŞULE MAKAROĞLU',
    },
    {
      title: 'MENS',
      imgUrl: '/images/dylan-sauerwein-5oog6pFHD_s-unsplash 1.png',
      id: 3,
      linkUrl: 'shop/mens',
      photographerUrl: 'https://unsplash.com/@rawdyl',
      photographerName: 'Dylan Sauerwein',
    },
  ];

  return (
    <div className="categoryGallery l-wrapper">
      {categories.map((category) => (
        <Link key={category.id} href={`/${category.linkUrl}`}>
          <a className="catImg-container">
            <div
              style={{
                backgroundImage: `url('${category.imgUrl}')`,
              }}
              className="catImg"
            >
              <p className="catImg__overlay">{category.title}</p>
            </div>
            <div className="photo-credit">
              Photo from <a href={category.photographerUrl}>{category.photographerName}</a> on
              <a href="https://unsplash.com/"> Unsplash</a>
            </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .categoryGallery {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 1000px;
        }

        .catImg {
          z-index: 10;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          width: 100%;
          height: 100%;

          background-size: cover;
          background-position: center;

          font-family: ${fonts.heading};
          font-size: 6rem;
          color: rgb(${colors.bg});
        }

        .catImg-container {
          min-width: 250px;
          width: 32%;
          margin: 0 2rem;
          height: 400px;
        }

        .catImg:hover {
          cursor: pointer;
          color: rgb(${colors.violet});
        }

        .photo-credit {
          align-self: flex-end;
          color: rgb(${colors.textblue});
          font-size: 1.2rem;
          text-align: right;
        }

        .photo-credit a {
          color: rgb(${colors.orange});
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .categoryGallery {
            flex-direction: column;
          }

          .catImg-container {
            width: 100%;
            height: 600px;
            margin: 2rem 0;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .categoryGallery {
            flex-direction: column;
          }

          .catImg-container {
            height: 500px;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .catImg-container {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryGallery;
