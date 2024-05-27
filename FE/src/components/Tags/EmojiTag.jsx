import styled from "styled-components";
import COLORS from "../../styles/colors";

function EmojiTag({ reactions, status }) {
  const { emoji, count } = reactions;

  return (
    <StyledEmojiTagContainer status={status}>
      <StyledEmoji>{emoji}</StyledEmoji>
      <StyledEmojiNumber>{count}</StyledEmojiNumber>
    </StyledEmojiTagContainer>
  );
}

export default EmojiTag;

const StyledEmojiTagContainer = styled.div`
  display: flex;
  width: 48px;
  padding: 6px 8px;
  align-items: center;
  gap: 5px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
  background: ${({ status }) =>
    status === "dark" ? "rgba(0, 0, 0, 0.50)" : "rgba(0, 0, 0, 0.40)"};
`;

const StyledEmoji = styled.div`
  font-size: 12px;
`;

const StyledEmojiNumber = styled.div`
  color: ${COLORS.white};
  font-size: 12px;
  font-weight: 400;
`;
