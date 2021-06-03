import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Oxanium&display=swap');
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: "Oxanium", sans-serif;
    transition: all 0.50s linear;
  }
  `;
export default GlobalStyles;