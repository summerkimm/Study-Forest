import styled from "styled-components";
import Chip from "../components/Chip";
import CommonLayout from "../components/CommonLayout";
import { onMobile } from "../styles/media-queries";

function TodayHabitPage() {
  return (
    <CommonLayout title="연우의 개발공장" leftBtn="오늘의 집중">
      <StyledTodayHabitTitle>오늘의 습관</StyledTodayHabitTitle>

      <StyledChipContainer>
        <Chip isActive={true}>습관습관습관1</Chip>
        <Chip isActive={true}>습관습관습관1</Chip>
        <Chip isActive={true}>습관습관습관1</Chip>
        <Chip isActive={false}>습관습관습관1</Chip>
        <Chip isActive={false}>습관습관습관1</Chip>
      </StyledChipContainer>
    </CommonLayout>
  );
}

export default TodayHabitPage;

const StyledTodayHabitTitle = styled.h1`
  color: var(--black-black_414141, #414141);
  font-size: 24px;
  font-weight: 800;
`;

const StyledChipContainer = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;

  ${onMobile} {
    width: 280px;
  }
`;
