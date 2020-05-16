import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import GET_CATEGORY_KEYS from '../queries/get-category-keys';
import { colors, breakPoints } from '../styles/theme';

const ShopHeader = ({ selectedCategory }) => {
  const { loading, error, data } = useQuery(GET_CATEGORY_KEYS);

  if (loading) return <div className="shopHeader">... </div>;
  if (error) {
    console.log(error);
    return <h3>Error</h3>;
  }

  const mainCategories = data.productCategories.nodes;

  return (
    <div className="shopHeader">
      <nav>
        {mainCategories.map(({ id, name, slug }) => {
          if (slug === 'uncategorized') return ''; // Exclude "uncategorized" category
          return (
            <Link as={`/shop/${slug}`} href={'/[shop]/[category]'} key={id}>
              <a
                className={`item ${slug === selectedCategory.toLowerCase() ? 'item--active' : ''}`}
              >
                {name}
              </a>
            </Link>
          );
        })}
      </nav>
      <style jsx>
        {`
          .shopHeader {
            width: 100%;
            min-height: 5rem;
            background-color: rgb(${colors.lightyellow});
            font-size: 1.8rem;
            font-weight: normal;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          nav {
            width: 60%;
            max-width: 900px;

            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .item {
            cursor: pointer;
            color: rgb(${colors.orange});
            padding: 1rem;
          }

          .item--active {
            color: rgb(${colors.vibrantblue});
          }

          @media only screen and (max-width: ${breakPoints.bp_md}) {
            nav {
              width: 80%;
            }
          }

          @media only screen and (max-width: ${breakPoints.bp_small}) {
            nav {
              width: 90%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShopHeader;
