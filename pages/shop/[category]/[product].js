import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ShopHeader from '../../../components/ShopHeader';

const PRODUCT_QUERY = gql`
  query Product($id: ID!) {
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
        sourceUrl
        title
        srcSet
        uri
      }
    }
  }
`;

const Product = ({ productSlug, categorySlug }) => {
  const id = parseInt(productSlug.split('-').pop());
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <h3>Error</h3>;
  }

  const { name, price, description, image } = data.product;
  const imgUrl = image.sourceUrl;

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
          <div className="description">{description}</div>
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
