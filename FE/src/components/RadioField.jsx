import styled from "styled-components";
import SelectedIcon from "../assets/icons/ic_bg_selected.svg";
import COLORS from "../styles/colors";

function RadioField({
  register,
  src,
  value,
  validation,
  isSelected,
  onChange,
}) {
  return (
    <label>
      <StyledRadio
        name="background"
        type="radio"
        {...register("background", validation)}
        value={value}
        onChange={onChange}
      />

      {src ? (
        <StyledBackgroundImage>
          <img src={src} alt="배경이미지" />
          {isSelected && (
            <SelectedImage src={SelectedIcon} alt="선택된 배경이미지" />
          )}
        </StyledBackgroundImage>
      ) : (
        <StyledBackgroundDiv style={{ background: `${COLORS[value]}` }}>
          {isSelected && (
            <SelectedImage src={SelectedIcon} alt="선택된 배경이미지" />
          )}
        </StyledBackgroundDiv>
      )}
    </label>
  );
}

export default RadioField;

const StyledRadio = styled.input`
  display: none;
`;

const StyledBackgroundDiv = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
`;

const StyledBackgroundImage = styled(StyledBackgroundDiv)`
  overflow: hidden;
`;

const SelectedImage = styled.img`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
