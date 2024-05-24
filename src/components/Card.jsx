import styled from "styled-components";
import colors from "../styles/colors";
import EmojiTag from "./Tags/EmojiTag";
import PointTag from "./Tags/PointTag";

const MOCKDATA = {
  id: 1,
  name: "UX 스터디",
  nickName: "이유디",
  description: "Slow And Steady Wins The Race!!",
  studyDays: 62,
  background: "sky-blue",
  points: 310,
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
};

function Card() {
  const { name, nickName, description, studyDays } = MOCKDATA;

  return (
    <StyledCardContainer>
      <StyledCardHeader>
        <StyledCardTitleWrapper>
          <StyledCardTitle>
            {nickName} 의 {name}
          </StyledCardTitle>
          <PointTag status="light" />
          {/* <PointTag status="dark" /> */}
        </StyledCardTitleWrapper>
        <StyledDay>
          <span>{studyDays}</span>일 째 진행 중
        </StyledDay>
      </StyledCardHeader>
      <StyledCardDescription>{description}</StyledCardDescription>
      <StyledEmojiTagWrapper>
        <EmojiTag status="light" />
        <EmojiTag status="light" />
        <EmojiTag status="light" />
      </StyledEmojiTagWrapper>

      {/* <StyledEmojiTagWrapper>
        <EmojiTag status="dark" />
        <EmojiTag status="dark" />
        <EmojiTag status="dark" />
      </StyledEmojiTagWrapper> */}
    </StyledCardContainer>
  );
}

export default Card;

const StyledCardContainer = styled.div`
  width: 358px;
  height: 243px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(65, 65, 65, 0.5);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const StyledCardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StyledCardTitle = styled.div`
  color: ${colors.white};
  font-size: 18px;
  font-weight: 700;
`;

const StyledDay = styled.p`
  color: ${colors.gray_EE};
  font-size: 14px;
  font-weight: 400;
`;

const StyledCardDescription = styled.p`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const StyledEmojiTagWrapper = styled.div`
  border: 1px solid #000;
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;
