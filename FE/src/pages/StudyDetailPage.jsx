import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getStudiesId } from "../api/studies";
import Button from "../components/Button";
import EmojiAddButton from "../components/EmojiAddButton";
import HabitTracker from "../components/HabitTracker";
import Modal from "../components/Modal";
import PointTag from "../components/Tags/PointTag";

function StudyDetailPage() {
  const [item, setItem] = useState();
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showFocusModal, setShowFocusModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { id } = useParams();

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const fetchData = async () => {
    try {
      const response = await getStudiesId(id);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { name, description, nickName, points, habitTrackers } = item;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let get_local = JSON.parse(localStorage.getItem("watched")) || [];
    get_local.push(id);
    // get_local = new Set(get_local);
    get_local = [...get_local];
    localStorage.setItem("watched", JSON.stringify(get_local));
  }, [id]);

  return (
    <>
      <StyledContainer>
        <StyledEmojiField>
          <EmojiAddButton onClick={handleEmojiPicker} />
          {showEmojiPicker && (
            <EmojiPicker
              style={{ position: "absolute", top: "40px", left: 0 }}
            />
          )}
        </StyledEmojiField>
        <StyledHeader>
          <StyledTitle>
            {nickName}의 {name}
          </StyledTitle>
          <StyledButtonContainer>
            <Button onClick={() => setShowHabitModal(true)}>오늘의 습관</Button>
            <Button onClick={() => setShowFocusModal(true)}>오늘의 집중</Button>
          </StyledButtonContainer>
        </StyledHeader>
        <StyledSubTitle>소개</StyledSubTitle>
        <StyledDescription>{description}</StyledDescription>
        <StyledSubTitle>현재까지 획득한 포인트</StyledSubTitle>
        <PointTag points={points} status="general" />
        <HabitTracker habits={habitTrackers} />
      </StyledContainer>

      {showHabitModal &&
        createPortal(
          <Modal
            onClick={() => setShowHabitModal(false)}
            nickName={nickName}
            name={name}
            text="오늘의 습관으로 가기"
          />,
          document.getElementById("modal-root")
        )}
      {showFocusModal &&
        createPortal(
          <Modal
            onClick={() => setShowFocusModal(false)}
            nickName={nickName}
            name={name}
            text="오늘의 집중으로 가기"
          />,
          document.getElementById("modal-root")
        )}
    </>
  );
}
export default StudyDetailPage;

const StyledContainer = styled.div`
  width: 1200px;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: #fff;
  margin: 0 auto;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

const StyledTitle = styled.h1`
  color: #414141;
  font-size: 32px;
  font-weight: 800;
`;

const StyledSubTitle = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 400;
`;

const StyledDescription = styled.p`
  color: var(--black-black_414141, #414141);
  font-size: 18px;
  font-weight: 500;
  line-height: 26px; /* 144.444% */
`;

const StyledEmojiField = styled.div`
  position: relative;
`;
