import styled from "styled-components";

function MainButton({ children, type }) {
  return <StyledMainButton>{children}</StyledMainButton>;
}

export default MainButton;

const StyledMainButton = styled.button`
  width: 600px;
  height: 58px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: EF_jejudoldam;
  font-size: 18px;
  font-weight: 400;
  border-radius: 12px;
  cursor: pointer;
`;
