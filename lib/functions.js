const getFloatFromPriceString = (priceString) => {
  let floatArray = priceString.match(/[+-]?\d+(\.\d+)?/g);
  const floatValue = parseFloat(floatArray[0]) + 0.01 * parseFloat(floatArray[1]);

  return floatValue ? parseFloat(floatValue.toFixed(2)) : '';
};

export const createNewProduct = (product, qty) => {
  const price = getFloatFromPriceString(product.price);
  return {
    productId: product.productId,
    image: product.image,
    name: product.name,
    price: price,
    qty: qty,
    totalPrice: price,
  };
};

export const addToProductArray = (products, newProduct) => {
  const productIndex = products.findIndex((product) => product.productId === newProduct.productId);
  if (productIndex >= 0) {
    products[productIndex].qty++;
    products[productIndex].totalPrice = parseFloat(
      (products[productIndex].qty * products[productIndex].price).toFixed(2)
    );
  } else {
    products.push(createNewProduct(newProduct, 1));
  }
  return products;
};

// If doAll is true, remove product completely, else just reduce the quantity.
export const removeFromProductArray = (products, rmProduct, doAll) => {
  const productIndex = products.findIndex((product) => product.productId === rmProduct.productId);

  if (productIndex < 0) {
    console.error('Product not found in cart.');
  }

  if (products[productIndex].qty < 2 || doAll) {
    return products.filter((product) => product.productId !== rmProduct.productId);
  } else {
    products[productIndex].qty--;
    products[productIndex].totalPrice = parseFloat(
      (products[productIndex].qty * products[productIndex].price).toFixed(2)
    );
    return products;
  }
};

export const getFormattedCart = (data) => {
  let formattedCart = null;

  if (undefined === data || !data.cart.contents.nodes.length) {
    return formattedCart;
  }

  const givenProducts = data.cart.contents.nodes;

  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProductsCount = 0;

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts[i].product;
    const product = {};
    const total = getFloatFromPriceString(givenProducts[i].total);

    product.productId = givenProduct.productId;
    product.cartKey = givenProducts[i].key;
    product.name = givenProduct.name;
    product.qty = givenProducts[i].quantity;
    product.price = total / product.qty;
    product.totalPrice = givenProducts[i].total;
    product.image = {
      sourceUrl: givenProduct.image.sourceUrl,
      srcSet: givenProduct.image.srcSet,
      title: givenProduct.image.title,
    };

    totalProductsCount += givenProducts[i].quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }

  formattedCart.totalProductsCount = totalProductsCount;
  formattedCart.totalProductsPrice = data.cart.total;

  return formattedCart;
};
