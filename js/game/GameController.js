import {
  gameTemplate,
  createGameRow,
  endGameMessage,
} from "../templates/game.js";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

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
  constructor() {
    // this.init();
  }
  init({ userName, difficulty, colors }) {
    this.app = document.getElementById("app");
    this.app.innerHTML = gameTemplate;

    this.userName = userName;
    this.difficulty = difficulty;
    this.colors = colors;

    this.targetColors = colors.map(
      () => colors[Math.floor(Math.random() * colors.length)]
    );

    this.gameRows = document.getElementById("game-rows");
    this.colorButtons = document.querySelectorAll(".color-button");
    this.colorInputs = document.querySelectorAll(".game-color-input");
    this.checkButton = document.getElementById("check-button");
    this.errorMessageSpan = document.getElementById("error-message");

    this.colorButtons.forEach(
      (el, i) => (el.style.backgroundColor = this.colors[i])
    );

    this.initializeEvents();
    this.update();
  }
  initializeEvents() {
    this.colorButtons.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.selectedColors[this.selectedColorInput] = this.colors[i];
        this.selectedColorInput++;
        this.selectedColorInput %= 4;
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

    const row = document.createElement("div");
    row.innerHTML = createGameRow(this.round, this.selectedColors, checkArray);
    this.gameRows.append(row);
    this.gameRows.scrollTo({ top: 9999 });

    if (correctPos.every((e) => e)) {
      this.onWin();
      return;
    }

    if (this.round >= this.maxRounds) {
      this.onLose();
      return;
    }

    this.round++;
    // this.selectedColors = [];
    this.selectedColorInput = 0;
    this.update();
  }
  onWin() {
    this.app.innerHTML = endGameMessage("You win!");
    for (let i = 0; i < 8; i++) {
      setTimeout(() => confetti(), i * 200);
    }
  }
  onLose() {
    this.gameRows.style.opacity = 0;
    this.gameRows.style.transform = "translateY(2em) scale(0.9)";

    setTimeout(() => {
      this.app.innerHTML = endGameMessage("You lose!");
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
