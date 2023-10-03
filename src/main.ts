import { GameController } from "./game/GameController.js";
import { GameMenuController } from "./game/GameMenuController.js";


document.addEventListener("DOMContentLoaded", () => {
  gameController = new GameController();
  gameMenuController = new GameMenuController();
});
