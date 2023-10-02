import { menuTemplate } from "../templates/menu.js";
import { gameController } from "../main.js";
import { difficultyOptions } from "../utils/gameUtils.js";
import {
  readColorsFromStorage,
  saveColorsToStorage,
} from "../utils/localStorage.js";

const DEFAULT_COLORS = [
  "#F76C5E",
  "#F5DD90",
  "#30BCED",
  "#16DB93",
  "#F68E5F",
  "#A390E4",
];

export class GameMenuController {
  difficulty = 0;
  colors = [...DEFAULT_COLORS];
  constructor() {
    this.init();
  }
  init() {
    const app = document.getElementById("app");
    app.innerHTML = menuTemplate;

    this.initializeSelectors();

    this.colorInputs.forEach((input, i) => (input.value = this.colors[i]));

    const storageColors = readColorsFromStorage();
    this.colors = DEFAULT_COLORS.map((color, i) => storageColors[i] || color);
    this.initializeEvents();
    this.update();
  }
  initializeSelectors() {
    this.input = document.getElementById("name-input");
    this.difficultyButtons = document.querySelectorAll(
      "#difficulty-btn-group > *"
    );
    this.colorInputs = document.querySelectorAll("#color-inputs-wrapper > *");
    this.colorInputsWrapper = document.getElementById("color-inputs-wrapper");
    this.startButton = document.getElementById("start-game-button");
    this.colorNumIndicator = document.getElementById("color-num-indicator");
    this.checkNumIndicator = document.getElementById("check-num-indicator");
    this.resetColorsButton = document.getElementById("reset-colors-button");
  }
  initializeEvents() {
    this.difficultyButtons.forEach((button, i) => {
      button.addEventListener("click", () => {
        this.difficulty = i;
        this.update();
      });
    });

    this.startButton.addEventListener("click", () => {
      this.startGame();
    });

    this.resetColorsButton.addEventListener("click", () => {
      this.colors = [...DEFAULT_COLORS];
      saveColorsToStorage(this.colors);
      this.update();
    });

    this.initializeColorInputsEvents();
  }
  initializeColorInputsEvents() {
    this.colorInputs.forEach((input, i) => {
      input.addEventListener("change", (e) => {
        this.colors[i] = e.target.value;
        saveColorsToStorage(this.colors);
      });
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

    this.initializeColorInputsEvents();

    this.colorNumIndicator.innerHTML = colors;
    this.checkNumIndicator.innerHTML = checks;
  }
}
