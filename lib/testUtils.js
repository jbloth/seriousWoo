const fakeProduct = () => ({
  name: 'cool thing',
  price: '16.90€',
  description: 'Cool Thing is cool',
  image: { sourceUrl: '../assets/images/salmon.png' },
  variations: {
    nodes: [
      { attributes: { nodes: [{ name: 'pa_size', id: '001', value: 'M' }] } },
      { attributes: { nodes: [{ name: 'pa_size', id: '002', value: 'L' }] } },
    ],
  },
});

export { fakeProduct };
