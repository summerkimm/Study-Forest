import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getStudiesId, postEmojiReactions } from "../api/index";
import PlusIcon from "../assets/icons/ic_plus_light.svg";
import Button from "../components/Button";
import EmojiAddButton from "../components/EmojiAddButton";
import HabitTracker from "../components/HabitTracker";
import Modal from "../components/Modal";
import EmojiTag from "../components/Tags/EmojiTag";
import PointTag from "../components/Tags/PointTag";
import { onMobile, onTablet } from "../styles/media-queries";

function StudyDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showFocusModal, setShowFocusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [increasedEmoji, setIncreasedEmoji] = useState(null);
  const [showHiddenReactions, setshowHiddenReactions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStudiesId(id);
        setItem(response?.data);
        addToRecentStudies(id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const sendEmojiIncrease = async () => {
      if (increasedEmoji) {
        try {
          const response = await postEmojiReactions({
            id,
            emoji: increasedEmoji,
            emojiType: "increase",
          });
          console.log(response);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    };
    sendEmojiIncrease();
  }, [increasedEmoji, id]);

  const addToRecentStudies = (id) => {
    let recentStudies = JSON.parse(localStorage.getItem("recentStudies")) || [];
    recentStudies = recentStudies.filter((studyId) => studyId !== id); // 중복 제거
    recentStudies.unshift(id); // 최신 ID를 맨 앞에 추가
    if (recentStudies.length > 3) recentStudies.pop(); // 최근 3개만 저장
    localStorage.setItem("recentStudies", JSON.stringify(recentStudies));
  };

  const handleEmojiIncrease = (emojiObject) => {
    setIncreasedEmoji(emojiObject.emoji);
  };

  const handleEmojiDecrease = async (emoji, id) => {
    console.log(emoji, id);
    try {
      const response = await postEmojiReactions({
        id: id,
        emoji: emoji,
        emojiType: "decrease",
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const { name, description, nickName, points, habitTrackers, reaction } = item;
  const sortedReactions = reaction?.sort((a, b) => b.count - a.count);
  const visibleReactions = sortedReactions?.slice(0, 3);
  const hiddenReactions = sortedReactions?.slice(3);

  return (
    <>
      <StyledContainer>
        <StyledHeaderOptions>
          <StyledReactionContainer>
            {visibleReactions?.map((emoji, index) => (
              <EmojiTag
                key={index}
                reactions={emoji}
                status="general"
                onClick={() => handleEmojiDecrease(emoji.emoji, id)}
              />
            ))}
            {hiddenReactions?.length !== 0 && (
              <StyledHiddenEmojiTag
                onClick={() => setshowHiddenReactions(!showHiddenReactions)}
              >
                <img src={PlusIcon} alt="추가 이모지" />
                <StyledHiddenEmojiTagText>{`${hiddenReactions?.length}..`}</StyledHiddenEmojiTagText>
                {showHiddenReactions && (
                  <StyledHiddenReactions>
                    {hiddenReactions?.map((emoji, index) => (
                      <EmojiTag
                        key={index}
                        reactions={emoji}
                        status="general"
                        onClick={() => handleEmojiDecrease(emoji.emoji, id)}
                      />
                    ))}
                  </StyledHiddenReactions>
                )}
              </StyledHiddenEmojiTag>
            )}
            <StyledEmojiAddButton>
              <EmojiAddButton
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker && (
                <StyledEmojiPickerWrapper>
                  <EmojiPicker
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    onEmojiClick={handleEmojiIncrease}
                  />
                </StyledEmojiPickerWrapper>
              )}
            </StyledEmojiAddButton>
          </StyledReactionContainer>
          <StyledHeaderOptionsMenu>
            <StyledHeaderOptionsMenuList>공유하기</StyledHeaderOptionsMenuList>
            <StyledMenuListSpace></StyledMenuListSpace>
            <StyledHeaderOptionsMenuList onClick={() => setShowEditModal(true)}>
              수정하기
            </StyledHeaderOptionsMenuList>
            <StyledMenuListSpace></StyledMenuListSpace>
            <StyledHeaderOptionsMenuList
              onClick={() => setShowDeleteModal(true)}
            >
              스터디 삭제하기
            </StyledHeaderOptionsMenuList>
            {showDeleteModal &&
              createPortal(
                <Modal
                  onClick={() => setShowDeleteModal(false)}
                  nickName={nickName}
                  name={name}
                  text="스터디 삭제하기"
                  page="delete"
                />,
                document.getElementById("modal-root")
              )}
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

const StyledReactionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledEmojiAddButton = styled.div`
  position: relative;
`;

const StyledEmojiPickerWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 0px;
  width: 300px;
  height: 360px;

  ${onMobile} {
    left: -230px;
  }
`;

const StyledHiddenEmojiTag = styled.button`
  width: 55px;
  height: 31px;
  display: flex;
  padding: 6px 8px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
`;

const StyledHiddenEmojiTagText = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin-top: 2px;
`;

const StyledHiddenReactions = styled.div`
  display: flex;
  width: 270px;
  height: auto;
  padding: 12px;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 4px;
  border-radius: 15px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 39px;
  right: 0;
  cursor: auto;
`;
