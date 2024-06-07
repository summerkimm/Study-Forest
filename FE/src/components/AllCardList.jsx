import styled from "styled-components";
import { onMobile, onTablet } from "../styles/media-queries";
import Card from "./Card";

function AllCardList({ items, handleLoadMore }) {
  return (
    <StyledAllCardContainer>
      {items.length === 0 ? (
        <StyledEmptyBoxContainer>
          <StyledEmptyMessage>아직 둘러 볼 스터디가 없어요</StyledEmptyMessage>
        </StyledEmptyBoxContainer>
      ) : (
        <StyledCardListContainer>
          {items.map((item, index) => (
            <Card key={index} item={item} type="feed" />
          ))}
        </StyledCardListContainer>
      )}
      <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
    </StyledAllCardContainer>
  );
}

export default AllCardList;

const StyledAllCardContainer =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  ${onMobile} {
    gap: 30px;
  }
`;

const StyledCardListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  ${onTablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${onMobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
`;

const LoadMoreButton = styled.button`
  display: flex;
  width: 280px;
  height: 53px;
  justify-content: center;
  align-items: center;
  color: #578246;
  font-size: 16px;
  font-weight: 500;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #fff;
`;

const StyledEmptyBoxContainer = styled.div`
  width: 100%;
  height: 740px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEmptyMessage = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 20px;
  font-weight: 500;
`;
