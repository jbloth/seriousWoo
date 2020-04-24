import Meta from './Meta'; // HTML head
import Header from './Header'; // page header

import globalStyles from '../styles/global.js';

const Layout = (props) => {
  return (
    <div>
      <Meta />
      <Header />
      {props.children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export default Layout;
