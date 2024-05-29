import styled from "styled-components";

function InputField({
  name,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  error,
}) {
  return (
    <StyledInputContainer>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInput
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        validation={validation}
      />
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

const StyledInputLabel = styled.label`
  color: var(--black-black_414141, #414141);
  font-size: 18px;
  font-weight: 600;
`;

const StyledInput = styled.input`
  padding: 15px 20px;
  border-radius: 15px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;

  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 400;
`;

const StyledErrorMessage = styled.p`
  color: var(--red-error_C41013, #c41013);
  font-size: 14px;
  font-weight: 400;
`;
