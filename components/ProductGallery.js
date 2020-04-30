import { useContext } from 'react';

import { AppContext } from '../components/context/AppContext';
import ProductPrev from './ProductPrev';
import { colors } from '../styles/theme';

const productHasTag = (productTags, selectedTag) => {
  const result = productTags.filter((tag) => tag.name === selectedTag);
  return result.length > 0;
};

const ProductGallery = ({ products }) => {
  const { selectedTag } = useContext(AppContext);

  return (
    <div className="productGallery">
      {products.length ? (
        products.map((product) => {
          if (!selectedTag || productHasTag(product.productTags.nodes, selectedTag)) {
            return <ProductPrev key={product.productId} product={product} />;
          }
        })
      ) : (
        <span className="productGallery__empty-message">No products in this category</span>
      )}
      <style jsx>
        {`
          .productGallery {
            margin-top: 2rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }

          .productGallery__empty-message {
            color: ${colors.text_Blue};
          }
        `}
      </style>
    </div>
  );
};

export default ProductGallery;
