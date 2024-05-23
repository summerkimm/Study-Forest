import styled from "styled-components";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";

function Main() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitle>최근 조회한 스터디</StyledTitle>
      </StyledWrapper>
      <StyledWrapper>
        <StyledTitle>스터디 둘러보기</StyledTitle>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Main;

const StyledContainer = styled.div`
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 1200px;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: ${colors.white};

  ${onTablet} {
    width: 697px;
  }

  ${onMobile} {
    width: 344px;
  }
`;

const StyledTitle = styled.h1`
  color: ${colors.black_41};
  font-size: 24px;
  font-weight: 800;
`;
