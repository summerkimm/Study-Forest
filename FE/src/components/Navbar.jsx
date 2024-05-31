import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from "../assets/icons/logoImg.svg";
import { onMobile, onTablet } from "../styles/media-queries";

function Navbar() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <Link to="/">
            <StyledLogo
              src={LogoIcon}
              alt="홈페이지로 이동"
            />
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
  display: flex;
  align-items: center;
`;

const StyledWrapper = styled.div`
  width: 1480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${onTablet} {
    width: 744px;
  }

  ${onMobile} {
    width: 375px;
  }
`;

const StyledLogo = styled.img`
  width: 182px;
  height: 60px;
  position: relative;

  ${onMobile} {
    width: 106px;
    height: 35px;
  }
`;
