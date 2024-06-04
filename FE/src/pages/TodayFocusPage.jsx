import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getStudiesId } from "../api";
import CommonLayout from "../components/CommonLayout";
import PointTag from "../components/Tags/PointTag";
import Timer from "../components/Timer";
import { onTablet } from "../styles/media-queries";

function TodayFocusPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [points, setpoints] = useState(0);

  const fetchData = async () => {
    const response = await getStudiesId(id);
    const data = response?.data;
    setItem(data);
    setpoints(data?.points);
  };

  const updatePoints = (newPoints) => {
    setpoints((prevPoints) => prevPoints + newPoints);
  };
  
  const { name, nickName } = item;
  const TITLE = `${nickName}의 ${name}`;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CommonLayout title={TITLE} leftBtn="오늘의 습관">
      <StyledLayoutSubtitle>현재까지 획득한 포인트</StyledLayoutSubtitle>
      <PointTag status="general" points={points} />
      <StyledLayoutWrapper>
        <StyledTodayFocusTitle>오늘의 집중</StyledTodayFocusTitle>
        <Timer id={id} updatePoints={updatePoints} />
      </StyledLayoutWrapper>
    </CommonLayout>
  );
}

export default TodayFocusPage;

const StyledTodayFocusTitle = styled.h1`
  color: var(--black-black_414141, #414141);
  font-size: 24px;
  font-weight: 800;
`;

const StyledLayoutSubtitle = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
  margin-top: 16px;
`;

const StyledLayoutWrapper = styled.div`
  display: flex;
  height: auto;
  padding: 40px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  margin-top: 24px;

  ${onTablet} {
    margin-top: 40px;
  }
`;
