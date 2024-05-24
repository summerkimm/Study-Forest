import styled from "styled-components";
import { onMobile, onTablet } from "../styles/media-queries";
import Card from "./Card";

function CardList({ studies }) {

  return (
    <StyledAllCardListContainer>
      {studies.map((study) => 
        <Card key={study.id} study={study} />
      )}
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
