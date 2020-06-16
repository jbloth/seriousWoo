import ConnectAreaItem from '../components/ConnectAreaItem';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJSON from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const itemTitle = 'Title';

describe('<ConnectAreaItem/>', () => {
  it('renders', () => {
    shallow(<ConnectAreaItem title={itemTitle}>Child</ConnectAreaItem>);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ConnectAreaItem title={itemTitle}>Child</ConnectAreaItem>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('updates when props changes', () => {
    const wrapper = shallow(<ConnectAreaItem title={itemTitle}>Child</ConnectAreaItem>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ title: 'new title' });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
