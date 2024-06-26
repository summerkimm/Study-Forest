import { useEffect, useState } from "react";
import styled from "styled-components";
import { getStudies, getStudiesId } from "../api/index";
import SearchIcon from "../assets/icons/icon-search.svg";
import AllCardList from "../components/AllCardList";
import Dropdown from "../components/Dropdown";
import RecentCardList from "../components/RecentCardList";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";

function Main() {
  const [items, setItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [view, setView] = useState("newest");

  const fetchData = async ({ search, offset, view }) => {
    try {
      const response = await getStudies({ search, offset, view });
      const { studies } = response?.data;
      setItems((prevItems) =>
        offset === 0 ? studies : [...prevItems, ...studies]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setItems([]);
    fetchData({ search, offset: 0, view });
  }, [search, view, offset]);

  useEffect(() => {
    const storedRecentStudies = localStorage.getItem("recentStudies");
    const recentStudies = storedRecentStudies
      ? JSON.parse(localStorage.getItem("recentStudies"))
      : [];

    if (recentStudies.length === 0) {
      return;
    }

    const validRecentStudies = recentStudies?.filter((id) => id);
    const fetchRecentStudies = async () => {
      try {
        const responses = await Promise.all(
          validRecentStudies?.map((id) => getStudiesId(id))
        );
        const recentData = responses?.map((response) => response.data);
        setRecentItems(recentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentStudies();
  }, []);

  const handleChangeSearch = async (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setOffset(0);

    if (newSearch === "") {
      fetchData({ search: "", offset: 0, view });
    }
  };

  const handleChangeView = async (val) => {
    setView(val);
    setOffset(0);
  };

  const handleLoadMore = async () => {
    const newOffset = offset + 6;
    setOffset(newOffset);
    fetchData({ search, offset: newOffset, view });
  };

  return (
    <StyledMainContainer>
      <StyledRecentCardBoxContainer>
        <StyledBoxTitle>최근 조회한 스터디</StyledBoxTitle>
        {recentItems.length === 0 ? (
          <StyledEmptyBoxContainer>
            <StyledEmptyMessage>아직 조회한 스터디가 없어요</StyledEmptyMessage>
          </StyledEmptyBoxContainer>
        ) : (
          <RecentCardList items={recentItems} />
        )}
      </StyledRecentCardBoxContainer>

      <StyledAllCardBoxContainer>
        <StyledBoxTitle>스터디 둘러보기</StyledBoxTitle>
        <StyledAllCardBoxHeader>
          <SearchInputContainer>
            <img src={SearchIcon} alt="검색창 아이콘" />
            <SearchTextInput
              value={search}
              type="text"
              placeholder="검색"
              onChange={handleChangeSearch}
            />
          </SearchInputContainer>
          <Dropdown handleChangeView={handleChangeView} />
        </StyledAllCardBoxHeader>
        <AllCardList items={items} handleLoadMore={handleLoadMore} />
      </StyledAllCardBoxContainer>
    </StyledMainContainer>
  );
}

export default Main;

const StyledMainContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;

  ${onTablet} {
    width: 696px;
    gap: 24px;
  }

  ${onMobile} {
    width: 344px;
    gap: 16px;
  }
`;

const StyledBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 40px;
  background: ${colors.white};
  margin: 0 auto;
  flex-shrink: 1;

  ${onTablet} {
    padding: 24px;
  }

  ${onMobile} {
    padding: 16px;
  }
`;

const StyledRecentCardBoxContainer = styled(StyledBoxContainer)`
  gap: 30px;

  ${onTablet} {
    gap: 18px;
  }

  ${onMobile} {
    gap: 16px;
  }
`;

const StyledAllCardBoxContainer = styled(StyledBoxContainer)`
  gap: 24px;

  ${onMobile} {
    gap: 12px;
  }
`;

const StyledBoxTitle = styled.h1`
  color: ${colors.black_41};
  font-size: 24px;
  font-weight: 800;

  ${onMobile} {
    font-size: 16px;
  }
`;

const StyledAllCardBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;

  ${onMobile} {
    display: grid;
    gap: 12px;
    justify-items: end;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 335px;
  height: 42px;
  padding: 12px 20px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;

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

const StyledEmptyBoxContainer = styled.div`
  width: 100%;
  height: 358px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEmptyMessage = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 20px;
  font-weight: 500;
`;
