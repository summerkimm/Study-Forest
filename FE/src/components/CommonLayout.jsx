import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { onMobile, onTablet } from "../styles/media-queries";

function CommonLayout({ title, children, leftBtn, subTitle }) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };
  return (
    <StyledLayoutContainer>
      <StyledLayoutHeader>
        <StyledLayoutTitle>{title}</StyledLayoutTitle>
        <StyledLayoutButtonContainer>
          <Button>{leftBtn}</Button>
          <Button onClick={handleClickHome}>홈</Button>
        </StyledLayoutButtonContainer>
      </StyledLayoutHeader>
      {children}
      {/* <StyledLayoutWrapper>{children}</StyledLayoutWrapper> */}
    </StyledLayoutContainer>
  );
}

export default CommonLayout;

const StyledLayoutContainer = styled.div`
  width: 1248px;
  height: 700px;
  padding: 40px;
  gap: 10px;
  border-radius: 20px;
  background: #fff;
  margin: 0 auto;
  margin-top: 39px;

  ${onTablet} {
    width: 696px;
    padding: 24px;
    margin-top: 16px;
  }

  ${onMobile} {
    width: 344px;
    padding: 16px;
    margin-top: 20px;
  }
`;

const StyledLayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${onMobile} {
    flex-direction: column;
    align-items: start;
    gap: 16px;
  }
`;

const StyledLayoutTitle = styled.h1`
  color: #414141;
  font-size: 32px;
  font-weight: 800;
  display: flex;
  justify-content: space-between;

  ${onMobile} {
    font-size: 24px;
  }
`;

const StyledLayoutButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

// const StyledLayoutSubtitle = styled.p`
//   color: var(--gray-gray_818181, #818181);
//   font-size: 18px;
//   font-weight: 400;
//   margin-bottom: 8px;
// `;

const StyledLayoutWrapper = styled.div`
  display: flex;
  height: auto;
  padding: 40px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  margin-top: 24px;

  ${onTablet} {
    margin-top: 40px;
  }
`;
