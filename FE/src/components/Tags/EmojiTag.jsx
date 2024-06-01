import styled from "styled-components";
import COLORS from "../../styles/colors";

function EmojiTag({ reactions, status }) {
  const { emoji, count } = reactions;

  return (
    <StyledEmojiTagContainer status={status}>
      <StyledEmoji>{emoji}</StyledEmoji>
      <span>{count}</span>
    </StyledEmojiTagContainer>
  );
}

export default EmojiTag;

const StyledEmojiTagContainer = styled.div`
  display: flex;
  width: 48px;
  height: 26px;
  padding: 6px 8px;
  justify-content: center;
  gap: 5px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
  background: ${({ status }) =>
    status === "dark" ? "rgba(0, 0, 0, 0.50)" : "rgba(0, 0, 0, 0.40)"};
  font-size: 12px;
  color: ${COLORS.white};
`;

const StyledEmoji = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
