import { useState, Children } from 'react';
import { colors, fonts, breakPoints } from '../styles/theme';

const Tabs = ({ defaulIdx = 0, children }) => {
  const [selectedTabIdx, setSelectedTabIdx] = useState(defaulIdx);
  const tabs = Children.toArray(children);

  const renderTabasBar = (tabs) => {
    return;
  };

  const renderActiveTab = () => {
    return;
  };

  return (
    <div className="tabs">
      <ul className="tabas-bar">
        {tabs.map((tab, idx) => {
          const isactive = idx === selectedTabIdx;
          return (
            <li
              className={`tab-header ${isactive ? 'tab-header-active' : ''}`}
              key={idx}
              onClick={() => setSelectedTabIdx(idx)}
            >
              {tab.props.name}
            </li>
          );
        })}
      </ul>
      <div className="active-tab-container">{tabs[selectedTabIdx]}</div>

      <style jsx>{`
        .tabs {
          width: 100%;
        }

        .tabas-bar {
          width: 100%;
          display: flex;
          justify-content: space-around;
          border: 2px solid rgb(${colors.violet});
          border-bottom: none;
        }

        .tab-header {
          flex-grow: 1;
          font-size: 2rem;
          color: rgba(${colors.textblue}, 0.7);
          border-right: 2px solid rgb(${colors.violet});
          padding: 4px 8px;
          cursor: pointer;
        }

        .tab-header:last-of-type {
          border-right: none;
        }

        .tab-header-active {
          font-weight: bold;
          color: rgb(${colors.textblue});
          background-color: rgba(${colors.lightviolet}, 0.4);
        }

        .active-tab-container {
          width: 100%;
          min-height: 200px;
          border: 2px solid rgb(${colors.violet});
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Tabs;
