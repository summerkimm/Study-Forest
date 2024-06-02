import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getStudyIdHabit } from "../api/studies";
import Chip from "../components/Chip";
import CommonLayout from "../components/CommonLayout";
import DateTag from "../components/Tags/DateTag";
import { onMobile, onTablet } from "../styles/media-queries";

function TodayHabitPage() {
  const { id } = useParams();
  console.log(id);

  // const fetchData = async () => {
  //   const response = await getStudyIdHabit(id);
  //   console.log(response);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <CommonLayout title="연우의 개발공장" leftBtn="오늘의 집중">
      <StyledLayoutSubtitle>현재 시간</StyledLayoutSubtitle>
      <DateTag>2024-01-04 오후 3:06</DateTag>
      <StyledLayoutWrapper>
        <StyledTodayHabitTitle>오늘의 습관</StyledTodayHabitTitle>
        <StyledChipContainer>
          <Chip isActive={true}>습관습관습관1</Chip>
          <Chip isActive={true}>습관습관습관1</Chip>
          <Chip isActive={true}>습관습관습관1</Chip>
          <Chip isActive={false}>습관습관습관1</Chip>
          <Chip isActive={false}>습관습관습관1</Chip>
        </StyledChipContainer>
      </StyledLayoutWrapper>
    </CommonLayout>
  );
}

export default TodayHabitPage;

const StyledTodayHabitTitle = styled.h1`
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
