import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { breakPoints } from '../../styles/theme';
import ProductGallery from '../../components/ProductGallery';
import ShopHeader from '../../components/ShopHeader';
import ShopSidebar from '../../components/ShopSidebar';

const CATEGORY_QUERY = gql`
  query ProductCategory($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      name
      products {
        nodes {
          id
          name
          productId
          type
          slug
          productTags {
            nodes {
              name
            }
          }
          image {
            sourceUrl
            title
          }
          ... on VariableProduct {
            id
            price
          }
          ... on ExternalProduct {
            id
            price
          }
          ... on SimpleProduct {
            id
            price
          }
        }
      }
    }
  }
`;

// Get an array of all product tags in this category
const getTags = (products) => {
  return products.reduce((tags, product) => {
    const productTags = product.productTags.nodes;
    productTags.forEach((tag) => {
      if (!tags.includes(tag.name)) {
        tags.push(tag.name);
      }
    });
    return tags;
  }, []);
};

const Category = ({ categorySlug }) => {
  const { loading, error, data } = useQuery(CATEGORY_QUERY, {
    variables: { id: categorySlug },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <h3>Error</h3>;
  }
  const products = data.productCategory.products.nodes;
  const productTags = getTags(products);

  return (
    <React.Fragment>
      <ShopHeader selectedCategory={categorySlug} />

      <div className="shop-main">
        <div className="sidebar-wrapper">
          <ShopSidebar productTags={productTags} />
        </div>

        <section className="product-gallery-wrapper">
          <ProductGallery products={products} />
        </section>
      </div>
      <style jsx>{`
        .shop-main {
          display: flex;
          max-width: 1500px;
          margin: 0 auto;
        }

        .sidebar-wrapper {
          height: 100%;
          width: 20%;
          padding: 6rem 0 6rem 4rem;
        }

        .product-gallery-wrapper {
          padding: 8rem 8rem 6rem 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .shop-main {
            flex-direction: column;
            align-items: center;
          }

          .product-gallery-wrapper {
            padding: 2rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .sidebar-wrapper {
            padding: 4rem 0 0rem 0;
            width: unset;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Category.getInitialProps = async ({ query }) => {
  return { categorySlug: query.category };
};

export default Category;
