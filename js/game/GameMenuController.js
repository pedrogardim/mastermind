import { menuTemplate } from "../templates/menuTemplates.js";
import { gameController } from "../main.js";
import { difficultyOptions } from "../utils/gameUtils.js";
import { readColorsFromStorage, saveColorsToStorage, } from "../utils/localStorage.js";
const DEFAULT_COLORS = [
    "#F76C5E",
    "#F5DD90",
    "#30BCED",
    "#16DB93",
    "#F68E5F",
    "#A390E4",
];
export class GameMenuController {
    constructor() {
        this.difficulty = 0;
        this.colors = [...DEFAULT_COLORS];
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
        const getElementById = document.getElementById.bind(document);
        const querySelectorAll = document.querySelectorAll.bind(document);
        this.input = getElementById("name-input");
        this.difficultyButtons = querySelectorAll("#difficulty-btn-group > *");
        this.colorInputs = querySelectorAll("#color-inputs-wrapper > *");
        this.colorInputsWrapper = getElementById("color-inputs-wrapper");
        this.startButton = getElementById("start-game-button");
        this.colorNumIndicator = getElementById("color-num-indicator");
        this.checkNumIndicator = getElementById("check-num-indicator");
        this.resetColorsButton = getElementById("reset-colors-button");
    }
    initializeEvents() {
        this.difficultyButtons.forEach((button, i) => {
            button.addEventListener("click", () => {
                this.difficulty = i;
                this.update();
            });
        });
        this.startButton.addEventListener("click", (e) => {
            if (e.target.classList.contains("disabled"))
                return;
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
                this.update();
            });
        });
    }
    startGame() {
        const userName = this.input.value;
        gameController.init(userName, this.difficulty, this.colors.slice(0, Object.values(difficultyOptions)[this.difficulty].colors));
    }
    update() {
        this.difficultyButtons.forEach((button, i) => {
            button.classList[this.difficulty === i ? "add" : "remove"]("btn-group-active");
        });
        this.difficultyButtons.forEach((button, i) => {
            button.classList[this.difficulty === i ? "add" : "remove"]("btn-group-active");
        });
        const { colors, checks } = Object.values(difficultyOptions)[this.difficulty];
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
