import { GameController } from "./game/GameController.js";
import { GameMenuController } from "./game/GameMenuController.js";

export let gameController: GameController;
export let gameMenuController: GameMenuController;

document.addEventListener("DOMContentLoaded", () => {
  gameController = new GameController();
  gameMenuController = new GameMenuController();
});
