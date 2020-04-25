const getFloatFromPriceString = (priceString) => {
  let floatArray = priceString.match(/[+-]?\d+(\.\d+)?/g);
  const floatValue = parseFloat(floatArray[0]) + 0.01 * parseFloat(floatArray[1]);
  console.log('floatValue: ' + floatValue);

  return floatValue ? parseFloat(floatValue.toFixed(2)) : '';
};

// export const addFirstProduct = (product) => {
//   let price = getFloatFromPriceString(product.price);

//   let newCart = {
//     products: [],
//     totalProductsCount: 1,
//     totalProductsPrice: price,
//   };

//   const newProduct = createNewProduct(product, price, 1);
//   newCart.products.push(newProduct);

//   localStorage.setItem('seriousCart', JSON.stringify(newCart));

//   return newCart;
// };

// export const addProductToCart = (product, prevCartData) => {
//   const productsCount = prevCartData.totalProductsCount;
//   const updatedProducts = addToProductArray(prevCartData.products, product);
//   const newTotal = updatedProducts.reduce((total, item) => total + item.totalPrice, 0);
//   const newCartData = {
//     ...prevCartData,
//     products: updatedProducts,
//     totalProductsCount: productsCount + 1,
//     totalProductsPrice: parseFloat(newTotal.toFixed(2)),
//   };

//   localStorage.setItem('seriousCart', JSON.stringify(newCartData));
//   return newCartData;
// };

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
