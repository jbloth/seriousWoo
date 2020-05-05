import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import xss from 'xss';

import { colors, breakPoints } from '../../../styles/theme';
import GET_PRODUCT from '../../../queries/get-product';
import ShopHeader from '../../../components/ShopHeader';
import AddToCartButton from '../../../components/AddToCartButton';
import SizeSelector from '../../../components/SizeSelector';

// Get size variations names and ids from product variations
const getSizesFromVariations = (variations) => {
  if (!variations.nodes) return [];

  const sizes = [];
  variations.nodes.forEach((variationNode) => {
    if (variationNode.attributes) {
      variationNode.attributes.nodes.forEach((atrribNode) => {
        if (atrribNode.name === 'pa_size') {
          sizes.push({
            name: atrribNode.value,
            id: variationNode.variationId,
          });
        }
      });
    }
  });

  return sizes;
};

const Product = ({ productSlug, categorySlug }) => {
  // Get product from backend
  const id = parseInt(productSlug.split('-').pop());
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <h3>Error</h3>;
  }

  // Pull stuff from product
  const { name, price, description, image, variations } = data.product;
  const imgUrl = image.sourceUrl;
  const descriptionPure = xss(description);

  // Pull available sizes from product
  let sizes = [];
  if (variations) sizes = getSizesFromVariations(variations);

  const defaultSize = sizes.length ? sizes[0].id : null;
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const setSize = (size) => setSelectedSize(size); // will be handed down to SizeSelector

  return (
    <React.Fragment>
      <ShopHeader selectedCategory={categorySlug} />
      <div className="product">
        <div className="image-container">
          <div className="product-image" style={{ backgroundImage: `url('${imgUrl}')` }}></div>
        </div>
        <div className="info-container">
          <h1>{name}</h1>
          <h3 className="price">{price}</h3>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: descriptionPure,
            }}
          />
          <div className="buttonArea">
            {sizes.length ? (
              <div className="size-select-wrapper">
                <label className="selector-label">Size: </label>
                <SizeSelector sizes={sizes} onSelect={(size) => setSize(size)} />
              </div>
            ) : (
              <span className="oneSize-msg">One Size</span>
            )}
            <div className="button-wrapper">
              <AddToCartButton product={data.product} selectedVariation={selectedSize}>
                ADD TO CART
              </AddToCartButton>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .product {
              padding: 6rem;
              display: flex;
            }

            .image-container {
              width: 50%;
              display: flex;
              justify-content: center;
            }

            .product-image {
              width: 340px;
              height: 400px;
              background-size: cover;
              background-position: center;
            }

            .info-container {
              width: 50%;
              padding: 4rem;
              color: ${colors.textblue};
            }

            pre {
              white-space: pre-wrap; /* Since CSS 2.1 */
              white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
              white-space: -pre-wrap; /* Opera 4-6 */
              white-space: -o-pre-wrap; /* Opera 7 */
              word-wrap: break-word; /* Internet Explorer 5.5+ */
            }

            .buttonArea {
              display: flex;
              margin-top: 2rem;
            }

            .size-select-wrapper {
              display: flex;
              align-items: center;
            }

            .selector-label {
              margin-right: 1rem;
              color: ${colors.orange};
            }

            .oneSize-msg {
              color: ${colors.orange};
            }

            .button-wrapper {
              margin-left: 2rem;
            }

            @media only screen and (max-width: ${breakPoints.bp_md}) {
              .product {
                flex-direction: column;
              }

              .image-container {
                width: 100%;
              }

              .info-container {
                width: 100%;
                padding: 4rem;
              }

              .button-wrapper {
                margin-left: 4rem;
              }
            }
          `}
        </style>
      </div>
    </React.Fragment>
  );
};

Product.getInitialProps = async ({ query }) => {
  return {
    productSlug: query.product,
    categorySlug: query.category,
  };
};

export default Product;
