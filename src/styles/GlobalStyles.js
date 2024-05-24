import { createGlobalStyle } from "styled-components";
import reset from './reset.css'
import COLORS from './colors';

const GlobalStyles = createGlobalStyle`
  @import url(${reset});

  @font-face {
    font-family: 'Pretendard';
    src: url('/src/assets/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Pretendard';
    background-color: ${COLORS.backGround};
    color: ${COLORS.black_41};
  }
`;

export default GlobalStyles;
