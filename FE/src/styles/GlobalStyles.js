import { createGlobalStyle } from "styled-components";
import COLORS from "./colors";
import { reset } from "./reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard';
    src: url('../../src/assets/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    font-family: "Pretendard";
    font-weight: 400;
    color: ${COLORS.black_41};
    background-color: ${COLORS.backGround};
  }
`;

export default GlobalStyles;
