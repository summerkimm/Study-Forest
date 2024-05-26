import { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/icons/icon-search.svg";
import CardList from "../components/CardList";
import { MOCKDATA } from "../mock";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";

function Main() {
  const { studies } = MOCKDATA;
  const [items, setItems] = useState(studies);
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StyledContainer>
      <StyledBoxContainer>
        <StyledBoxTitle>최근 조회한 스터디</StyledBoxTitle>
        {/* <StyledBoxWrapper>
          <Card />
          <Card />
          <Card />
        </StyledBoxWrapper> */}
      </StyledBoxContainer>

      <StyledBoxContainer>
        <StyledBoxTitle>스터디 둘러보기</StyledBoxTitle>
        <SearchInputContainer>
          <img src={SearchIcon} alt="검색창 아이콘" />
          <SearchTextInput
            value={search}
            type="text"
            placeholder="검색"
            onChange={handleChangeSearch}
          />
        </SearchInputContainer>
        <CardList items={filteredItems} />
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

const SearchInputContainer = styled.div`
  display: flex;
  width: 335px;
  height: auto;
  padding: 12px 20px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 15px;
  border: 1px solid #ddd;
  background: #fff;

  ${onMobile} {
    width: 312px;
  }
`;

const SearchTextInput = styled.input`
  width: 100%;
  color: #818181;
  font-size: 16px;
  font-weight: 400;
  border: none;
`;
