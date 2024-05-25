import styled from "styled-components";
import Card from "../components/Card";
import CardList from "../components/CardList";
import SearchInput from "../components/SearchInput";
import { MOCKDATA } from "../mock";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";
import { useState } from 'react';

function Main() {
  const { studies } = MOCKDATA;
  const [items, setItems] = useState(studies);

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
        <CardList items={items} />
      </StyledBoxContainer>
    </StyledContainer>
  );
}

export default Main;

const StyledContainer = styled.div`
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
  display: flex;
  width: 100%;
  height: auto;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  overflow-x: auto;
`;
