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
  "sky-blue": { color: "#418099", backgroundColor: "#E0F1F5", status: "light" },
  "image_1": {
    backgroundImage: `url(${Image1})`,
    status: "dark",
  },
  "image_2": {
    backgroundImage: `url(${Image2})`,
    status: "dark",
  },
  "image_3": {
    backgroundImage: `url(${Image3})`,
    status: "dark",
  },
  "image_4": {
    backgroundImage: `url(${Image4})`,
    status: "dark",
  },
};

function Card({ item }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    nickName,
    description,
    studyDays,
    topReactions,
    background,
    points,
  } = item;

  const handleClick = () => {
    navigate(`/studies/${id}`);
  };

  return (
    <StyledCardContainer $background={background} onClick={handleClick}>
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
        {topReactions?.map((reactions) => (
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
  width: 358px;
  height: 243px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px;

  background-color: ${({ $background }) =>
    COLORSCHEME[$background]?.backgroundColor || "rgba(65, 65, 65, 0.50)"};
  background-image: ${({ $background }) =>
    COLORSCHEME[$background]?.backgroundImage || "none"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${onTablet} {
    height: 243px;
  }

  ${onMobile} {
    height: 180px;
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
`;

const StyledCardTitle = styled.div`
  color: ${({ $background }) =>
    COLORSCHEME[$background]?.status === "light"
      ? `${colors.black_41}`
      : "#ffffff"};
  font-size: 18px;
  font-weight: 700;
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
`;

const StyledCardDescription = styled.p`
  color: ${({ $background }) =>
    COLORSCHEME[$background]?.status === "light"
      ? `${colors.black_41}`
      : "#ffffff"};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const StyledEmojiTagWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;
