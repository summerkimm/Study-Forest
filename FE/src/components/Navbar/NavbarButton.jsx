import styled from "styled-components";
import { onMobile, onTablet } from "../../styles/media-queries";

function NavbarButton({ children }) {
  return <StyledNavbarButton>{children}</StyledNavbarButton>;
}

export default NavbarButton;

const StyledNavbarButton = styled.button`
  width: 252px;
  height: 57px;
  color: #fff;
  text-align: center;
  font-family: EF_jejudoldam;
  font-size: 18px;
  font-weight: 400;
  background-color: #99c08e;
  border-radius: 12px;
  flex-shrink: 0;

  ${onTablet} {
    width: 160px;
    height: 57px;
  }

  ${onMobile} {
    width: 106px;
    height: 36px;
    font-size: 12px;
  }
`;
