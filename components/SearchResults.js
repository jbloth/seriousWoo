import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import PRODUCT_SEARCH_QUERY from '../queries/product-search';
import { colors, breakPoints } from '../styles/theme';
import ProductPrev from './ProductPrev';

const SearchResults = ({ searchTerm }) => {
  const { toggleSearchOpen } = useContext(AppContext);

  // search for products
  const { loading, error, data, refetch } = useQuery(PRODUCT_SEARCH_QUERY, {
    variables: { searchQuery: searchTerm },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data.products.nodes.length) return <p>No matching products found.</p>;

  return (
    <div>
      <h2 className="results-header">Products</h2>
      <div className="products">
        {data.products.nodes.map((node, idx) => {
          const { id, productCategories } = node;
          const category = productCategories.nodes[0].slug;

          return (
            <div className="product-prev-wrap" onClick={toggleSearchOpen} key={idx}>
              <ProductPrev
                key={id}
                className="productPrev--borders"
                product={node}
                category={category}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .results-header {
          font-size: 4rem;
          color: rgb(${colors.orange});
        }

        .products {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          background-color: rgba(${colors.bg}, 0.9);
          padding: 4rem;
        }

        .product-prev-wrap {
          margin: 1rem;
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
        }
      `}</style>
    </div>
  );
};

export default SearchResults;
