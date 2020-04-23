import Layout from '../components/Layout';
import clientConfig from '../clientConfig';
import fetch from 'isomorphic-unfetch';
import ProductGallery from '../components/ProductGallery';

const Index = (props) => {
  const { products } = props;
  return (
    <Layout>
      {/* {products.length
        ? products.map((product) => <ProductPrev key={product.id} product={product} />)
        : ''} */}
      <ProductGallery products={products} />
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch(`${clientConfig.siteUrl}/getProducts`);
  const productsData = await res.json();
  return { products: productsData };
};

export default Index;
