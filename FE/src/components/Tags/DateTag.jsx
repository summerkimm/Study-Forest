import styled from "styled-components";

function DateTag({ children }) {
  return <StyledDateTagContainer>{children}</StyledDateTagContainer>;
}

export default DateTag;

const StyledDateTagContainer = styled.div`
  display: flex;
  width: fit-content;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: var(--black-black_414141, #414141);
  font-size: 16px;
  font-weight: 500;

  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.3);
`;
