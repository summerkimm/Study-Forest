import { useState } from "react";
import styled from "styled-components";
import ArrowToggleIcon from "../assets/icons/icon_toggle.svg";

const DropdownList = [
  { label: "최근 순", value: "newest" },
  { label: "오래된 순", value: "oldest" },
  { label: "많은 포인트 순", value: "highPoint" },
  { label: "적은 포인트 순", value: "lowPoint" },
];

function DropDown({ handleChangeView }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = (val, e) => {
    e.stopPropagation();
    handleChangeView(val);
  };

  return (
    <StyledDropdownContainer onClick={() => setIsOpen(!isOpen)}>
      <StyledDropdownHeader>
        최근 순
        {isOpen ? (
          <img
            src={ArrowToggleIcon}
            alt="드롭다운 열기"
            style={{ rotate: "180deg" }}
          />
        ) : (
          <img src={ArrowToggleIcon} alt="드롭다운 닫기" />
        )}
      </StyledDropdownHeader>
      {isOpen && (
        <StyledDropdownList>
          {DropdownList.map((item, idx) => (
            <StyledDropdownItem
              key={idx}
              onClick={(e) => handleDropdownClick(item.value, e)}
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
