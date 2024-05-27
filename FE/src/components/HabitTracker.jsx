import styled from "styled-components";
import Blue_100 from "../assets/icons/sticker_blue_100.svg";
import Blue_200 from "../assets/icons/sticker_blue_200.svg";
import Blue_300 from "../assets/icons/sticker_blue_300.svg";
import EMPTY from "../assets/icons/sticker_empty.svg";
import Green from "../assets/icons/sticker_green.svg";
import LightGreen_100 from "../assets/icons/sticker_light_green_100.svg";
import LightGreen_200 from "../assets/icons/sticker_light_green_200.svg";
import LightGreen_300 from "../assets/icons/sticker_light_green_300.svg";
import LightMint_100 from "../assets/icons/sticker_light_mint_100.svg";
import LightMint_200 from "../assets/icons/sticker_light_mint_200.svg";
import Pink_100 from "../assets/icons/sticker_pink_100.svg";
import Pink_200 from "../assets/icons/sticker_pink_200.svg";
import Pink_300 from "../assets/icons/sticker_pink_300.svg";
import Purple_100 from "../assets/icons/sticker_purple_100.svg";
import Purple_200 from "../assets/icons/sticker_purple_200.svg";
import Purple_300 from "../assets/icons/sticker_purple_300.svg";
import Yellow_100 from "../assets/icons/sticker_yellow_100.svg";
import Yellow_200 from "../assets/icons/sticker_yellow_200.svg";
import Yellow_300 from "../assets/icons/sticker_yellow_300.svg";

const STICKERS = [
  LightGreen_100,
  LightGreen_200,
  LightGreen_300,
  LightMint_100,
  LightMint_200,
  Green,
  Blue_100,
  Blue_200,
  Blue_300,
  Purple_100,
  Purple_200,
  Purple_300,
  Yellow_100,
  Yellow_200,
  Yellow_300,
  Pink_100,
  Pink_200,
  Pink_300,
];

const DAYS = {
  월: "Mon",
  화: "Tue",
  수: "Wed",
  목: "Thu",
  금: "Fri",
  토: "Sat",
  일: "Sun",
};

function HabitTracker({ habits }) {
  const DaysInKorean = Object.keys(DAYS);

  return (
    <StyledHabitTrackerContainer>
      <StyledHabitTrackerHeader>습관 기록표</StyledHabitTrackerHeader>
      <StyledHabitTrackerWrapper>
        <thead>
          <tr>
            <StyledDayPin></StyledDayPin>
            {DaysInKorean.map((day) => (
              <StyledDay key={day}>{day}</StyledDay>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => (
            <tr key={habit.name}>
              <StyledHabitName>{habit.name}</StyledHabitName>
              {DaysInKorean.map((day) => (
                <StyledHabitStickers key={day}>
                  {habit.isCompleted.includes(DAYS[day]) ? (
                    <img
                      src={STICKERS[index % STICKERS.length]}
                      alt="습관 완료"
                    />
                  ) : (
                    <img src={EMPTY} alt="습관 미완료" />
                  )}
                </StyledHabitStickers>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledHabitTrackerWrapper>
    </StyledHabitTrackerContainer>
  );
}

export default HabitTracker;

const StyledHabitTrackerContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  box-sizing: border-box;
`;

const StyledHabitTrackerHeader = styled.h2`
  color: var(--black-black_414141, #414141);
  font-size: 24px;
  font-weight: 800;
`;

const StyledHabitTrackerWrapper = styled.table`
  width: 100%;
  height: auto;
`;

const StyledDay = styled.th`
  color: var(--gray-gray_818181, #818181);
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 26px; /* 144.444% */
`;

const StyledHabitName = styled.td`
  width: 246px;
  height: 64px;
  padding: 0px 24px;
  box-sizing: border-box;
  text-align: right;
  vertical-align: middle;
  color: var(--black-black_414141, #414141);
  font-size: 18px;
  font-weight: 700;
`;

const StyledDayPin = styled.th`
  width: 246px;
`;

const StyledHabitStickers = styled.td`
  text-align: center;
  vertical-align: middle;
`;
