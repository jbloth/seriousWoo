import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import xss from 'xss';
// import fetch from 'node-fetch';

import { colors, breakPoints } from '../../../styles/theme';
// import clientConfig from '../../../clientConfig';
import GET_PRODUCT from '../../../queries/get-product';
import ShopHeader from '../../../components/ShopHeader';
import AddToCartButton from '../../../components/AddToCartButton';
import SizeSelector from '../../../components/SizeSelector';
import Loading from '../../../components/Loading';

// Get size variations names and ids from product variations
const getSizesFromVariations = (variations) => {
  if (!variations.nodes) return [];

  const sizes = [];
  variations.nodes.forEach((variationNode) => {
    if (variationNode.attributes) {
      variationNode.attributes.nodes.forEach((atrribNode) => {
        if (atrribNode.name === 'pa_size' || atrribNode.name === 'size') {
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

const Product = ({ categorySlug, productSlug }) => {
  // Have to put this here because hooks cannot be placed below return statement (?)
  const [selectedSize, setSelectedSize] = useState(null);

  // Get product from backend
  const id = parseInt(productSlug.split('-').pop());

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });

  // Set default sizes and default size once we have product data
  let sizes = [];
  useEffect(() => {
    if (data && data.product && data.product.variations) {
      sizes = getSizesFromVariations(variations);
      const defaultSize = sizes.length ? sizes[0].id : null;
      setSelectedSize(defaultSize);
    }
  }, [data]);

  if (loading)
    return (
      <div className="shop-main">
        <Loading width={200} />

        <style jsx>{`
          .shop-main {
            display: flex;
            width: 100%;
            min-height: 300px;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );

  if (error) {
    console.log(error);
    return <h3>Error</h3>;
  }

  // Pull stuff from product
  const { name, price, description, image, variations } = data.product;
  const imgUrl = image.sourceUrl;
  var options = {};
  // const descriptionPure = xss(description, options);

  const descriptionPure = xss(description, {
    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
      if (name === 'class' && value === 'table-responsive dynamic') {
        // escape its value using built-in escapeAttrValue function
        return name + '="' + xss.escapeAttrValue(value) + '"';
      }
    },
  });

  // Pull available sizes from product
  if (variations) sizes = getSizesFromVariations(variations);

  return (
    <React.Fragment>
      <ShopHeader selectedCategory={categorySlug} />
      <section className="section">
        <div className="product">
          <div className="image-container">
            <div
              aria-label="Product Image"
              className="product-image"
              role="img"
              style={{ backgroundImage: `url('${imgUrl}')` }}
            ></div>
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
                  <SizeSelector sizes={sizes} onSelect={(size) => setSelectedSize(size)} />
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
        </div>
      </section>
      <style jsx>
        {`
          .product {
             {
              /* padding: 6rem; */
            }
            display: flex;
            max-width: 1200px;
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
              margin-left: 2rem;
            }
          }

          @media only screen and (max-width: ${breakPoints.bp_smallest}) {
            .buttonArea {
              flex-direction: column;
              align-items: flex-end;
            }

            .size-select-wrapper {
              margin-bottom: 3rem;
            }
          }

          @media only screen and (max-width: ${breakPoints.bp_tiny}) {
            h1 {
              line-height: 1;
            }

            .product {
              padding: 3rem;
            }

            .info-container {
              padding: 3rem;
            }
          }
        `}
      </style>
    </React.Fragment>
  );
};

Product.getInitialProps = async ({ query }) => {
  const categorySlug = query.category;
  const productSlug = query.product;
  return { categorySlug, productSlug };
};

export default Product;
