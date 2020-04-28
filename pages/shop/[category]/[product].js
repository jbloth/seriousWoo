import { useQuery } from '@apollo/react-hooks';
import xss from 'xss';

import GET_PRODUCT from '../../../queries/get-product';
import ShopHeader from '../../../components/ShopHeader';

const Product = ({ productSlug, categorySlug }) => {
  const id = parseInt(productSlug.split('-').pop());
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <h3>Error</h3>;
  }

  const { name, price, description, image } = data.product;
  const imgUrl = image.sourceUrl;

  const descriptionPure = xss(description);

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
