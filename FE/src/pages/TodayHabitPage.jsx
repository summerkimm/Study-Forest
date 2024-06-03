import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Chip from "../components/Chip";
import CommonLayout from "../components/CommonLayout";
import HabitEditModal from "../components/HabitEditModal";
import DateTag from "../components/Tags/DateTag";
import { onMobile, onTablet } from "../styles/media-queries";
import { getStudyIdHabit } from '../api/studies';


const MOCK = {
  id: 129,
  name: "개발 공장",
  nickName: "연우",
  habits: [
    {
      id: 1,
      name: "미라클모닝 6시 기상",
      isCompleted: true,
    },
    {
      id: 2,
      name: "아침 챙겨 먹기",
      isCompleted: true,
    },
    {
      id: 3,
      name: "React 스터디 책 1챕터 읽기",
      isCompleted: true,
    },
    {
      id: 4,
      name: "스트레칭",
      isCompleted: false,
    },
    {
      id: 5,
      name: "영양제 챙겨 먹기",
      isCompleted: true,
    },
    {
      id: 6,
      name: "사이드 프로젝트",
      isCompleted: false,
    },
    {
      id: 7,
      name: "물 2L 먹기",
      isCompleted: false,
    },
  ],
};

function TodayHabitPage() {
  const { id } = useParams();
  console.log(id);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [habits, setHabit] = useState([]);

  const fetchData = async () => {
    const response = await getStudyIdHabit(id);
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { habits } = MOCK;

  const handleEditModalClick = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <>
      <CommonLayout title="연우의 개발공장" leftBtn="오늘의 집중">
        <StyledLayoutSubtitle>현재 시간</StyledLayoutSubtitle>
        <DateTag>2024-01-04 오후 3:06</DateTag>
        <StyledLayoutWrapper>
          <StyledTodayHabitTitle>오늘의 습관</StyledTodayHabitTitle>

          <StyledEditButton onClick={handleEditModalClick}>
            목록 수정
          </StyledEditButton>
          {showEditModal &&
            createPortal(
              <HabitEditModal onClick={handleEditModalClick} habits={habits} />,
              document.getElementById("modal-root")
            )}

          <StyledChipContainer>
            {habits.map((habit) => (
              <Chip isActive={habit.isCompleted}>{habit.name}</Chip>
            ))}
          </StyledChipContainer>
        </StyledLayoutWrapper>
      </CommonLayout>
    </>
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

const StyledEditButton = styled.button`
  color: var(--gray-gray_818181, #818181);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;
