import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Image1 from "../assets/images/image-card1.png";
import Image2 from "../assets/images/image-card2.png";
import Image3 from "../assets/images/image-card3.png";
import Image4 from "../assets/images/image-card4.png";
import colors from "../styles/colors";
import { onMobile, onTablet } from "../styles/media-queries";
import EmojiTag from "./Tags/EmojiTag";
import PointTag from "./Tags/PointTag";

const COLORSCHEME = {
  green: { color: "#578246", backgroundColor: "#e1edde", status: "light" },
  yellow: { color: "#c18e1b", backgroundColor: "#fff1cc", status: "light" },
  pink: { color: "#bc3c6a", backgroundColor: "#fde0e9", status: "light" },
  "sky_blue": { color: "#418099", backgroundColor: "#E0F1F5", status: "light" },
  image_1: {
    backgroundImage: `url(${Image1})`,
    status: "dark",
  },
  image_2: {
    backgroundImage: `url(${Image2})`,
    status: "dark",
  },
  image_3: {
    backgroundImage: `url(${Image3})`,
    status: "dark",
  },
  image_4: {
    backgroundImage: `url(${Image4})`,
    status: "dark",
  },
};

function Card({ item, type = "default" }) {
  const navigate = useNavigate();
  
  const {
    id,
    name,
    nickName,
    description,
    studyDays,
    reactions,
    background,
    points,
  } = item;

  const handleClick = () => {
    navigate(`/studies/${id}`);
  };

  return (
    <StyledCardContainer
      $background={background}
      onClick={handleClick}
      $type={type}
    >
      <StyledCardHeader>
        <StyledCardTitleWrapper>
          <StyledCardTitle $background={background}>
            <StyledCardNickname $background={background}>
              {nickName}{" "}
            </StyledCardNickname>
            의 {name}
          </StyledCardTitle>
          <PointTag points={points} status={COLORSCHEME[background]?.status} />
        </StyledCardTitleWrapper>
        <StyledProgressDay $background={background}>
          <span>{studyDays}</span>일 째 진행 중
        </StyledProgressDay>
      </StyledCardHeader>
      <StyledCardDescription $background={background}>
        {description}
      </StyledCardDescription>
      <StyledEmojiTagWrapper>
        {reactions?.map((reactions) => (
          <EmojiTag
            key={reactions.id}
            reactions={reactions}
            status={COLORSCHEME[background]?.status}
          />
        ))}
      </StyledEmojiTagWrapper>
    </StyledCardContainer>
  );
}

export default Card;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 358px;
  height: 243px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px;
  flex-shrink: 0;
  cursor: pointer;

  background-color: ${({ $background }) =>
    $background && COLORSCHEME[$background]?.backgroundColor};
  background-image: ${({ $background }) =>
    $background &&
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),${COLORSCHEME[$background]?.backgroundImage}`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${onTablet} {
    width: ${({ $type }) => ($type === "feed" ? "312px" : "358px")};
    height: ${({ $type }) => ($type === "feed" ? "243px" : "243px")};
  }

  ${onMobile} {
    width: ${({ $type }) => ($type === "feed" ? "312px" : "240px")};
    height: ${({ $type }) => ($type === "feed" ? "180px" : "180px")};
    padding: 16px;
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const StyledCardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 6px;

  ${onMobile} {
    flex-direction: column-reverse;
    align-items: start;
  }
`;

const StyledCardTitle = styled.div`
  color: ${({ $background }) =>
    COLORSCHEME[$background]?.status === "light"
      ? `${colors.black_41}`
      : "#ffffff"};
  font-size: 18px;
  font-weight: 700;

  ${onMobile} {
    font-size: 16px;
  }
`;

const StyledCardNickname = styled.span`
  color: ${({ $background }) => COLORSCHEME[$background]?.color || "#ffffff"};
`;

const StyledProgressDay = styled.p`
  color: ${({ $background }) =>
    COLORSCHEME[$background]?.status === "light"
      ? `${colors.gray_81}`
      : "#eeeeee"};
  font-size: 14px;
  font-weight: 400;

  ${onMobile} {
    font-size: 12px;
  }
`;

const StyledCardDescription = styled.p`
  color: ${({ $background }) =>
    COLORSCHEME[$background]?.status === "light"
      ? `${colors.black_41}`
      : "#ffffff"};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  ${onMobile} {
    font-size: 14px;
  }
`;

const StyledEmojiTagWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;
