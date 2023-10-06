export const menuTemplate = `
    <h1 class="title">MasterMind</h1>
    <span class="label">Your name</span>
    <input type="text" id="name-input" maxlength="16" placeholder="Insert your name">
    <span class="label">Difficulty</span>
    <div class="button-group" id="difficulty-btn-group">
        <div id="btn-easy">Easy</div>
        <div id="btn-medium">Medium</div>
        <div id="btn-hard">Hard</div>
    </div>
    <div class="menu-difficulty-info-container">
        <img class="icon" src="../assets/icons/palette.svg"/>
        <span id="color-num-indicator"></span>
        <img class="icon" src="../assets/icons/target.svg"/>
        <span id="check-num-indicator"></span>
    </div>
    <span class="label">Colors</span>
    <div id="color-inputs-wrapper">
        <input type="color">
        <input type="color">
        <input type="color">
        <input type="color">
    </div>
    <img class="icon clickable" id="reset-colors-button" src="../assets/icons/refresh.svg" >
    <div>
        <a href="./about.html" class="button">About</a>
        <button class="button" id="start-game-button">Start game</button>
    </div>
`;
