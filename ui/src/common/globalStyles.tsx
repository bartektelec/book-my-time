import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #F7FAFC;
        color: #343C4A;
    }
    h1 {
        color: #1A202C;
    }
    p {
        font-weight: 300;
    }
`;

export default GlobalStyle;
