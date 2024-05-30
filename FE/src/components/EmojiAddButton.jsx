import styled from "styled-components";
import EmojiAddImage from "../assets/icons/ic_smile.svg";

function EmojiAddButton({ onClick }) {
  return (
    <EmojiAddButtonContainer onClick={onClick}>
      <img src={EmojiAddImage} alt="이모지 추가하기" />
      추가
    </EmojiAddButtonContainer>
  );
}

export default EmojiAddButton;

const EmojiAddButtonContainer = styled.div`
  display: flex;
  width: fit-content;
  padding: 6px 8px;
  align-items: flex-start;
  gap: 5px;
  color: var(--black-black_414141, #414141);
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
`;
