import { useState } from "react";
import styled from "styled-components";
import { postStudiesHabit } from "../api/studies";
import AddIcon from "../assets/icons/ic_plus.svg";
import DeleteIcon from "../assets/icons/ic_trash.svg";
import { onMobile } from "../styles/media-queries";

function HabitEditModal({ id, onClick, habits }) {
  const [inputs, setInputs] = useState([]);

  const handleBackgroundClick = (e) => {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  const handleAddHabit = () => {
    setInputs([...inputs, { id: inputs.length + 1 + habits.length, name: "" }]);
  };

  const handleHabitInputChange = (inputId, event) => {
    const newInputs = inputs.map((input) =>
      input.id === inputId ? { ...input, name: event.target.value } : input
    );
    setInputs(newInputs);
  };

  const handleInputBlur = async (inputId) => {
    const input = inputs.find((input) => input.id === inputId);
    console.log(id);
    console.log(input.name);
    if (input.name.trim()) {
      try {
        const response = await postStudiesHabit({ id, name: input.name });
        console.log("Post response:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  const handleInputKeyPress = async (inputId, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleInputBlur(inputId);
    }
  };

  return (
    <StyledModalBackground onClick={handleBackgroundClick}>
      <StyledModalContainer>
        <StyledModalTitle>습관 목록</StyledModalTitle>
        <StyledHabitListContainer>
          {habits?.map((habit) => (
            <StyledHabitContainer key={habit.id}>
              <StyledHabit>{habit.name}</StyledHabit>
              <StyledHabitDeleteIcon>
                <img src={DeleteIcon} alt="습관 삭제하기" />
              </StyledHabitDeleteIcon>
            </StyledHabitContainer>
          ))}
          {inputs.map((input) => (
            <StyledHabitContainer>
              <StyledHabitInput
                key={input.id}
                type="text"
                value={input.name}
                onChange={(e) => handleHabitInputChange(input.id, e)}
                onBlur={() => handleInputBlur(input.id)}
                onKeyDown={(e) => handleInputKeyPress(input.id, e)}
              />
              <StyledHabitDeleteIcon>
                <img src={DeleteIcon} alt="습관 삭제하기" />
              </StyledHabitDeleteIcon>
            </StyledHabitContainer>
          ))}
          <StyledAddHabitButton onClick={handleAddHabit}>
            <img src={AddIcon} alt="습관 추가하기" />
          </StyledAddHabitButton>
        </StyledHabitListContainer>

        <button onClick={() => onClick()}>수정 완료</button>
      </StyledModalContainer>
    </StyledModalBackground>
  );
}

export default HabitEditModal;

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

const StyledModalContainer = styled.form`
  width: 648px;
  height: auto;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${onMobile} {
    width: 344px;
    padding: 16px;
  }
`;

const StyledModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;

  ${onMobile} {
    font-size: 20px;
  }
`;

const StyledHabitListContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${onMobile} {
    gap: 8px;
  }
`;

const StyledHabitContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledHabit = styled.div`
  width: 400px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: var(--gray-gray_EEEEEE, #eee);
  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 700;
  text-decoration-line: underline;
  flex-shrink: 0;

  ${onMobile} {
    width: 256px;
    font-size: 14px;
  }
`;

const StyledHabitInput = styled.input`
  width: 400px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  text-align: center;
  background: var(--gray-gray_EEEEEE, #eee);
  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 700;
  text-decoration-line: underline;
  flex-shrink: 0;

  ${onMobile} {
    width: 256px;
    font-size: 14px;
  }
`;

const StyledHabitDeleteIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 35px;
  background: var(--pink-pink_FDE0E9, #fde0e9);
  cursor: pointer;
`;

const StyledAddHabitButton = styled.button`
  display: flex;
  width: 400px;
  height: 54px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  border: 2px solid var(--black-black_414141, #414141);

  ${onMobile} {
    width: 312px;
  }
`;
