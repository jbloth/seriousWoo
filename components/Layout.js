import Meta from './Meta'; // HTML head
import Header from './Header'; // page header
import Footer from './Footer'; // page footer

import globalStyles from '../styles/global.js';

const Layout = (props) => {
  return (
    <div className="site-container">
      <Meta />
      <Header authToken={props.authToken} />
      {props.children}
      <Footer />
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export default Layout;
