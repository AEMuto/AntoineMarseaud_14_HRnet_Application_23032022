import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: normal!important;
  }
  
  html {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important; /* 2 */
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important; /* 3 */
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
  }
  
  input {
    border: solid 1px;
  }
  
  button {
    //border: none;
    //background: none;
    cursor: pointer;

    &:disabled,
    &:disabled:hover {
      cursor: auto;
    }
  }

  a, a:visited {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .error-message {
    color: red;
    height: 0.5rem;
    margin: 0.5rem 0;
  }

  input.error {
    color: red;
    border-color: red;
  }

`;
