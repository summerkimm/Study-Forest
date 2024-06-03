import { useState } from "react";
import styled from "styled-components";
import ArrowToggleIcon from "../assets/icons/icon_toggle.svg";

const DropdownList = [
  { label: "많은 포인트 순", value: "highPoint" },
  { label: "적은 포인트 순", value: "lowPoint" },
  { label: "최근 순", value: "latest" },
  { label: "오래된 순", value: "oldest" },
];

function DropDown({ handleChangeView }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClick = (val) => {
    handleChangeView(val);
  };

  return (
    <StyledDropdownContainer>
      <StyledDropdownHeader onClick={handleDropdown}>
        포인트 순
        {isOpen ? (
          <img
            src={ArrowToggleIcon}
            alt="드롭다운이 열려있음을 나타내는 아이콘"
            style={{ rotate: "180deg" }}
          />
        ) : (
          <img
            src={ArrowToggleIcon}
            alt="드롭다운이 닫혀있음을 나타내는 아이콘"
          />
        )}
      </StyledDropdownHeader>
      {isOpen && (
        <StyledDropdownList>
          {DropdownList.map((item, idx) => (
            <StyledDropdownItem
              key={idx}
              onClick={() => handleDropdownClick(item.value)}
            >
              {item.label}
            </StyledDropdownItem>
          ))}
        </StyledDropdownList>
      )}
    </StyledDropdownContainer>
  );
}

export default DropDown;

const StyledDropdownContainer = styled.div`
  width: 150px;
  position: relative;
  cursor: pointer;
`;

const StyledDropdownHeader = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  padding: 9px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  color: #818181;
  font-size: 16px;
  font-weight: 400;
`;

const StyledDropdownList = styled.div`
  border: 1px solid #ddd;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #fff;
  overflow: hidden;
`;

const StyledDropdownItem = styled.button`
  width: 100%;
  height: 42px;
  padding: 9px 20px;
  color: #818181;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9f9f9;
  }
`;
