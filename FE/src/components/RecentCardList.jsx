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
    <RecentCardListContainer>
      {filteredItems.map((item) => (
        <Card item={item} />
      ))}
    </RecentCardListContainer>
  );
}

export default RecentCardList;

const RecentCardListContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%
`;
