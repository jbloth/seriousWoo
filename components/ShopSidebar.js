import { useState, useContext } from 'react';

import { AppContext } from '../components/context/AppContext';
import { colors, breakPoints } from '../styles/theme';
import ArrowIcon from './ArrowIcon';

const ShopSidebar = ({ productTags }) => {
  const [open, setOpen] = useState(false);
  const { selectedTag, setSelectedTag } = useContext(AppContext);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <nav className="shopSidebar">
      <div className="title-container collapseTrigger" onClick={(e) => toggleCollapse(e)}>
        <div className="arrow-wrapper">
          <ArrowIcon color={colors.darkpink} width={24} open={open} />
        </div>
        <h1 className="selected-tag">{selectedTag ? selectedTag : 'All'}</h1>
      </div>

      <ul className={`categoryList collapsible ${open ? '' : 'hideOnMobile'}`}>
        {productTags.map((tag) => (
          <li key={tag} className="item">
            <div
              className="link"
              onClick={() => {
                setOpen(false);
                setSelectedTag(tag);
              }}
            >
              {tag}
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .shopSidebar {
          color: rgb(${colors.darkpink});
        }

        .selected-tag {
          color: rgb(${colors.darkpink});
          margin-bottom: -8px;
        }

        .arrow-wrapper {
          display: none;
        }

        .link {
          cursor: pointer;
          line-height: 3;
          font-weight: normal;
          color: rgb(${colors.darkpink});
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .title-container {
            width: 100%;
            border-bottom: 2px solid rgb(${colors.darkpink});
            display: flex;
            padding: 0 1rem;
          }

          .selected-tag {
            line-height: 1;
          }

          .arrow-wrapper {
            display: inline;
            margin-right: 1rem;
          }

          .hideOnMobile {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default ShopSidebar;
