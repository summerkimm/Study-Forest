import styled from "styled-components";
import { patchHabits } from "../api/index";

function Chip({ id, isCompleted, children }) {
  const handleChipClick = async () => {
    if (!isCompleted) {
      try {
        await patchHabits(id);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <StyledChip completed={isCompleted} onClick={handleChipClick}>
      {children}
    </StyledChip>
  );
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
  background-color: ${({ completed }) => (completed ? "#99C08E" : "#EEEEEE")};
  color: ${({ completed }) => (completed ? "#FFFFFF" : "#818181")};
  cursor: pointer;
`;
