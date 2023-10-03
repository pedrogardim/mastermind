import { menuTemplate } from "../templates/menuTemplates.js";
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
  input: HTMLElement;
  difficultyButtons: NodeListOf<HTMLDivElement>;
  colorInputs: NodeListOf<HTMLInputElement>;
  colorInputsWrapper: HTMLElement;
  startButton: HTMLElement;
  colorNumIndicator: HTMLElement;
  checkNumIndicator: HTMLElement;
  resetColorsButton: HTMLElement;

  difficulty = 0;
  colors = [...DEFAULT_COLORS];
  constructor() {
    this.init();
  }
  init() {
    const app = document.getElementById("app") as HTMLElement;
    app.innerHTML = menuTemplate;

    this.initializeSelectors();

    this.colorInputs.forEach((input, i) => (input.value = this.colors[i]));

    const storageColors = readColorsFromStorage();
    this.colors = DEFAULT_COLORS.map((color, i) => storageColors[i] || color);
    this.initializeEvents();
    this.update();
  }
  initializeSelectors() {
    const getElementById = document.getElementById.bind(document);
    const querySelectorAll = document.querySelectorAll.bind(document);

    this.input = getElementById("name-input") as HTMLElement;
    this.difficultyButtons = querySelectorAll("#difficulty-btn-group > *");
    this.colorInputs = querySelectorAll("#color-inputs-wrapper > *");
    this.colorInputsWrapper = getElementById(
      "color-inputs-wrapper"
    ) as HTMLElement;
    this.startButton = getElementById("start-game-button") as HTMLElement;
    this.colorNumIndicator = getElementById(
      "color-num-indicator"
    ) as HTMLElement;
    this.checkNumIndicator = getElementById(
      "check-num-indicator"
    ) as HTMLElement;
    this.resetColorsButton = getElementById(
      "reset-colors-button"
    ) as HTMLElement;
  }
  initializeEvents() {
    this.difficultyButtons.forEach((button, i) => {
      button.addEventListener("click", () => {
        this.difficulty = i;
        this.update();
      });
    });

    this.startButton.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).classList.contains("disabled")) return;
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
        this.colors[i] = (e.target as HTMLInputElement).value;
        saveColorsToStorage(this.colors);
        this.update();
      });
    });
  }
  startGame() {
    const userName = (this.input as HTMLInputElement).value;
    gameController.init(
      userName,
      this.difficulty,
      this.colors.slice(
        0,
        Object.values(difficultyOptions)[this.difficulty].colors
      )
    );
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

    const hasDuplicated = new Set(this.colors).size !== this.colors.length;
    this.startButton.classList[hasDuplicated ? "add" : "remove"]("disabled");

    this.initializeColorInputsEvents();

    this.colorNumIndicator.innerHTML = colors.toString();
    this.checkNumIndicator.innerHTML = checks.toString();
  }
}
