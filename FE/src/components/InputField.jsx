import styled from "styled-components";

function InputField({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  errorMessage,
  isError,
}) {
  return (
    <StyledInputContainer>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInput
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {isError && <p>{errorMessage}</p>}
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
