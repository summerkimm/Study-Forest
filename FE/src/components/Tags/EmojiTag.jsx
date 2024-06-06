import styled from "styled-components";
import COLORS from "../../styles/colors";

function EmojiTag({ reactions, status }) {
  const { emoji, count } = reactions;

  return (
    <StyledEmojiTagContainer status={status}>
      <StyledEmoji status={status}>{emoji}</StyledEmoji>
      <StyledEmojiNumber status={status}>{count}</StyledEmojiNumber>
    </StyledEmojiTagContainer>
  );
}

export default EmojiTag;

const StyledEmojiTagContainer = styled.div`
  display: flex;
  width: ${({ status }) => (status === "general" ? "56px" : "48px")};
  height: ${({ status }) => (status === "general" ? "31px" : "26px")};
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 50px;
  background: ${({ status }) =>
    status === "light" ? "rgba(0, 0, 0, 0.40)" : "rgba(0, 0, 0, 0.50)"};
  font-size: 12px;
  color: ${COLORS.white};
`;

const StyledEmoji = styled.div`
  width: ${({ status }) => (status === "general" ? "16px" : "12px")};
  height: ${({ status }) => (status === "general" ? "16px" : "12px")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ status }) => (status === "general" ? "16px" : "12px")};
`;

const StyledEmojiNumber = styled.span`
  font-size: ${({ status }) => (status === "general" ? "16px" : "12px")};
`;
