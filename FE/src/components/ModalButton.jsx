import styled from "styled-components";

function ModalButton({ children }) {
  return <StyledModalButtonContainer>{children}</StyledModalButtonContainer>;
}

export default ModalButton;

const StyledModalButtonContainer = styled.div`
  width: 100%;
  height: 58px;
  background: #99c08e;
  margin-top: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  color: #fff;
  text-align: center;
  font-family: EF_jejudoldam;
  font-size: 18px;
  font-weight: 400;

  cursor: pointer;
`;
