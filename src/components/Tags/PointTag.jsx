import styled from "styled-components";
import PointIcon from "../../assets/icons/icon-point.svg";
import COLORS from "../../styles/colors";

function PointTag({ points, status = "dark" }) {
  return (
    <StyledTagContainer status={status}>
      <StyledTagWrapper>
        <img src={PointIcon} alt="획득 포인트 아이콘" />
        <StyledTagPoint>310P 획득</StyledTagPoint>
      </StyledTagWrapper>
    </StyledTagContainer>
  );
}
export default PointTag;

const StyledTagContainer = styled.div`
  width: fit-content;
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ status }) =>
    status === "dark" ? "rgba(0, 0, 0, 0.50)" : "rgba(255, 255, 255, 0.30)"};
  color: ${({ status }) =>
    status === "dark" ? `${COLORS.white}` : `${COLORS.black_41}`};
`;

const StyledTagWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const StyledTagPoint = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
