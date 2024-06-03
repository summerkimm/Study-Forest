import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { patchHabits } from "../api/habits";
import COLORS from "../styles/colors";

function Chip({ isActive, children }) {
  // const { id } = useParams();
  const [active, setActive] = useState(isActive);

  // const fetchData = async (id) => {
  //   const response = await patchHabits(id);
  //   console.log(response);
  // };

  // const handleHabitCompletedClick = () => {
  //   fetchData(id);
  //   setActive(true);
  // };

  // useEffect(() => {
  //   handleHabitCompletedClick();
  // }, []);

  return (
    <StyledChip $active={active}>
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
  background: ${({ isActive }) => (isActive ? COLORS.brand : COLORS.gray_EE)};
  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.gray_81)};
  cursor: pointer;
`;
