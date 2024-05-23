import styled from "styled-components";
import PointIcon from "../assets/icons/icon-point.svg";
import colors from '../styles/colors';

function Tag() {
  return (
    <StyledTagContainer>
      <StyledTagWrapper>
        <img src={PointIcon} alt="획득 포인트 아이콘" />
        <StyledTagPoint>310P 획득</StyledTagPoint>
      </StyledTagWrapper>
    </StyledTagContainer>
  );
}
export default Tag;

const StyledTagContainer = styled.div`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.3);
`;

const StyledTagWrapper = styled.div`
  display: flex;
  gap: 4px;
`;


const StyledTagPoint = styled.div`
  color: ${colors};
  font-size: 16px;
  font-weight: 500;
`;
