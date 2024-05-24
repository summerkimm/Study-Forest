import styled from "styled-components";
import { onMobile, onTablet } from "../styles/media-queries";
import Card from "./Card";

function CardList() {
  return (
    <CardListContainer>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </CardListContainer>
  );
}

export default CardList;

const CardListContainer = styled.div`
  border: 1px solid #000;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  ${onTablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${onMobile} {
    grid-template-columns: 1fr;
  }
`;
