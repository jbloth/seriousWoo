import css from 'styled-jsx/css';
import { colors, fonts } from './theme';

export default css.global`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    /* This defines what 1rem is */
    font-size: 62.5%; /*1 rem = 10px; 10px/16px = 62.5% */
  }

  body {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${colors.textRed};
  }

  ul {
    list-style: none;
  }

  body {
    font-family: ${fonts.text};
    font-weight: 400;
    font-size: 16px;
    line-height: 1.7;
    background-color: ${colors.bg};
    overflow-x: hidden;
  }

  h1 {
    font-size: 4.8rem;
    font-family: ${fonts.heading};
    font-weight: normal;
    color: ${colors.darkPink};
  }

  h3 {
    font-size: 2.4rem;
    font-family: ${fonts.heading};
    font-weight: normal;
    color: ${colors.textRed};
  }

  // ---- wrapper & utility classes ---- //
  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem 6rem;
    overflow: hidden;
  }

  .l-wrapper {
    max-width: 1100px;
  }

  // ------ state ------ //
  // TODO: Does this belong here?
  .dropdown:hover .dropdown-content {
    display: flex;
    flex-direction: column;
  }

  .dropdown-content {
    display: none;
    position: absolute;
  }
`;
