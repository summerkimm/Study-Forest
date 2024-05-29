import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

function RecentCardList({ items }) {
  const [recentViewedItems, setrecentViewedItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("watched"));
    if (storedItems) {
      setrecentViewedItems(storedItems);
    }
  }, []);

  const filteredItems = items
    .filter((item) => recentViewedItems.reverse().includes(String(item.id)))
    .slice(0, 3);

  return (
    <>
      {filteredItems.length === 0 ? (
        <StyledEmptyBoxContainer>
          <StyledEmptyMessage>아직 조회한 스터디가 없어요</StyledEmptyMessage>
        </StyledEmptyBoxContainer>
      ) : (
        <StyledRecentCardListContainer>
          {filteredItems.map((item) => (
            <Card item={item} />
          ))}
        </StyledRecentCardListContainer>
      )}
    </>
  );
}

export default RecentCardList;

const StyledRecentCardListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 24px;
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
