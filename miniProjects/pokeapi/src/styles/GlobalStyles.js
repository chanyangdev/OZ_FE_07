import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'DungGeunMo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DungGeunMo', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  h1 {
    background-color: black;
    color: white;
    padding: 20px;
    text-align: center;
    border-top: 4px solid red;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'DungGeunMo', sans-serif;
  }
`;

export default GlobalStyles;
