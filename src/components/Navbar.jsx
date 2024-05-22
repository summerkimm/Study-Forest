import styled from "styled-components";
import LogoIcon from "../assets/logoImg.svg";
import { onMobile, onTablet } from '../styles/media-queries';

function Navbar() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <a href="/">
          <StyledLogo>
            <img src={LogoIcon} alt="홈페이지로 이동" />
          </StyledLogo>
        </a>
        <button>스터디 만들기</button>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Navbar;

const StyledContainer = styled.div`
  border: 1px solid #000;
  width: 100%;
  height: 100px;
  text-align: center;
`;

const StyledWrapper = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1480px;
  min-width: 343px;
  margin: 20px 220px;

  ${onTablet} {
    margin: 20px 24px;
  }

  ${onMobile} {
    margin: 32px 16px;
  }
`;

const StyledLogo = styled.a`
  width: 182px;
  height: 60px;
  position: relative;

  ${onMobile} {
    width: 106px;
    height: 35px;
  }
`;

