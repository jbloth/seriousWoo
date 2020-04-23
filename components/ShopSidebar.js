import { ApolloConsumer } from 'react-apollo';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { colors, breakPoints } from '../styles/theme';
import ArrowIcon from './ArrowIcon';

export const SEL_TAG_QUERY = gql`
  query {
    selectedTag @client
  }
`;

const ShopSidebar = ({ productTags }) => {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(SEL_TAG_QUERY);
  const selectedTag = data.selectedTag;

  const toggleCollapse = () => {
    setOpen(!open);
  };
  // TODO: key in ul aus id statt name?
  return (
    <ApolloConsumer>
      {(client) => (
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
                  onClick={() => client.writeData({ data: { selectedTag: tag } })}
                >
                  {tag}
                </div>
              </li>
            ))}
          </ul>
          <style jsx>{`
            .shopSidebar {
              color: ${colors.darkpink};
            }

            .arrow-wrapper {
              display: none;
            }

            .link {
              cursor: pointer;
              line-height: 3;
              font-weight: normal;
              color: ${colors.darkpink};
            }

            @media only screen and (max-width: ${breakPoints.bp_md}) {
              .title-container {
                width: 100%;
                border-bottom: 2px solid ${colors.darkpink};
                display: flex;
                padding: 0 1rem;
              }

              .selected-tag {
                line-height: 1;
              }

              .arrow-wrapper {
                display: inline;
              }

              .hideOnMobile {
                display: none;
              }
            }
          `}</style>
        </nav>
      )}
    </ApolloConsumer>
  );
};

export default ShopSidebar;
