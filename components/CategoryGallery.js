import Link from 'next/link';

import { colors, fonts, breakPoints } from '../styles/theme';

const CategoryGallery = () => {
  const categories = [
    {
      title: 'KIDS',
      imgUrl: '/images/sharon-garcia-QxLY0sKCDmo-unsplash 1.png',
      id: 1,
      linkUrl: '/shop/kids',
      photographerUrl: 'https://unsplash.com/photos/QxLY0sKCDmo',
      photographerName: 'Sharon Garcia',
    },
    {
      title: 'WOMENS',
      imgUrl: '/images/sule-makaroglu-iz7PNf7Daoc-unsplash 1.png',
      id: 2,
      linkUrl: '/shop/womens',
      photographerUrl: 'https://unsplash.com/@sulemakaroglu',
      photographerName: 'ŞULE MAKAROĞLU',
    },
    {
      title: 'MENS',
      imgUrl: '/images/dylan-sauerwein-5oog6pFHD_s-unsplash 1.png',
      id: 3,
      linkUrl: '/shop/mens',
      photographerUrl: 'https://unsplash.com/@rawdyl',
      photographerName: 'Dylan Sauerwein',
    },
  ];

  return (
    <div className="categoryGallery l-wrapper">
      {categories.map((category, idx) => (
        <div key={idx} className="category-container">
          <Link href="/shop/[category]" as={category.linkUrl}>
            <a>
              <div
                style={{
                  backgroundImage: `url('${category.imgUrl}')`,
                }}
                className="catImg"
              >
                <p className="catImg__overlay">{category.title}</p>
              </div>
            </a>
          </Link>
          <div className="photo-credit">
            Photo from <a href={category.photographerUrl}>{category.photographerName}</a> on
            <a href="https://unsplash.com/"> Unsplash</a>
          </div>
        </div>
      ))}

      <style jsx>{`
        .categoryGallery {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 1000px;
        }

        .category-container {
          min-width: 250px;
          width: 32%;
          height: 400px;
          margin: 0 2rem;
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

          .category-container {
            width: 100%;
            height: 600px;
            margin: 2rem 0;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .categoryGallery {
            flex-direction: column;
          }

          .category-container {
            height: 500px;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .category-container {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryGallery;
