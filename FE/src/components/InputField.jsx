import styled from "styled-components";
import EyeOffBtn from "../assets/icons/btn_visibility_off.svg";
import EyeOnBtn from "../assets/icons/btn_visibility_on.svg";
import { onMobile } from "../styles/media-queries";

function InputField({
  name,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  handleEyeButton,
  showPassword,
}) {
  return (
    <StyledInputContainer>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInputWrapper>
        <StyledInput
          type={type === 'password' && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name, validation)}
          className={error ? "error" : ""}
        />
        {type === 'password' && <StyledEyeButton type="button" onClick={handleEyeButton}>
          <img
            src={showPassword ? EyeOnBtn : EyeOffBtn}
            alt={showPassword ? "비밀번호 보이기" : "비밀번호 가리기"}
          />
        </StyledEyeButton>}
      </StyledInputWrapper>
      {error && <StyledErrorMessage>{error.message}</StyledErrorMessage>}
    </StyledInputContainer>
  );
}

export default InputField;

const StyledInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledInputLabel = styled.label`
  color: var(--black-black_414141, #414141);
  font-size: 18px;
  font-weight: 600;

  ${onMobile} {
    font-size: 16px;
  }
`;

const StyledInput = styled.input`
  padding: 15px 20px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 400;

  &.error {
    border: 1px solid var(--red-error_C41013, #c41013);
  }

  ${onMobile} {
    font-size: 14px;
  }
`;

const StyledErrorMessage = styled.p`
  color: var(--red-error_C41013, #c41013);
  font-size: 14px;
  font-weight: 400;
  margin-top: -8px;
`;

const StyledEyeButton = styled.div`

  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-50%, 50%);
  cursor: pointer;
`;
