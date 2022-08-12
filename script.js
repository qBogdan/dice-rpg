
function $(selector) {
    return document.querySelector(selector)
};

let playerCount = 0;

/* ** */
function fillMap() {
    for (let i = 0; i < 122; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile')
        $('#map').append(tile);
    }
}

function getCoords(n) {
    return $('#map').offsetWidth / 12 * (n - 1)
}


function addPlayer(name, color) {

    GAME.players[playerCount] = new PLAYER(name, color);
    GAME.players[playerCount].selector = `player${playerCount}`;
    GAME.players[playerCount].coords = {
        x: 12,
        y: 4 + playerCount
    }

    const player = document.createElement('div');
    player.classList.add('player');
    player.classList.add(`player${playerCount}`)

    player.style.width = $('#map').offsetWidth / 12 + 'px';
    player.style.top = getCoords(12) + 'px';
    player.style.left = getCoords(4 + playerCount) + 'px';
    player.style.background = color;

    $('#map').append(player)
    playerCount++;

}

function addEvents() {

    document.querySelectorAll('.arrowButton').forEach(ar => {
        ar.addEventListener('click', e => {
            GAME.move(e.target.dataset.direction)
        })
    })

    $('.endTurn').addEventListener('click', ()=> {GAME.nextPlayer();});

}

function startGame() {
    fillMap();
    addEvents();
    addPlayer("Bogdan", "black");
    addPlayer("Livia", "darkred");
    addPlayer("Andrei", "blue");
    $('.endTurn').style.backgroundColor = GAME.activePlayer().color;
    GAME.rollDice();
}

startGame()

