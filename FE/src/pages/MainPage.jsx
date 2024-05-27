import { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/icons/icon-search.svg";
import CardList from "../components/CardList";
import Dropdown from "../components/Dropdown";
import { MOCKDATA } from "../mock";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";

const DropdownList = [
  "많은 포인트 순",
  "적은 포인트 순",
  "최근 순",
  "오래된 순",
];

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
    <StyledMainContainer>
      <StyledBoxContainer>
        <StyledBoxTitle>최근 조회한 스터디</StyledBoxTitle>
      </StyledBoxContainer>

      <StyledBoxContainer>
        <StyledBoxTitle>스터디 둘러보기</StyledBoxTitle>
        <StyledAllCardHeader>
          <SearchInputContainer>
            <img src={SearchIcon} alt="검색창 아이콘" />
            <SearchTextInput
              value={search}
              type="text"
              placeholder="검색"
              onChange={handleChangeSearch}
            />
          </SearchInputContainer>
          <Dropdown list={DropdownList} />
        </StyledAllCardHeader>
        <CardList items={filteredItems} />
      </StyledBoxContainer>
    </StyledMainContainer>
  );
}

export default Main;

const StyledMainContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
`;

const StyledBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 20px;
  padding: 40px;
  background: ${colors.white};
`;

const StyledBoxTitle = styled.h1`
  color: ${colors.black_41};
  font-size: 24px;
  font-weight: 800;
`;

const StyledAllCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
