import styled from "styled-components";
import PointIcon from "../../assets/icons/icon-point.svg";
import COLORS from "../../styles/colors";

function PointTag({ points, status }) {
  return (
    <StyledPointTagContainer status={status}>
      <StyledPointTagWrapper src={PointIcon} alt="획득 포인트 아이콘" />
      <span>{points}P 획득</span>
    </StyledPointTagContainer>
  );
}
export default PointTag;

const StyledPointTagContainer = styled.div`
  width: ${({ status }) => (status === "general" ? "116px" : "86px")};
  height: auto;
  padding: ${({ status }) => (status === "general" ? "8px 12px" : "4px 8px")};
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ status }) =>
    status === "dark" ? "rgba(0, 0, 0, 0.50)" : "rgba(255, 255, 255, 0.30)"};
  color: ${({ status }) =>
    status === "dark" ? `${COLORS.white}` : `${COLORS.black_41}`};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${({ status }) => (status === "general" ? "16px" : "12px")};
  font-weight: 500;
`;

const StyledPointTagWrapper = styled.img`
  width: ${({ status }) => (status === "general" ? "19px" : "14px")};
  height: ${({ status }) => (status === "general" ? "19px" : "14px")}
`;
