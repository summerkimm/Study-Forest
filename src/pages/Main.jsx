import styled from "styled-components";
import Card from "../components/Card";
import SearchInput from "../components/SearchInput";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";
import CardList from '../components/CardList';

function Main() {
  return (
    <StyledContainer>
      <StyledBoxContainer>
        <StyledBoxTitle>최근 조회한 스터디</StyledBoxTitle>
        <StyledBoxWrapper>
          <Card />
          <Card />
          <Card />
        </StyledBoxWrapper>
      </StyledBoxContainer>

      <StyledBoxContainer>
        <StyledBoxTitle>스터디 둘러보기</StyledBoxTitle>
        <SearchInput />
        <CardList />
      </StyledBoxContainer>
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

const StyledBoxContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  display: flex;
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

const StyledBoxTitle = styled.h1`
  color: ${colors.black_41};
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const StyledBoxWrapper = styled.div`
  border: 1px solid #000;
  display: flex;
  width: 100%;
  height: auto;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  overflow-x: auto;
`;
