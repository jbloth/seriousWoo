import Link from 'next/link';
import { useRouter } from 'next/router';

import { colors, breakPoints } from '../styles/theme';

const ProductPrev = ({ product, category, className }) => {
  const router = useRouter();
  const categorySlug = category ? category : router.query.category;
  const extraClass = className ? className : '';

  const { name, price, image, slug, productId } = product;
  const imgUrl = image.sourceUrl;

  return (
    <div className={`productPrev ${extraClass}`}>
      <Link href={'/shop/[category]/[product]'} as={`/shop/${categorySlug}/${slug}-${productId}`}>
        <a aria-label="go to product">
          <div
            className="product-img"
            style={{ backgroundImage: `url('${imgUrl}')` }}
            aria-label="product image"
          ></div>
        </a>
      </Link>
      <div className="info">
        <span className="title">{name}</span>
        <span className="price">{price} €</span>
      </div>
      <style jsx>
        {`
          .productPrev {
            margin: 2rem;
            max-width: 22rem;
          }

          .productPrev--borders {
            border: 1px solid rgb(${colors.orange});
          }

          .productPrev:hover {
            cursor: pointer;
            background-color: rgb(${colors.lightyellow});
          }

          .product-img {
            height: 22rem;
            width: 22rem;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .product-img:hover {
          }

          .productPrev--borders .product-img {
            border-bottom: 1px solid rgb(${colors.orange});
          }

          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            height: 8rem;
            margin: 1rem 0;

            font-size: 1.6rem;
            color: rgb(${colors.orange});
          }

          .productPrev--borders .info {
            padding: 0 1rem;
          }

          .title {
            font-weight: bold;
            text-align: center;
          }

          @media only screen and (max-width: ${breakPoints.bp_small}) {
            .productPrev {
              max-width: unset;
            }

            .product-img {
              height: 40rem;
              width: 36rem;
            }
          }

          @media only screen and (max-width: ${breakPoints.bp_smallest}) {
            .product-img {
              height: 36rem;
              width: 30rem;
            }
          }

          @media only screen and (max-width: ${breakPoints.bp_tiny}) {
            .product-img {
              height: 30rem;
              width: 26rem;
            }
          }

          @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
            .product-img {
              height: 26rem;
              width: 22rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductPrev;
