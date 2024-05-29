import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from "../assets/icons/logoImg.svg";
import { onMobile, onTablet } from "../styles/media-queries";

function Navbar() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <Link to="/">
          <StyledLogo>
            <img src={LogoIcon} alt="홈페이지로 이동" />
          </StyledLogo>
        </Link>
        <Link to="/studies">
          <button>스터디 만들기</button>
        </Link>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Navbar;

const StyledContainer = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
`;

const StyledWrapper = styled.div`
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
