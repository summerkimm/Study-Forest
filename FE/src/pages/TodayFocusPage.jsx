import styled from "styled-components";
import CommonLayout from "../components/CommonLayout";
import PointTag from "../components/Tags/PointTag";
import { onTablet } from "../styles/media-queries";

function TodayFocusPage() {
  return (
    <CommonLayout title="연우의 개발공장" leftBtn="오늘의 습관">
      <StyledLayoutSubtitle>현재까지 획득한 포인트</StyledLayoutSubtitle>
      <PointTag status="general" points="310" />
      <StyledLayoutWrapper>
        <StyledTodayFocusTitle>오늘의 집중</StyledTodayFocusTitle>
      </StyledLayoutWrapper>
    </CommonLayout>
  );
}

export default TodayFocusPage;

const StyledTodayFocusTitle = styled.h1`
  color: var(--black-black_414141, #414141);
  font-size: 24px;
  font-weight: 800;
`;

const StyledLayoutSubtitle = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const StyledLayoutWrapper = styled.div`
  display: flex;
  height: auto;
  padding: 40px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  margin-top: 24px;

  ${onTablet} {
    margin-top: 40px;
  }
`;
