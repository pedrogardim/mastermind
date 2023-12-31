import { getTimeDifferenceString, msToTimeString } from "../utils/time.js";
import { readRankingFromStorage, GameEntry } from "../utils/localStorage.js";

const difficulties = ["Easy", "Medium", "Hard"];

export const gameTemplate = (numOfColors: number) => `
    <h1 class="title">MasterMind</h1>
    <div id="game-rows" class="no-scrollbar">
      <div class="game-tutorial-container">
        <p>To start the game simply fill the tiles with colors and press "Check" </p>
        <img src="../assets/icons/arrow-down.svg" />
      </div>
    </div>
    <div class="bottom-container">
        <span id="error-message"></span>
        <div class="color-input-container">
            ${Array(numOfColors)
              .fill('<div class="game-color-input"></div>')
              .join("")}
            <div class="button" id="check-button">Check</div>
        </div>
        <div class="color-buttons-container">
        ${Array(numOfColors)
          .fill('<div class="color-button shadow"></div>')
          .join("")}
        </div>
    </div>
`;

export const createGameRow = (
  index: number,
  colors: string[],
  checkArray: string[],
  roundsLeft: number
) => `
    <div class="shadow game-row">
        <div class="row-counter"><span>${index}</span></div>
        <div class="row-color-indicator-wrapper">
        ${[...colors, ...Array(checkArray.length - colors.length)]
          .map(
            (color) =>
              `<div class="row-color-indicator shadow" style="background-color:${color}"></div>`
          )
          .join("")}
        </div>
        <div class="row-checker row-checker-grid-${checkArray.length}">
            ${checkArray
              .map((type) => `<div class="row-checker-dot ${type}"></div>`)
              .join("")}
        </div>
        <span class="row-rounds-left-label">Rounds left: ${roundsLeft}</span>
    </div>
`;

export const endGameMessage = (message: string, startDate: Date) => `
    <h1 class="title">MasterMind</h1>
    <h1 class="end-game-message">${message}</h1>
    <h3>Took ${getTimeDifferenceString(startDate)}s</h3>
    ${
      readRankingFromStorage().length > 0
        ? `<div class="ranking-container">
        <div></div>
        <div>User Name</div>
        <div>Difficulty</div>
        <div>Rounds</div>
        <div>Time taken</div>
        ${readRankingFromStorage()
          .map(
            ({ userName, rounds, time, difficulty }: GameEntry, i: number) =>
              `
            <div>${i + 1}</div>
            <div>${userName || "Anonymous"}</div>
            <div>${difficulties[difficulty]}</div>
            <div>${rounds}</div>
            <div>${msToTimeString(time)}s</div>
            `
          )
          .join("")}
    </div>`
        : ""
    }
    <a class="button" href="./game.html">Start again</a>
`;
