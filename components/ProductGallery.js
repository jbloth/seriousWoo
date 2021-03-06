import { useContext } from 'react';

import { AppContext } from '../components/context/AppContext';
import ProductPrev from './ProductPrev';
import { colors } from '../styles/theme';

const productHasTag = (productTags, selectedTag) => {
  const result = productTags.filter((tag) => tag.name === selectedTag);
  return result.length > 0;
};

const ProductGallery = ({ products, isIndex }) => {
  const { selectedTag } = useContext(AppContext);

  return (
    <div className="productGallery">
      {products.length ? (
        products.map((product) => {
          if (product.node) {
            product = product.node;
          }
          if (
            isIndex ||
            !selectedTag ||
            selectedTag === 'All' ||
            productHasTag(product.productTags.nodes, selectedTag)
          ) {
            return <ProductPrev key={product.productId} product={product} />;
          }
        })
      ) : (
        <span className="productGallery__empty-message">No products in this category</span>
      )}
      <style jsx>
        {`
          .productGallery {
             {
              /* margin-top: 2rem; */
            }
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }

          .productGallery__empty-message {
            color: rgb(${colors.textblue});
          }
        `}
      </style>
    </div>
  );
};

export default ProductGallery;
