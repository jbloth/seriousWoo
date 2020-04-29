import Link from 'next/link';
import { useRouter } from 'next/router';

import { colors, breakPoints } from '../styles/theme';
import AddToCartButton from './AddToCartButton';

const ProductPrev = ({ product }) => {
  const router = useRouter();
  const categorySlug = router.query.category;

  const { name, price, image, slug, productId } = product;
  const imgUrl = image.sourceUrl;

  return (
    <div className="productPrev">
      <Link as={`/shop/${categorySlug}/${slug}-${productId}`} href={'/[shop]/[category]/[product]'}>
        <a>
          <div className="product-img" style={{ backgroundImage: `url('${imgUrl}')` }}></div>
        </a>
      </Link>
      <div className="info">
        <span className="title">{name}</span>
        <span className="price">{price} €</span>
      </div>
      <style jsx>
        {`
          .productPrev {
            margin: 1rem;
          }

          .productPrev:hover {
            cursor: pointer;
          }

          .product-img {
            height: 26rem;
            width: 22rem;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @media only screen and (max-width: ${breakPoints.bp_small}) {
            .product-img {
              height: 40rem;
              width: 36rem;
            }
          }

          .product-img:hover {
            border: 4px solid ${colors.orange};
          }

          .product-img:hover .button-wrapper {
            display: flex;
          }

          .button-wrapper {
            background-color: rgba(${colors.orange};, 0.8);
            font-size: 1.4rem;
            display: none;
          }

          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            margin: 1rem 0;

            font-size: 1.6rem;
            color: ${colors.orange};
          }

          .title {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default ProductPrev;
