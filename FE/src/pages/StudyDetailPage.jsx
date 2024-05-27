import { useParams } from "react-router-dom";
import styled from "styled-components";
import HabitTracker from "../components/HabitTracker";

const MOCK = {
  id: 129,
  name: "개발 공장",
  nickName: "연우",
  description: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)",
  studyDays: 62,
  topReactions: [
    {
      id: 27,
      emoji: "👩🏻",
      count: 37,
    },
    {
      id: 39,
      emoji: "🔥",
      count: 26,
    },
    {
      id: 31,
      emoji: "🤍",
      count: 14,
    },
  ],
  point: 50,
  habitTrackers: [
    {
      id: 1,
      name: "미라클모닝 6시 기상",
      isCompleted: ["Mon", "Tue", "Thu", "Sat", "Sun"],
    },
    {
      id: 2,
      name: "아침 챙겨 먹기",
      isCompleted: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
    },
  ],
};

function StudyDetailPage() {
  const { nickName, name, description, point, habitTrackers } = MOCK;
  // let { id } = useParams();
  // console.log(id);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          {nickName}의 {name}
        </StyledTitle>
        <div>
          <div>오늘의 습관</div>
          <div>오늘의 집중</div>
        </div>
      </StyledHeader>
      <StyledSubTitle>소개</StyledSubTitle>
      {description}
      <StyledSubTitle>현재까지 획득한 포인트</StyledSubTitle>
      {point} 획득
      <HabitTracker habits={habitTrackers} />
    </StyledContainer>
  );
}
export default StudyDetailPage;

const StyledContainer = styled.div`
  width: 1200px;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: #fff;
  margin: 0 auto;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.h1`
  color: #414141;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const StyledSubTitle = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// const StyledHabitTrackerHeader = styled.h2`
//   color: var(--black-black_414141, #414141);
//   /* text-align: right; */
//   font-family: Pretendard;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 800;
//   line-height: normal;
// `;

// const StyledHabitTracker = styled.div`
//   width: 100%;
//   display: flex;
//   padding: 24px;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 10px;
//   border-radius: 20px;
//   border: 1px solid var(--gray-gray_DDDDDD, #ddd);
//   background: #fff;
//   box-sizing: border-box;
// `;
