// import client from '../../components/ApolloClient';
import GET_CATEGORY from '../../queries/get-category';
import { breakPoints } from '../../styles/theme';
import ProductGallery from '../../components/ProductGallery';
import ShopHeader from '../../components/ShopHeader';
import ShopSidebar from '../../components/ShopSidebar';

// Get an array of all product tags in this category
const getTags = (products) => {
  return products.reduce(
    (tags, product) => {
      const productTags = product.productTags.nodes;
      productTags.forEach((tag) => {
        if (!tags.includes(tag.name)) {
          tags.push(tag.name);
        }
      });
      return tags;
    },
    ['All']
  );
};

const Category = ({ products, categoryName }) => {
  const productTags = getTags(products);

  return (
    <React.Fragment>
      <ShopHeader selectedCategory={categoryName} />

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

          .sidebar-wrapper {
            padding: 5rem 0 0rem 0;
            width: unset;
          }
          .product-gallery-wrapper {
            padding: 2rem;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Category.getInitialProps = async function (context) {
  const id = context.query.category;
  const client = context.apolloClient;

  const res = await client.query({
    query: GET_CATEGORY,
    variables: { id },
  });

  return {
    categoryName: res.data.productCategory.name,
    products: res.data.productCategory.products.nodes,
  };
};

export default Category;
