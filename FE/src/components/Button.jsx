import styled from "styled-components";
import ArrowIcon from "../assets/icons/ic_arrow_right.svg";

function Button({ children, onClick }) {
  return (
    <StyledButtonContainer onClick={onClick}>
      <StyledButtonText>{children}</StyledButtonText>
      <StyledButtonArrowIcon src={ArrowIcon} alt="오른쪽 화살표" />
    </StyledButtonContainer>
  );
}

export default Button;

const StyledButtonContainer = styled.div`
  width: fit-content;
  /* height: 48px; */
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  gap: 4px;
  cursor: pointer;
`;

const StyledButtonText = styled.span`
  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 500;
`;

const StyledButtonArrowIcon = styled.img`
  width: 24px;
  height: 24px;
`;
