const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function init() {
    GAME.addPlayer("Bogdan", "white");
    GAME.addPlayer("Livi", "red");
    GAME.start();
}

init();
