import { MockedProvider } from '@apollo/react-testing';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';

import GET_PRODUCT from '../queries/get-product';
import Product from '../pages/shop/[category]/[product]';
import { fakeProduct } from '../lib/testUtils';

configure({ adapter: new Adapter() });

const product = fakeProduct();

const mocks = [
  {
    request: { query: GET_PRODUCT, variables: { id: '27' } },
    result: {
      data: {
        product: product,
      },
    },
  },
];

describe('Product page', () => {
  it('renders correctly', () => {
    act(() => {
      // const { container } = render(
      render(
        <MockedProvider mocks={mocks}>
          <Product productSlug="tote-27" categorySlug="accessories" />
        </MockedProvider>
      );
    });
  });
});
