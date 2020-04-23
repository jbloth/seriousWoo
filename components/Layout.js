import Meta from './Meta';

import Header from './Header';

import globalStyles from '../styles/global.js';
import { AppProvider } from './context/AppContext';

const Layout = (props) => {
  return (
    <AppProvider>
      <div>
        <Meta />
        <Header />
        {props.children}
        <style jsx global>
          {globalStyles}
        </style>
      </div>
    </AppProvider>
  );
};

export default Layout;
