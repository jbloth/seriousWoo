import { useState, useContext, useEffect } from 'react';

import { AppContext } from '../components/context/AppContext';
import { colors, breakPoints } from '../styles/theme';
import CloseIcon from './graphics/CloseIcon';
import TextInput from './TextInput';
import SearchIcon from './graphics/SearchIcon';
import SearchResults from './SearchResults';

const SearchModal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchOpen, setSearchOpen, toggleSearchOpen } = useContext(AppContext);

  // Add Listener to close modal when "ESC" key is pressed
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        setSearchOpen(false);
      }
    }

    document.addEventListener('keydown', keyListener);
    return () => document.removeEventListener('keydown', keyListener);
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`search-container ${!searchOpen ? '' : 'search-container--active'}`}>
      <div className="close-icon" aria-label="Close">
        <CloseIcon onClick={toggleSearchOpen} />
      </div>

      <div className="input-wrapper">
        <TextInput
          id="search-input"
          aria-label="Search input"
          extraClass="textInput--large"
          name="searchterm"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Yes, please?"
        />
        <div className="search-icon-wrapper" aria-label="Search">
          <SearchIcon />
        </div>
      </div>

      {searchTerm && (
        <div className="search-results-wrapper">
          <SearchResults searchTerm={searchTerm} />
        </div>
      )}

      <style jsx>{`
        .search-container {
          width: 100vw;
          height: 100%;
          min-height: 100vh;
          max-height: 100vh;
          background-color: rgb(${colors.lightyellow});
          position: fixed;
          overflow-y: auto;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 500;
          padding: 12rem 4rem 2rem 4rem;
          transform: translateY(-100%);
          transition: transform 0.5s ease-in;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-container--active {
          transform: translateY(0);
          z-index: 104;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: rgb(${colors.darkpink});
          cursor: pointer;
        }

        .input-wrapper {
          width: 40%;
          display: flex;
          position: relative;
        }

        .search-icon-wrapper {
          width: 4rem;
          height: 4rem;
          padding: 6px;
          border: 2px solid rgb(${colors.violet});
          fill: rgb(${colors.darkpink});
          position: absolute;
          right: 0;
          cursor: pointer;
        }

        .search-results-wrapper {
          padding: 6rem 0;
          width: 80%;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .input-wrapper {
            width: 80%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .search-container {
            width: 100%;
            min-width: unset;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .input-wrapper {
            width: 100%;
          }

          .search-results-wrapper {
            padding: 6rem 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchModal;
