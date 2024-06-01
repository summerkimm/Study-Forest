import styled from "styled-components";
import COLORS from "../styles/colors";

function Chip({ isActive = true, children }) {
  return <StyledChip isActive={isActive}>{children}</StyledChip>;
}

export default Chip;

const StyledChip = styled.div`
  display: flex;
  width: 100%;
  height: 54px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  background: ${({ isActive }) => (isActive ? COLORS.brand : COLORS.gray_EE)};
  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.gray_81)};
`;
