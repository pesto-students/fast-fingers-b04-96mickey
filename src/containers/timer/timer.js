import React from 'react';
import './timer.css';
import { gameStatus } from '../../helper';

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 2;
const ALERT_THRESHOLD = 1;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let timePassed = 0;
let timeLeft = 0;
let timerInterval = null;
// let remainingPathColor = COLOR_CODES.info.color;

export const Timer = React.memo((props) => {
    startTimer(props.time, props.successTimeForOngoingWord, props.failure, props.status);
    timeLeft = props.time;
    return (
        <div id="timer">
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className='base-timer__path-remaining green'
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">{formatTime(
                    timeLeft
                )}</span>
                </div>
        </div>
    );
});

function onTimesUp(failure) {
  clearInterval(timerInterval);
  timePassed = 0;
  // trigger end event to show failure
  failure && failure();
}

function startTimer(time, successTimeForOngoingWord, failure, status) {
  if(status === gameStatus.end) {
    onTimesUp();
    return;
  }
  if(time === 0) {
    successTimeForOngoingWord(timePassed);
    onTimesUp();
    return;
  }

  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = time - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray(time);
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp(failure);
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction(time) {
  const rawTimeFraction = timeLeft / time;
  return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
}

function setCircleDasharray(time) {
  const circleDasharray = `${(
    calculateTimeFraction(time) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
