import css from 'styled-jsx/css';
import { colors, fonts, breakPoints } from './theme';

export default css.global`
  /* ---- Fonts ---- */

  /* monda-700 - latin */
  @font-face {
    font-family: 'Monda';
    font-style: bold;
    font-weight: 700;
    src: url('/fonts/monda-v9-latin-700.eot');
    src: local('Monda Bold'), local('Monda-Bold'),
      url('/fonts/monda-v9-latin-700.eot?#iefix') format('embedded-opentype'),
      url('/fonts/monda-v9-latin-700.woff2') format('woff2'),
      url('/fonts/monda-v9-latin-700.woff') format('woff'),
      url('/fonts/monda-v9-latin-700.ttf') format('truetype'),
      url('/fonts/monda-v9-latin-700.svg#Monda') format('svg'); /* Legacy iOS */
  }

  /* monda-regular - latin */
  @font-face {
    font-family: 'Monda';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/monda-v9-latin-regular.eot');
    src: local('Monda Regular'), local('Monda-Regular'),
      url('/fonts/monda-v9-latin-regular.eot?#iefix') format('embedded-opentype'),
      url('/fonts/monda-v9-latin-regular.woff2') format('woff2'),
      url('/fonts/monda-v9-latin-regular.woff') format('woff'),
      url('/fonts/monda-v9-latin-regular.ttf') format('truetype'),
      url('/fonts/monda-v9-latin-regular.svg#Monda') format('svg'); /* Legacy iOS */
  }

  /* mirza-regular - latin */
  @font-face {
    font-family: 'Mirza';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/mirza-v7-latin-regular.eot');
    src: local('Mirza Regular'), local('Mirza-Regular'),
      url('/fonts/mirza-v7-latin-regular.eot?#iefix') format('embedded-opentype'),
      url('/fonts/mirza-v7-latin-regular.woff2') format('woff2'),
      url('/fonts/mirza-v7-latin-regular.woff') format('woff'),
      url('/fonts/mirza-v7-latin-regular.ttf') format('truetype'),
      url('/fonts/mirza-v7-latin-regular.svg#Mirza') format('svg'); /* Legacy iOS */
  }

  /* mirza-700 - latin */
  @font-face {
    font-family: 'Mirza';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/mirza-v7-latin-700.eot');
    src: local('Mirza Bold'), local('Mirza-Bold'),
      url('/fonts/mirza-v7-latin-700.eot?#iefix') format('embedded-opentype'),
      url('/fonts/mirza-v7-latin-700.woff2') format('woff2'),
      url('/fonts/mirza-v7-latin-700.woff') format('woff'),
      url('/fonts/mirza-v7-latin-700.ttf') format('truetype'),
      url('/fonts/mirza-v7-latin-700.svg#Mirza') format('svg'); /* Legacy iOS */
  }

  /* ---- Reset and Base ---- */
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
    overflow-x: hidden;
  }

  body {
    box-sizing: border-box;
    color: rgb(${colors.textblue});
    overflow-x: hidden;
    position: relative;

    font-family: ${fonts.text};
    font-weight: 400;
    font-size: 16px;
    line-height: 1.7;
    background-color: rgb(${colors.bg});
  }

  a {
    text-decoration: none;
    color: rgb(${colors.textred});
  }

  ul {
    list-style: none;
  }

  h1 {
    font-size: 4.8rem;
    font-family: ${fonts.heading};
    font-weight: normal;
    color: rgb(${colors.darkpink});
  }

  h2 {
    font-family: ${fonts.text};
    font-weight: normal;
    color: rgb(${colors.darkpink});
  }

  h3 {
    font-size: 2.4rem;
    font-family: ${fonts.text};
    font-weight: normal;
    color: rgb(${colors.textred});
  }

  button {
    appearance: none;
    border: 0;
    background: transparent;
  }
  
  /* ---- wrapper & utility classes ---- */
  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem;
  }

  @media only screen and (max-width: ${breakPoints.bp_smallest}) {
    .section {
      padding: 4rem;
    }
  }

  @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
    .section {
      padding: 3rem;
    }
  }

  .l-wrapper {
    max-width: 1100px;
  }

  /* ------ state ------ */
  .site-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .site-main {
    flex: 1 0 auto;
  }

  @media only screen and (max-width: ${breakPoints.bp_md}) {
    .hideOnMobile {
      display: none;
    }
  }

  /* ---- size chart ---- */
  .table-responsive td {
    padding: 0 0.5rem;
  }
`;
