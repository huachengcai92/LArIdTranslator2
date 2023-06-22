import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }  
  
  html, body {
    font-family: 'Lato', sans-serif;
    background: rgb(241, 243, 244);
  }
`;

export default GlobalStyle;
