import { GameController } from "./game/GameController.js";
import { GameMenuController } from "./game/GameMenuController.js";

export let gameController;
export let gameMenuController;

document.addEventListener("DOMContentLoaded", () => {
  gameController = new GameController();
  gameMenuController = new GameMenuController();
});
