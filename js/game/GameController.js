import { gameTemplate } from "../templates/game.js";

export class GameController {
  userName;
  difficulty;
  colors;
  constructor() {
    // this.init();
  }
  init({ userName, difficulty, colors }) {
    const app = document.getElementById("app");
    app.innerHTML = gameTemplate;

    this.userName = userName;
    this.difficulty = difficulty;
    this.colors = colors;

    document
      .querySelectorAll(".color-button")
      .forEach((el, i) => (el.style.backgroundColor = this.colors[i]));

    this.initializeEvents();
    this.update();
  }
  initializeEvents() {}
  update() {}
}
