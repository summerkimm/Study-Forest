import styled from "styled-components";
import SearchIcon from "../assets/icons/icon-search.svg";

function SearchInput() {
  return (
    <SearchInputContainer>
      <img src={SearchIcon} alt="tmxj" />
      <SearchTextInput type="text" placeholder="검색" />
    </SearchInputContainer>
  );
}

export default SearchInput;

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
`;

const SearchTextInput = styled.input`
  width: 100%;
  color: #818181;
  font-size: 16px;
  font-weight: 400;
`;
