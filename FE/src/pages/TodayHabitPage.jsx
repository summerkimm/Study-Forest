import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getStudyIdHabit, patchHabits } from "../api/index";
import Chip from "../components/Chip";
import CommonLayout from "../components/CommonLayout";
import CurrentDateTime from "../components/CurrentDateTime";
import HabitEditModal from "../components/HabitEditModal";
import DateTag from "../components/Tags/DateTag";
import { onMobile, onTablet } from "../styles/media-queries";

function TodayHabitPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [item, setItem] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getStudyIdHabit(id);
    setItem(response?.data);
  };

  const handleChipClick = async () => {
      try {
        await patchHabits(id);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
  };

  console.log(item);
  const { habits, name, nickName } = item;

  const TITLE = `${nickName}의 ${name}`;

  const handleEditModalClick = () => {
    setShowEditModal(!showEditModal);
  };

  const handleNavigateFocus = (id) => {
    navigate(`/studies/${id}/focus`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CommonLayout
        title={TITLE}
        leftBtn="오늘의 집중"
        onClick={handleNavigateFocus}
      >
        <StyledLayoutSubtitle>현재 시간</StyledLayoutSubtitle>
        <DateTag>
          <CurrentDateTime />
        </DateTag>
        <StyledLayoutWrapper>
          <StyledTodayHabitTitle>오늘의 습관</StyledTodayHabitTitle>

          <StyledEditButton onClick={handleEditModalClick}>
            목록 수정
          </StyledEditButton>
          {showEditModal &&
            createPortal(
              <HabitEditModal
                id={id}
                onClick={handleEditModalClick}
                habits={habits}
              />,
              document.getElementById("modal-root")
            )}

          {habits?.length === 0 ? (
            <StyledEmptyContainer>
              <StyledEmptyMessage>
                목록 수정을 눌러 습관을 생성해보세요
              </StyledEmptyMessage>
            </StyledEmptyContainer>
          ) : (
            <StyledChipContainer>
              {habits?.map((habit, index) => (
                <Chip id={index} isCompleted={habit.isCompletedHabit} onClick={handleChipClick}>
                  {habit.name}
                </Chip>
              ))}
            </StyledChipContainer>
          )}
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

const StyledEmptyContainer = styled.div`
  width: 100%;
  height: 498px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledEmptyMessage = styled.p`
  color: var(--gray-gray_818181, #818181);
  text-align: center;
  font-size: 20px;
  font-weight: 500;

  ${onMobile} {
    font-size: 16px;
  }
`;
