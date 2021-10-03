import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }

  body, input, button{
    font-family: Poppins, sans-serif;
  }

  button{
    cursor: pointer;
  }

  #root{
    max-width: 80%;
    margin: 0 auto;
    padding: 40px 20px;
    height: 100vh;
  }
`;
