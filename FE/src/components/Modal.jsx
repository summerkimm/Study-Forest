import styled from "styled-components";
import InputField from "./InputField";
import ModalButton from "./ModalButton";

function Modal({ nickName, name, onClick, text }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <StyledModalBackground onClick={handleBackgroundClick}>
      <StyledModalContainer>
        <StyledModalWrapper>
          <StyledModalExitText onClick={onClick}>나가기</StyledModalExitText>
          <StyledModalTitle>
            {nickName}의 {name}
          </StyledModalTitle>
          <StyledModalText>권한이 필요해요!</StyledModalText>
          <InputField
            name="passwordconfirm"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
          />
        </StyledModalWrapper>
        <ModalButton>{text}</ModalButton>
      </StyledModalContainer>
    </StyledModalBackground>
  );
}

export default Modal;

const StyledModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.div`
  width: 648px;
  height: auto;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  padding: 40px 24px;
  position: relative;
`;

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledModalTitle = styled.h1`
  color: var(--black-black_414141, #414141);
  text-align: center;
  font-size: 24px;
  font-weight: 800;
`;

const StyledModalExitText = styled.span`
  color: #578246;
  position: absolute;
  top: 46px;
  right: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const StyledModalText = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;
