import { gameTemplate } from "../templates/game.js";

export class GameController {
  userName;
  difficulty;
  colors;
  selectedColorInput = 0;
  constructor() {
    // this.init();
  }
  init({ userName, difficulty, colors }) {
    const app = document.getElementById("app");
    app.innerHTML = gameTemplate;

    this.userName = userName;
    this.difficulty = difficulty;
    this.colors = colors;

    this.colorButtons = document.querySelectorAll(".color-button");
    this.colorInputs = document.querySelectorAll(".game-color-input");

    this.colorButtons.forEach(
      (el, i) => (el.style.backgroundColor = this.colors[i])
    );

    this.initializeEvents();
    this.update();
  }
  initializeEvents() {
    this.colorButtons.forEach((el) => {});
    this.colorInputs.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.selectedColorInput = i;
        this.update();
      });
    });
  }
  update() {
    this.colorInputs.forEach((el, i) => {
      el.classList[this.selectedColorInput === i ? "add" : "remove"]("focused");
    });
  }
}
