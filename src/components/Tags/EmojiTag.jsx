import styled from "styled-components";
import colors from "../../styles/colors";

function EmojiTag({ status = "dark" }) {
  return (
    <EmojiTagContainer status={status}>
      <EmojiTagWrapper>
        <div>👩🏻‍💻</div>
        <EmojiTagNumber>26</EmojiTagNumber>
      </EmojiTagWrapper>
    </EmojiTagContainer>
  );
}

export default EmojiTag;

const EmojiTagContainer = styled.div`
  display: flex;
  width: fit-content;
  padding: 6px 8px;
  align-items: center;
  gap: 5px;
  border-radius: 50px;
  background: ${({ status }) =>
    status === "dark" ? "rgba(0, 0, 0, 0.50)" : "rgba(0, 0, 0, 0.40)"};
`;

const EmojiTagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const EmojiTagNumber = styled.div`
  color: ${colors.white};
  font-size: 12px;
  font-weight: 400;
`;
