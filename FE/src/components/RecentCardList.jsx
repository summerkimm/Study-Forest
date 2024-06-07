import styled from "styled-components";
import { onMobile } from "../styles/media-queries";
import Card from "./Card";

function RecentCardList({ items }) {
  return (
    <StyledRecentCardListContainer>
      {items?.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </StyledRecentCardListContainer>
  );
}

export default RecentCardList;

const StyledRecentCardListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 24px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onMobile} {
    gap: 16px;
  }
`;
