import { gameTemplate, createGameRow, endGameMessage, } from "../templates/gameTemplates.js";
//@ts-ignore
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import { pushGameEntryToStorage } from "../utils/localStorage.js";
import { difficultyOptions } from "../utils/gameUtils.js";
export class GameController {
    constructor() {
        this.selectedColors = [];
        this.selectedColorInput = 0;
        this.round = 1;
        this.errorMessage = "";
        this.numOfColors = 4;
        this.maxRounds = 10;
    }
    startGame(userName, difficulty, colors) {
        const difficultyInfo = Object.values(difficultyOptions)[difficulty];
        this.gameEnded = false;
        this.round = 1;
        this.userName = userName;
        this.difficulty = difficulty;
        this.numOfColors = difficultyInfo.colors;
        this.maxRounds = difficultyInfo.checks;
        this.colors = colors;
        this.app = document.getElementById("app");
        this.app.innerHTML = gameTemplate(difficultyInfo.colors);
        this.initSelectors();
        this.targetColors = colors.map(() => colors[Math.floor(Math.random() * colors.length)]);
        this.colorButtons.forEach((el, i) => (el.style.backgroundColor = this.colors[i]));
        this.initEvents();
        this.update();
    }
    initSelectors() {
        const getElementById = (sel) => document.getElementById(sel);
        const querySelectorAll = document.querySelectorAll.bind(document);
        this.gameRows = getElementById("game-rows");
        this.colorButtons = querySelectorAll(".color-button");
        this.colorInputs = querySelectorAll(".game-color-input");
        this.checkButton = getElementById("check-button");
        this.errorMessageSpan = getElementById("error-message");
    }
    initEvents() {
        this.colorButtons.forEach((el, i) => {
            el.addEventListener("click", () => {
                this.selectedColors[this.selectedColorInput] = this.colors[i];
                this.selectedColorInput++;
                this.selectedColorInput %= this.numOfColors;
                this.update();
            });
        });
        this.colorInputs.forEach((el, i) => {
            el.addEventListener("click", () => {
                this.selectedColorInput = i;
                this.update();
            });
        });
        this.checkButton.addEventListener("click", this.onCheck.bind(this));
    }
    onCheck() {
        const hasError = this.selectedColors.length < this.numOfColors;
        this.errorMessage = hasError ? "You have some empty colors" : "";
        this.update();
        if (hasError)
            return;
        if (this.round === 1) {
            this.startTime = new Date();
            this.gameRows.innerHTML = "";
        }
        const correctPos = [];
        const correctColors = [];
        this.selectedColors.forEach((color, index) => {
            correctPos[index] = color === this.targetColors[index];
            correctColors[index] = this.targetColors.includes(color);
        });
        const sortArray = ["hasPosition", "hasColor", ""];
        const checkArray = correctPos
            .map((e, i) => (e ? "hasPosition" : correctColors[i] ? "hasColor" : ""))
            .sort((a, b) => sortArray.indexOf(a) - sortArray.indexOf(b));
        if (this.gameEnded)
            return;
        const row = document.createElement("div");
        document
            .querySelectorAll(".row-rounds-left-label")
            .forEach((e) => e.remove());
        row.innerHTML = createGameRow(this.round, this.selectedColors, checkArray, this.maxRounds - this.round);
        this.gameRows.append(row);
        this.gameRows.scrollTo({ top: 9999 });
        if (correctPos.every((e) => e)) {
            this.onWin();
            this.gameEnded = true;
            return;
        }
        if (this.round >= this.maxRounds) {
            this.onLose();
            this.gameEnded = true;
            return;
        }
        this.round++;
        this.selectedColorInput = 0;
        this.update();
    }
    onWin() {
        pushGameEntryToStorage({
            userName: this.userName,
            rounds: this.round,
            time: +new Date() - +this.startTime,
            difficulty: this.difficulty,
        });
        this.app.innerHTML = endGameMessage("You win!", this.startTime);
        for (let i = 0; i < 8; i++) {
            setTimeout(() => confetti(), i * 200);
        }
    }
    onLose() {
        this.gameRows.style.opacity = "0";
        this.gameRows.style.transform = "translateY(2em) scale(0.9)";
        setTimeout(() => {
            this.app.innerHTML = endGameMessage("You lose!", this.startTime);
        }, 1000);
    }
    update() {
        const disabled = this.selectedColors.length < this.numOfColors;
        this.checkButton.classList[disabled ? "add" : "remove"]("disabled");
        this.errorMessageSpan.innerText = this.errorMessage;
        this.colorInputs.forEach((el, i) => {
            el.classList[this.selectedColorInput === i ? "add" : "remove"]("focused");
            el.style.backgroundColor = this.selectedColors[i] || "";
        });
    }
}
