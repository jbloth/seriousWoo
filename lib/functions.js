import countryList from '../assets/countryList';

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

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

// Get the size of a product in the cart
const getSizeFromVariationInCart = (node) => {
  try {
    const attributes = node.variation.attributes.nodes;
    const sizeNode = attributes.find(
      (attribute) => attribute.name === 'pa_size' || attribute.name === 'size'
    );

    if (sizeNode) {
      return { id: node.variation.variationId, name: sizeNode.value };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getFormattedCart = (data) => {
  let formattedCart = null;

  if (undefined === data || !data.cart.contents.nodes.length) {
    return formattedCart;
  }

  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProductsCount = 0;

  const givenProducts = data.cart.contents.nodes;

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts[i].product;
    const product = {};

    product.productId = givenProduct.productId;
    product.cartKey = givenProducts[i].key;
    product.name = givenProduct.name;
    product.qty = givenProducts[i].quantity;
    product.price = givenProduct.price;
    product.subtotal = givenProducts[i].subtotal;
    product.totalPrice = givenProducts[i].total;
    product.image = {
      sourceUrl: givenProduct.image.sourceUrl,
      srcSet: givenProduct.image.srcSet,
      title: givenProduct.image.title,
    };

    // Look for a size attribute in the query response. Variations are stored
    // on the same e level as the product, so we take givenProducts[i] as a
    // starting point.
    product.size = getSizeFromVariationInCart(givenProducts[i]);

    totalProductsCount += givenProducts[i].quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }

  formattedCart.totalProductsCount = totalProductsCount;
  formattedCart.subtotal = data.cart.subtotal;
  formattedCart.shippingTotal = data.cart.shippingTotal;
  formattedCart.total = data.cart.total;
  formattedCart.availableShippingMethods = data.cart.availableShippingMethods;
  formattedCart.chosenShippingMethod = data.cart.chosenShippingMethod;
  return formattedCart;
};

/* Takes the cart's products array, updates one product's quantity and 
 returns the updated array. This is needed for the updateItemQuantities
 mutation */
export const getUpdatedItems = (products, newQty, cartKey) => {
  const updatedItems = [];

  products.map((cartItem) => {
    if (cartItem.cartKey === cartKey) {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: parseInt(newQty),
      });
    } else {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: cartItem.qty,
      });
    }
  });
  return updatedItems;
};

// Re-structures the state of the CheckoutForm component into something
// the checkout-mutation can use.
export const createCheckoutMutationInput = (billingAddress, orderSettings, shippingAddress) => {
  const shippingAddr =
    shippingAddress && orderSettings.shipToDifferentAddress ? shippingAddress : billingAddress;

  const checkoutMutationInput = {
    clientMutationId: 'blob',

    billing: {
      firstName: billingAddress.firstName,
      lastName: billingAddress.lastName,
      address1: billingAddress.address1,
      address2: billingAddress.address2,
      city: billingAddress.city,
      country: billingAddress.country,
      state: billingAddress.state,
      postcode: billingAddress.postcode,
      email: billingAddress.email,
      phone: billingAddress.phone,
    },
    shipping: {
      firstName: shippingAddr.firstName,
      lastName: shippingAddr.lastName,
      address1: shippingAddr.address1,
      address2: shippingAddr.address2,
      city: shippingAddr.city,
      country: shippingAddr.country,
      state: shippingAddr.state,
      postcode: shippingAddr.postcode,
    },
    customerNote: billingAddress.orderNotes,
    shipToDifferentAddress: orderSettings.shipToDifferentAddress,
    shippingMethod: orderSettings.shippingMethod,
    paymentMethod: orderSettings.paymentMethod,
    isPaid: false,
    transactionId: 'hjkhjkhsdsdiui',
  };

  return checkoutMutationInput;
};

export const countryCodeToName = (countryCode) => {
  const country = countryList.find((country) => country.code === countryCode);
  return country ? country.name : '';
};
