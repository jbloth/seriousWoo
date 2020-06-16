import CheckoutCartItem from '../components/CheckoutCartItem';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJSON from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const fakeProduct = {
  image: { sourceUrl: '/images/salmon.png' },
  name: 'Nice Shirt',
  price: '16.90€',
  qty: 2,
  totalPrice: '33.80€',
  size: { name: 'M' },
};

describe('<CheckoutCartItem/>', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<CheckoutCartItem product={fakeProduct} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<CheckoutCartItem product={fakeProduct} />);
    const img = wrapper.find('.img');
    const name = wrapper.find('.name');
    const size = wrapper.find('.size');
    const priceInfo = wrapper.find('.price-info');
    const price = wrapper.find('.price--single');
    const qty = wrapper.find('.quantity');
    const total = wrapper.find('.price--total');
    expect(img.props().style.backgroundImage).toBe(`url('${fakeProduct.image.sourceUrl}')`);
    expect(name.text()).toBe(fakeProduct.name);
    expect(size.text()).toBe(fakeProduct.size.name);
    expect(priceInfo.children()).toHaveLength(3);
    expect(price.text()).toBe(fakeProduct.price);
    expect(qty.text()).toBe(`qty: ${fakeProduct.qty}`);
    expect(total.text()).toBe(fakeProduct.totalPrice);
  });
});
