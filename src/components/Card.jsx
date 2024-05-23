import styled from "styled-components";
import colors from "../styles/colors";

function Card() {
  return (
    <StyledCardContainer>
      <StyledCardTitleWrapper>
        <StyledCardTitle>이유디 의 UX 스터디</StyledCardTitle>
        <div>Tag</div>
      </StyledCardTitleWrapper>
      <StyledDay>62일 째 진행 중</StyledDay>
      <StyledIntroduce>Slow And Steady Wins The Race!!</StyledIntroduce>
      <div>tag tag tag</div>
    </StyledCardContainer>
  );
}

export default Card;

const StyledCardContainer = styled.div`
  width: 358px;
  height: auto;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(65, 65, 65, 0.5);
  padding: 30px;
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
  margin-bottom: 10px;
`;

const StyledDay = styled.p`
  color: #eee;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 30px;
`;

const StyledIntroduce = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  padding-bottom: 45px;
`;
