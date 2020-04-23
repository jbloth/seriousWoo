export const getFloatFromPriceString = (priceString) => {
  let floatValue = priceString.match(/[+-]?\d+(\.\d+)?/g)[0];
  return floatValue ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
};

export const addFirstProduct = (product) => {
  let price = getFloatFromPriceString(product.price);

  let newCart = {
    products: [],
    totalProductsCount: 1,
    totalProductsPrice: price,
  };

  const newProduct = createNewProduct(product, price, 1);
  newCart.products.push(newProduct);

  localStorage.setItem('seriousCart', JSON.stringify(newCart));

  return newCart;
};

export const createNewProduct = (product, price, qty) => {
  return {
    productId: product.productId,
    image: product.image,
    name: product.name,
    price: price,
    qty: qty,
    totalPrice: parseFloat((price * qty).toFixed(2)),
  };
};
