import { navigate } from "../navigation.js";

const handlePlayButtonClick = () => navigate("game");
const handleAboutButtonClick = () => navigate("game");

export const initializeHomeEvents = () => {
  const playButton = document.getElementById("play-button");
  const aboutButton = document.getElementById("about-button");

  playButton.addEventListener("click", handlePlayButtonClick);
  aboutButton.addEventListener("click", handleAboutButtonClick);
};
