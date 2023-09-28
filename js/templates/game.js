export const gameTemplate = `
    <h1 class="title">MasterMind</h1>
    <div id="game-rows"></div>
    <div class="bottom-container">
        <div class="color-input-container">
        <div class="game-color-input"></div>
        <div class="game-color-input"></div>
        <div class="game-color-input"></div>
        <div class="game-color-input"></div>
        <div class="button" id="check-button">Check</div>
    </div>
    <div class="color-buttons-container">
        <div class="color-button shadow"></div>
        <div class="color-button shadow"></div>
        <div class="color-button shadow"></div>
        <div class="color-button shadow"></div>
    </div>
`;

export const createGameRow = (index, colors, checkArray) => `
    <div class="shadow game-row">
        <div class="row-counter"><span>${index}</span></div>
        <div class="row-color-indicator shadow" style="background-color:${colors[0]}"></div>
        <div class="row-color-indicator shadow" style="background-color:${colors[1]}"></div>
        <div class="row-color-indicator shadow" style="background-color:${colors[2]}"></div>
        <div class="row-color-indicator shadow" style="background-color:${colors[3]}"></div>
    </div>
`;
