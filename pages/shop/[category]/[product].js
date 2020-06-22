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

/*
const GET_NEWEST_PRODUCTS = `
  query newestProducts($number: Int) {
    products(first: $number) {
      nodes {
        id
        name
        productId
        slug
        image {
          id
          sourceUrl
        }
        ... on VariableProduct {
          id
          name
          price
        }
      }
    }
  }
`;
*/

/*
const GET_PRODUCT = `query Product($id: ID!) {
  product(id: $id, idType: DATABASE_ID) {
    id
    name
    slug
    description
    productId
    type
    ... on VariableProduct {
      id
      price
      name
      variations {
        nodes {
          id
          variationId
          name
          attributes {
            nodes {
              attributeId
              id
              name
              value
            }
          }
        }
      }
    }
    ... on SimpleProduct {
      id
      price
    }
    ... on ExternalProduct {
      id
      price
    }
    image {
      id
      sourceUrl
      title
      srcSet
      uri
    }
  }
}`;
*/

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
  // Have to put this here because hook cannot be placed below return statement (?)
  const [selectedSize, setSelectedSize] = useState(null);
  // const setSize = (size) => setSelectedSize(size); // will be handed down to SizeSelector

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

  if (loading) return <p>Loading...</p>;
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

  // const Product = ({ product, categorySlug }) => {
  //   // Pull stuff from product
  //   const { name, price, description, image, variations } = product;
  //   const imgUrl = image.sourceUrl;
  //   const sizes = getSizesFromVariations(variations);
  //   const defaultSize = sizes.length ? sizes[0].id : null;

  //   // Have to put this here because hook cannot be placed below return statement (?)
  //   const [selectedSize, setSelectedSize] = useState(defaultSize);

  //   var options = {};
  //   const descriptionPure = xss(description, {
  //     onIgnoreTagAttr: function (tag, name, value) {
  //       if (name === 'class' && value === 'table-responsive dynamic') {
  //         // escape its value using built-in escapeAttrValue function
  //         return name + '="' + xss.escapeAttrValue(value) + '"';
  //       }
  //     },
  //   });

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

              .buttonArea {
                flex-direction: column;
                align-items: flex-end;
              }

              .size-select-wrapper {
                margin-bottom: 3rem;
              }
            }
          `}
        </style>
      </div>
    </React.Fragment>
  );
};

Product.getInitialProps = async ({ query }) => {
  const categorySlug = query.category;
  const productSlug = query.product;
  return { categorySlug, productSlug };
};

// export async function getStaticPaths() {
//   const headers = { 'Content-Type': 'application/json' };
//   const res = await fetch(clientConfig.graphqlUrl, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({
//       query: GET_NEWEST_PRODUCTS,
//       variables: { number: 2 },
//     }),
//   });

//   const json = await res.json();
//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error('Failed to fetch API');
//   }

//   let paths = [];
//   if (json.data?.products?.nodes && json.data.products.nodes.length) {
//     paths = json.data.products.nodes.map((node) => {
//       const productSlug = `${node.slug}-${node.productId}`;
//       return `/shop/all/${productSlug}`;
//     });
//   }

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   console.log('getStaticProps');
//   console.log(params);
//   const id = parseInt(params.product.split('-').pop());

//   const headers = { 'Content-Type': 'application/json' };
//   const res = await fetch(clientConfig.graphqlUrl, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({
//       query: GET_PRODUCT,
//       variables: { id },
//     }),
//   });

//   const json = await res.json();
//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error('Failed to fetch API');
//   }

//   return {
//     props: {
//       product: json.data.product,
//       categorySlug: params.category,
//       productSlug: params.product,
//     },
//   };
// }

export default Product;
