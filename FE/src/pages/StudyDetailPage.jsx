import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getStudiesId } from "../api/index";
import Button from "../components/Button";
import EmojiAddButton from "../components/EmojiAddButton";
import HabitTracker from "../components/HabitTracker";
import Modal from "../components/Modal";
import PointTag from "../components/Tags/PointTag";
import { onMobile, onTablet } from "../styles/media-queries";

function StudyDetailPage() {
  const [item, setItem] = useState({});
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showFocusModal, setShowFocusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { id } = useParams();

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const fetchData = async () => {
    const response = await getStudiesId(id);
    setItem(response?.data);
  };

  const { name, description, nickName, points, habitTrackers } = item;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let get_local = JSON.parse(localStorage.getItem("watched")) || [];
    get_local.push(id);
    get_local = new Set(get_local);
    get_local = [...get_local];
    localStorage.setItem("watched", JSON.stringify(get_local));
  }, [id]);

  return (
    <>
      <StyledContainer>
        <StyledHeaderOptions>
          <StyledEmojiField>
            <EmojiAddButton onClick={handleEmojiPicker} />
            {showEmojiPicker && (
              <EmojiPicker
                style={{
                  position: "absolute",
                  top: "40px",
                  left: 0,
                }}
              />
            )}
          </StyledEmojiField>
          <StyledHeaderOptionsMenu>
            <StyledHeaderOptionsMenuList>공유하기</StyledHeaderOptionsMenuList>
            <StyledMenuListSpace></StyledMenuListSpace>
            <StyledHeaderOptionsMenuList onClick={() => setShowEditModal(true)}>
              수정하기
            </StyledHeaderOptionsMenuList>
            <StyledMenuListSpace></StyledMenuListSpace>
            <StyledHeaderOptionsMenuList>
              스터디 삭제하기
            </StyledHeaderOptionsMenuList>
          </StyledHeaderOptionsMenu>
        </StyledHeaderOptions>
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

      {showEditModal &&
        createPortal(
          <Modal
            onClick={() => setShowEditModal(false)}
            nickName={nickName}
            name={name}
            text="수정하러 가기"
            page="edit"
          />,
          document.getElementById("modal-root")
        )}
      {showHabitModal &&
        createPortal(
          <Modal
            onClick={() => setShowHabitModal(false)}
            nickName={nickName}
            name={name}
            text="오늘의 습관으로 가기"
            page="habit"
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
            page="focus"
          />,
          document.getElementById("modal-root")
        )}
    </>
  );
}
export default StudyDetailPage;

const StyledContainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px;
  background: #fff;
  margin: 0 auto;

  ${onTablet} {
    width: 696px;
    padding: 24px;
  }

  ${onMobile} {
    width: 344px;
    padding: 16px;
  }
`;

const StyledHeaderOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${onMobile} {
    flex-direction: column-reverse;
    gap: 8px;
    align-items: flex-end;
  }
`;

const StyledHeaderOptionsMenu = styled.ul`
  display: flex;
  gap: 16px;
  align-items: center;

  ${onMobile} {
    gap: 8px;
  }
`;

const StyledHeaderOptionsMenuList = styled.li`
  color: var(--green-green_text_578246, #578246);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:last-child {
    color: var(--gray-gray_818181, #818181);
  }

  ${onMobile} {
    font-size: 12px;
  }
`;

const StyledMenuListSpace = styled.span`
  width: 1.5px;
  height: 16px;
  background-color: #578246;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;

  ${onMobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;

  ${onMobile} {
    gap: 8px;
  }
`;

const StyledTitle = styled.h1`
  color: #414141;
  font-size: 32px;
  font-weight: 800;

  ${onMobile} {
    font-size: 24px;
  }
`;

const StyledSubTitle = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 8px;

  ${onMobile} {
    font-size: 16px;
  }
`;

const StyledDescription = styled.p`
  color: var(--black-black_414141, #414141);
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;

  ${onMobile} {
    font-size: 14px;
  }
`;

const StyledEmojiField = styled.div`
  position: relative;
`;
