import { menuTemplate } from "../templates/menu.js";
import { gameController } from "../main.js";
import { difficultyOptions } from "../utils/gameUtils.js";

export class GameMenuController {
  difficulty = 0;
  colors = ["#F76C5E", "#F68E5F", "#F5DD90", "#16DB93", "#A390E4", "#30BCED"];
  constructor() {
    this.init();
  }
  init() {
    const app = document.getElementById("app");
    app.innerHTML = menuTemplate;

    this.input = document.getElementById("name-input");
    this.difficultyButtons = document.querySelectorAll(
      "#difficulty-btn-group > *"
    );
    this.colorInputs = document.querySelectorAll("#color-inputs-wrapper > *");
    this.colorInputsWrapper = document.getElementById("color-inputs-wrapper");
    this.startButton = document.getElementById("start-game-button");
    this.colorNumIndicator = document.getElementById("color-num-indicator");
    this.checkNumIndicator = document.getElementById("check-num-indicator");

    this.colorInputs.forEach((input, i) => (input.value = this.colors[i]));

    this.initializeEvents();
    this.update();
  }
  initializeEvents() {
    this.difficultyButtons.forEach((button, i) => {
      button.addEventListener("click", () => {
        this.difficulty = i;
        this.update();
      });
    });
    this.colorInputs.forEach((input, i) => {
      input.addEventListener("change", (e) => {
        this.colors[i] = e.target.value;
      });
    });
    this.startButton.addEventListener("click", () => {
      this.startGame();
    });
  }
  startGame() {
    const userName = document.getElementById("name-input").value;
    gameController.init({
      userName,
      difficulty: this.difficulty,
      colors: this.colors.slice(
        0,
        Object.values(difficultyOptions)[this.difficulty].colors
      ),
    });
  }
  update() {
    this.difficultyButtons.forEach((button, i) => {
      button.classList[this.difficulty === i ? "add" : "remove"](
        "btn-group-active"
      );
    });

    this.difficultyButtons.forEach((button, i) => {
      button.classList[this.difficulty === i ? "add" : "remove"](
        "btn-group-active"
      );
    });

    const { colors, checks } =
      Object.values(difficultyOptions)[this.difficulty];

    this.colorInputsWrapper.innerHTML = Array(colors)
      .fill('<input type="color">')
      .join("");

    this.colorInputs = document.querySelectorAll("#color-inputs-wrapper > *");

    this.colorInputs.forEach((input, i) => (input.value = this.colors[i]));

    this.colorNumIndicator.innerHTML = colors;
    this.checkNumIndicator.innerHTML = checks;
  }
}
