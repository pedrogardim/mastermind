import {
  gameTemplate,
  createGameRow,
  endGameMessage,
} from "../templates/game.js";

import confetti from "https://cdn.skypack.dev/canvas-confetti";

import { pushToStorage } from "../utils/localStorage.js";
import { difficultyOptions } from "../utils/gameUtils.js";

export class GameController {
  userName;
  difficulty;
  targetColors;
  selectedColors = [];
  selectedColorInput = 0;
  round = 1;
  errorMessage = "";
  numOfColors = 4;
  maxRounds = 10;
  startTime;
  constructor() {
    // this.init();
  }
  init({ userName, difficulty, colors }) {
    const difficultyInfo = Object.values(difficultyOptions)[difficulty];

    this.gameEnded = false;
    this.round = 1;
    this.userName = userName;
    this.difficulty = difficulty;
    this.numOfColors = difficultyInfo.colors;
    this.maxRounds = difficultyInfo.checks;
    this.colors = colors.slice(0, difficultyInfo.colors);

    this.app = document.getElementById("app");
    this.app.innerHTML = gameTemplate(difficultyInfo.colors);

    this.initSelectors();

    this.targetColors = colors.map(
      () => colors[Math.floor(Math.random() * colors.length)]
    );

    this.colorButtons.forEach(
      (el, i) => (el.style.backgroundColor = this.colors[i])
    );

    this.initEvents();
    this.update();
  }
  initSelectors() {
    this.gameRows = document.getElementById("game-rows");
    this.colorButtons = document.querySelectorAll(".color-button");
    this.colorInputs = document.querySelectorAll(".game-color-input");
    this.checkButton = document.getElementById("check-button");
    this.errorMessageSpan = document.getElementById("error-message");
  }
  initEvents() {
    this.colorButtons.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.selectedColors[this.selectedColorInput] = this.colors[i];
        this.selectedColorInput++;
        this.selectedColorInput %= this.numOfColors;
        this.update();
      });
    });
    this.colorInputs.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.selectedColorInput = i;
        this.update();
      });
    });
    this.checkButton.addEventListener("click", this.onCheck.bind(this));
  }
  onCheck() {
    if (this.round === 1) {
      this.startTime = new Date();
      this.gameRows.innerHTML = "";
    }
    if (this.selectedColors.length < this.numOfColors) {
      this.errorMessage = "You have some empty colors";
      this.update();
      return;
    } else {
      this.errorMessage = "";
      this.update();
    }
    let correctPos = [];
    let correctColors = [];
    this.selectedColors.forEach((color, index) => {
      correctPos[index] = color === this.targetColors[index];
      correctColors[index] = this.targetColors.includes(color);
    });

    let checkArray = correctPos.map((e, i) =>
      e ? "hasPosition" : correctColors[i] ? "hasColor" : ""
    );

    if (this.gameEnded) return;

    const row = document.createElement("div");
    row.innerHTML = createGameRow(this.round, this.selectedColors, checkArray);
    this.gameRows.append(row);
    this.gameRows.scrollTo({ top: 9999 });

    if (correctPos.every((e) => e)) {
      this.onWin();
      this.gameEnded = true;
      return;
    }

    if (this.round >= this.maxRounds) {
      this.onLose();
      this.gameEnded = true;
      return;
    }

    this.round++;
    // this.selectedColors = [];
    this.selectedColorInput = 0;
    this.update();
  }
  onWin() {
    pushToStorage({
      userName: this.userName,
      rounds: this.round,
      time: new Date() - this.startTime,
      difficulty: this.difficulty,
    });
    this.app.innerHTML = endGameMessage("You win!", this.startTime);
    for (let i = 0; i < 8; i++) {
      setTimeout(() => confetti(), i * 200);
    }
  }
  onLose() {
    this.gameRows.style.opacity = 0;
    this.gameRows.style.transform = "translateY(2em) scale(0.9)";

    setTimeout(() => {
      this.app.innerHTML = endGameMessage("You lose!", this.startTime);
    }, 1000);
  }
  update() {
    const disabled = this.selectedColors.length < this.numOfColors;
    this.checkButton.classList[disabled ? "add" : "remove"]("disabled");

    this.errorMessageSpan.innerText = this.errorMessage;

    this.colorInputs.forEach((el, i) => {
      el.classList[this.selectedColorInput === i ? "add" : "remove"]("focused");
      el.style.backgroundColor = this.selectedColors[i] || "";
    });
  }
}
