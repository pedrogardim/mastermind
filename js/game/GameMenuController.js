export class GameMenuController {
  difficulty = 0;
  colors = ["#F76C5E", "#F68E5F", "#F5DD90", "#16DB93"];
  constructor() {
    this.init();
  }
  init() {
    this.input = document.getElementById("name-input");
    this.difficultyButtons = document.querySelectorAll(
      "#difficulty-btn-group > *"
    );
    this.colorInputs = document.querySelectorAll("#color-inputs-wrapper > *");

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
