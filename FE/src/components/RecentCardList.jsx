import styled from "styled-components";
import { onMobile } from "../styles/media-queries";
import Card from "./Card";

function RecentCardList({ items }) {
  return (
    <>
      {items?.length === 0 ? (
        <StyledEmptyBoxContainer>
          <StyledEmptyMessage>아직 조회한 스터디가 없어요</StyledEmptyMessage>
        </StyledEmptyBoxContainer>
      ) : (
        <StyledRecentCardListContainer>
          {items?.map((item, index) => (
            <Card key={index} item={item} />
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
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onMobile} {
    gap: 16px;
  }
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
