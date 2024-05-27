import styled from "styled-components";
import Button from "../components/Button";
import HabitTracker from "../components/HabitTracker";
import PointTag from "../components/Tags/PointTag";

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
    {
      id: 3,
      name: "스트레칭",
      isCompleted: [],
    },
    {
      id: 4,
      name: "React 스터디 책 1챕터 읽기",
      isCompleted: [],
    },
    {
      id: 5,
      name: "사이드 프로젝트",
      isCompleted: [],
    },
    {
      id: 6,
      name: "물 2L 마시기",
      isCompleted: [],
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
        <StyledButtonContainer>
          <Button>오늘의 습관</Button>
          <Button>오늘의 집중</Button>
        </StyledButtonContainer>
      </StyledHeader>
      <StyledSubTitle>소개</StyledSubTitle>
      {description}
      <StyledSubTitle>현재까지 획득한 포인트</StyledSubTitle>
      <PointTag points={point} />
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

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

const StyledTitle = styled.h1`
  color: #414141;
  font-size: 32px;
  font-weight: 800;
`;

const StyledSubTitle = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 400;
`;
