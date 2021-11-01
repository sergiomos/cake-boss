import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;
  };
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'roboto', sans-serif;
    padding: 0 1.6rem;
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
