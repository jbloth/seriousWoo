import { useState } from 'react';
import Link from 'next/link';

import { colors, fonts } from '../styles/theme';

const MobileMenuShopCategories = ({ title, toggleMenuOpen, items }) => {
  const [open, setOpen] = useState(false);
  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <div className="nav-link">
      <h1 className="title" onClick={toggleCollapse}>
        {title}
        <span>{open ? ' - ' : ' + '}</span>
      </h1>
      <div className={`sub-menu ${open ? 'sub-menu--active' : ''}`}>
        {items.map(({ id, name, slug }) => {
          if (slug === 'uncategorized') return ''; // Exclude "uncategorized" category
          return (
            <Link href={'/shop/[category]'} as={`/shop/${slug}`} key={id}>
              <a className="item" onClick={toggleMenuOpen}>
                {name}
              </a>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .title {
          font-family: ${fonts.text};
          font-size: 4.2rem;
        }

        .sub-menu {
          display: none;
          border-top: 1px solid rgb(${colors.darkpink});
          margin-bottom: 2rem;
        }

        .item {
          color: rgb(${colors.darkpink});
          line-height: 2.8;
        }

        .sub-menu--active {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default MobileMenuShopCategories;
