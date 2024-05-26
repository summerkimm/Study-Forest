import styled from "styled-components";
import { onMobile, onTablet } from "../styles/media-queries";
import Card from "./Card";

function CardList({ items }) {
  return (
    <StyledAllCardListContainer>
      {items.map((item) => (
        <Card
          key={item.id}
          background={item.background}
          description={item.description}
          name={item.name}
          nickName={item.nickName}
          points={item.points}
          studyDays={item.studyDays}
          topReactions={item.topReactions}
        />
      ))}
    </StyledAllCardListContainer>
  );
}

export default CardList;

const StyledAllCardListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  ${onTablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${onMobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
