import { useQuery } from '@apollo/react-hooks';

// import client from '../../components/ApolloClient';
import GET_CATEGORY from '../../queries/get-category';
import GET_CATEGORY_PAGINATION from '../../queries/get-category-pagination';
import { breakPoints } from '../../styles/theme';
import ProductGallery from '../../components/ProductGallery';
import ShopHeader from '../../components/ShopHeader';
import ShopSidebar from '../../components/ShopSidebar';
import Button from '../../components/Button';

// // Get an array of all product tags in this category
// const getTags = (products) => {
//   return products.reduce(
//     (tags, product) => {
//       const productTags = product.productTags.nodes;
//       productTags.forEach((tag) => {
//         if (!tags.includes(tag.name)) {
//           tags.push(tag.name);
//         }
//       });
//       return tags;
//     },
//     ['All']
//   );
// };

// Get an array of all product tags in this category
const getTags = (products) => {
  return products.reduce(
    (tags, product) => {
      const productTags = product.node.productTags.nodes;
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

// const Category = ({ products, categoryName }) => {
const Category = ({ query }) => {
  //----- //
  const id = query.category;
  let variables = {
    id,
    first: 50,
  };
  const { data, loading, error, fetchMore } = useQuery(GET_CATEGORY_PAGINATION, { variables });

  if (loading) {
    return <div className="loading-msg">Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const hasMore = () => {
    if (variables.last) {
      return data?.productCategory?.products?.pageInfo?.hasPreviousPage
        ? data.productCategory.products.pageInfo.hasPreviousPage
        : false;
    }
    return data?.productCategory?.products?.pageInfo?.hasNextPage
      ? data.productCategory.products.pageInfo.hasNextPage
      : false;
  };

  const loadMore = () => {
    console.log('fetching more items.');
    console.log(hasMore());
    const cursorVar = variables.last
      ? { before: data.productCategory.products.pageInfo.startCursor }
      : { after: data.productCategory.products.pageInfo.endCursor };
    variables = { ...variables, ...cursorVar };
    console.log(variables);
    return (
      hasMore() &&
      fetchMore({
        variables,
        updateQuery(prev, { fetchMoreResult }) {
          if (fetchMoreResult) {
            const next = {
              ...fetchMoreResult,
              productCategory: {
                ...fetchMoreResult.productCategory,
                products: {
                  ...fetchMoreResult.productCategory.products,
                  edges: [
                    ...prev.productCategory.products.edges,
                    ...fetchMoreResult.productCategory.products.edges,
                  ],
                },
              },
              // edges: uniqBy(
              //   [...prev.products.edges, ...fetchMoreResult.products.edges],
              //   'cursor'
              // ),
            };
            console.log('next:');
            console.log(next);
            return next;
          }
          return prev;
        },
      })
    );
  };

  const products = data.productCategory?.products?.edges ? data.productCategory.products.edges : [];
  const categoryName = data.productCategory?.name ? data.productCategory.name : 'All';
  //----- //

  const productTags = getTags(products);

  return (
    <React.Fragment>
      <ShopHeader selectedCategory={categoryName} />

      <div className="shop-main">
        <div className="sidebar-wrapper">
          <ShopSidebar productTags={productTags} />
        </div>

        <div className="product-gallery-wrapper">
          <ProductGallery products={products} />

          <div className={`load-more-btn-wrap ${hasMore() ? '' : 'hidden'}`}>
            <Button onClick={loadMore}>Load More</Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-msg {
          margin: 4rem;
        }

        .shop-main {
          display: flex;
          width: 100%;
          max-width: 1500px;
          min-height: 500px;
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
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
        }

        .load-more-btn-wrap {
          align-self: center;
          margin: 3rem 0 1rem 0;
        }

        .hidden {
          display: none;
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

// Category.getInitialProps = async function (context) {
//   const id = context.query.category;
//   const client = context.apolloClient;

//   const res = await client.query({
//     query: GET_CATEGORY,
//     variables: { id },
//   });

//   return {
//     categoryName: res.data.productCategory.name,
//     products: res.data.productCategory.products.nodes,
//   };
// };

export default Category;
