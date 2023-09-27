export class GameMenuController {
  difficulty = 0;
  constructor() {
    this.init();
  }
  init() {
    this.input = document.getElementById("name-input");
    this.difficultyButtons = document.querySelectorAll(
      "#difficulty-btn-group > *"
    );
    this.colorInputsWrapper = document.getElementById("color-inputs-wrapper");
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
  }
  update() {
    this.difficultyButtons.forEach((button, i) => {
      button.classList[this.difficulty === i ? "add" : "remove"](
        "btn-group-active"
      );
    });
  }
}

const a = new GameMenuController();
