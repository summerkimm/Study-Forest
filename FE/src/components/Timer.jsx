import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayIcon from "../assets/icons/ic_play.svg";
import PauseIcon from "../assets/icons/icon_pause.svg";
import ResetIcon from "../assets/icons/icon_reset.svg";
import { onMobile, onTablet } from "../styles/media-queries";

function Timer() {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    if (timerOn) {
      const timer = setTimeout(() => {
        if (seconds === "00") {
          if (minutes === "00") {
            clearTimeout(timer);
            setTimerOn(false);
          } else {
            setMinutes((prevMinutes) => {
              const newMinutes = parseInt(prevMinutes, 10) - 1;
              return newMinutes.toString().padStart(2, "0");
            });
            setSeconds("59");
          }
        } else {
          setSeconds((prevSeconds) => {
            const newSeconds = parseInt(prevSeconds, 10) - 1;
            return newSeconds.toString().padStart(2, "0");
          });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds, minutes, timerOn]);

  const startTimer = () => {
    if (minutes === "00" && seconds === "00") return;
    setTimerOn(true);
  };

  const pauseTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setTimerOn(false);
    setMinutes("00");
    setSeconds("00");
  };

  return (
    <StyledTimerContainer>
      <TimeInputContainer>
        <TimeInput
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          disabled={timerOn}
        />
        <TimeInputSpan>:</TimeInputSpan>
        <TimeInput
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          disabled={timerOn}
        />
      </TimeInputContainer>
      <StyledTimeButtonContainer>
        {timerOn && (
          <StyledPauseButton
            onClick={pauseTimer}
            disabled={!timerOn}
            $timerOn={timerOn}
          >
            <StyledPauseImg src={PauseIcon} alt="타이머 일시정지" />
          </StyledPauseButton>
        )}
        <StyledStartButton>
          <img src={PlayIcon} alt="타이머 시작" />
          <StyledStartButtonText onClick={startTimer}>
            Start!
          </StyledStartButtonText>
        </StyledStartButton>
        {timerOn && (
          <StyledResetButton $timerOn={timerOn} onClick={resetTimer}>
            <StyledResetImg src={ResetIcon} alt="타이머 리셋" />
          </StyledResetButton>
        )}
      </StyledTimeButtonContainer>
    </StyledTimerContainer>
  );
}

export default Timer;

const StyledTimerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 94px;

  ${onTablet} {
    gap: 100px;
  }

  ${onMobile} {
    gap: 64px;
  }
`;

const TimeInputContainer = styled.div`
  width: fit-content;
  height: auto;
  display: flex;
  align-items: center;
`;

const TimeInputSpan = styled.span`
  font-weight: 800;
  font-size: 150px;
  color: var(--black-black_414141, #414141);

  ${onTablet} {
    font-size: 120px;
  }

  ${onMobile} {
    font-size: 80px;
  }
`;

const TimeInput = styled.input`
  width: 200px;
  height: auto;
  font-size: 150px;
  text-align: center;
  color: var(--black-black_414141, #414141);
  font-weight: 800;
  background-color: transparent;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  ${onTablet} {
    width: 160px;
    font-size: 120px;
  }

  ${onMobile} {
    width: 110px;
    font-size: 80px;
  }
`;

const StyledTimeButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const StyledStartButton = styled.button`
  width: 333px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #99c08e;
  display: flex;
  justify-content: center;
  align-items: center;

  ${onMobile} {
    width: 140px;
    height: 48px;
  }
`;

const StyledStartButtonText = styled.span`
  color: #fff;
  font-size: 28px;
  font-weight: 800;
  margin-top: 3px;

  ${onMobile} {
    font-size: 18px;
  }
`;

const StyledPauseButton = styled.div`
  width: 64px;
  height: 64px;
  background-color: #578246;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${onMobile} {
    width: 48px;
    height: 48px;
  }
`;

const StyledPauseImg = styled.img`
  ${onMobile} {
    width: 26px;
    height: 26px;
  }
`;

const StyledResetButton = styled.div`
  width: 64px;
  height: 64px;
  background-color: #99c08e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${onMobile} {
    width: 48px;
    height: 48px;
  }
`;

const StyledResetImg = styled.img`
  ${onMobile} {
    width: 26px;
    height: 26px;
  }
`;
