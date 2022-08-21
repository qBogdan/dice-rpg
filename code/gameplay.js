
class PLAYER {
    constructor(name, color) {
        this.selector = "",
            this.name = name,
            this.index = 0,
            this.color = color,
            this.maxHealth = 10,
            this.health = this.maxHealth,
            this.attack = 0,
            this.defence = 0,
            this.gold = 20,
            this.coords = {},
            this.items = [],
            this.equipment = {
                attack: undefined,
                defence: undefined,
                accesory: undefined
            }
            this.diceNumber = 6,
            this.diceRound = []
    }
}

const GAME = {
    playerCount: 0,
    players: [],
    round: 0,
    gameTick: 0,
    gameRound:0,

    addEvents() { // getCoords

        $$('.arrowButton').forEach(ar => {
            ar.addEventListener('click', e => {
                this.move(e.target.dataset.direction)
            })
        });

        document.addEventListener('keydown', e => {
            if (e.key === "Escape") {
                $('.fightScene').style.display = 'none'
            }
        });

    },

    addPlayer(name, color) {

        this.players[this.playerCount] = new PLAYER(name, color);
        this.players[this.playerCount].selector = `player${this.playerCount}`;
        this.players[this.playerCount].index = this.playerCount;
        this.players[this.playerCount].coords = {
            x: MAP.size,
            y: 5 + this.playerCount
        }

        const player = document.createElement('div');
        player.classList.add('player');
        player.classList.add(`player${this.playerCount}`)

        player.style.top = MAP.getCoords(MAP.size) + 'px';
        player.style.left = MAP.getCoords(5 + this.playerCount) + 'px';
        player.style.background = color;

        $('#map').append(player)
        this.playerCount++;

    },

    displayCurrentPlayer() {

        $('.playerImg').style.border =`solid 5px ${this.activePlayer().color}`;
        $('.playerName').innerText = this.activePlayer().name;
        $('.playerStats .gold').innerText = this.activePlayer().gold;
        $('.playerStats .attack').innerText = this.activePlayer().attack;
        $('.playerStats .defence').innerText = this.activePlayer().defence;
        $('.playerStats .maxHealth').innerText = this.activePlayer().health;
        $('.playerInfo  .bar').style.width = `${(100 / this.activePlayer().maxHealth) * this.activePlayer().health}%`;
        INV.displayItems();
        INV.displayEquipment();

    },

    activePlayer() { // sets controlls for the current player
        return this.players[this.round]
    },

    addbuttonDisplay() {
        $('.buttonDisplay').innerHTML = "";

        let end = document.createElement('div');
        end.classList.add('endTurn');
        end.classList.add('actionButton');
        end.innerText = 'end'
        end.addEventListener('click', () => { this.nextPlayer() });

        let fight = document.createElement('div');
        fight.classList.add('fight');
        fight.classList.add('actionButton');
        fight.innerText = 'fight';
        fight.addEventListener('click', () => { FIGHT.createScene() })


        if (this.activePlayer().diceRound.find(n => n === 1) === 1) {
            $('.buttonDisplay').append(fight)
        } else {
            $('.buttonDisplay').append(end)
        }

    },

    nextPlayer() { // swithces to the next player 
        this.round = (this.round + 1) % this.players.length;
        this.displayCurrentPlayer();
        DICE.rollDice();
        this.addbuttonDisplay();
        this.gameTick ++;
        if (this.gameTick % this.playerCount === 0) {
            this.gameRound ++
        }
        CHEST.checkChests();
    },



    move(direction) {
        const inst = { // map the instructions for each cardinal point
            n: {
                dir: "x",
                val: -1,
                axis: 'top',
                die: 2
            },
            e: {
                dir: "y",
                val: 1,
                axis: 'left',
                die: 3
            },
            s: {
                dir: "x",
                val: 1,
                axis: 'top',
                die: 4
            },
            w: {
                dir: "y",
                val: -1,
                axis: 'left',
                die: 5
            }
        }

        if (this.checkPath(inst, direction)) {
            if (this.activePlayer().diceRound.includes(inst[direction].die)) {

                DICE.removeDice(inst[direction].die)
                this.movePawn(direction, inst);

            } else if (this.activePlayer().diceRound.includes(6)) {
                DICE.removeDice(6)
                this.movePawn(direction, inst);
            }
        }
    },

    chekNeighbor(inst, direction) {
        let now = { ... this.activePlayer().coords };
        now[inst[direction].dir] += inst[direction].val;
        let hasNeighbour;

        this.players.forEach(player => {
            if (JSON.stringify(player.coords) === JSON.stringify(now)) {
                hasNeighbour = true
            };
        })

        if (hasNeighbour) {
            return true
        } else {
            return false
        }
    },

    checkPath(inst, direction) {
        let nextDir = this.activePlayer().coords[inst[direction].dir] + inst[direction].val;

        if (nextDir > 0 && nextDir < (MAP.size + 1) && !this.chekNeighbor(inst, direction)) {
            return true
        } else {
            return false
        }
    },

    movePawn(direction, inst) { // moves the player Element
        const pawn = $(`.${this.activePlayer().selector}`);
        pawn.style[inst[direction].axis] = MAP.getCoords(this.activePlayer().coords[inst[direction].dir] + inst[direction].val) + 'px';
        this.activePlayer().coords[inst[direction].dir] += inst[direction].val;
        MAP.playEvent();
    },


    startGame() {
        this.addPlayer("Bogdan", 'black');
        this.addPlayer("Liviuta", 'darkred');
        this.addPlayer("Gabi", 'purple');
        this.addPlayer("Andrei", 'darkblue');
        this.addPlayer("Maduta", 'darkgreen');

        INV.addEvents();
        this.addEvents();
        DICE.rollDice();
        MAP.drawMap();
        this.displayCurrentPlayer();
        this.addbuttonDisplay()

    },

    updatePlayerVisual() {
        $('.playerStats .maxHealth').innerText = GAME.activePlayer().health;
        $('.playerFighter .maxHealth').innerText = GAME.activePlayer().health;

        $('.playerInfo .bar').style.width = (100 / GAME.activePlayer().maxHealth) * GAME.activePlayer().health + '%';
        $('.playerFighter .bar').style.width = (100 / GAME.activePlayer().maxHealth) * GAME.activePlayer().health + '%';
    
    },

    resetPlayer() {
        this.activePlayer().health = GAME.activePlayer().maxHealth;
        this.updatePlayerVisual();
        this.activePlayer().items = [];
        this.activePlayer().coords = {
            x: MAP.size,
            y: 5 + this.activePlayer().index
        }
        $(`.${this.activePlayer().selector}`).style.top = MAP.getCoords(this.activePlayer().coords.x) + 'px';
        $(`.${this.activePlayer().selector}`).style.left = MAP.getCoords(this.activePlayer().coords.y) + 'px';
        GAME.nextPlayer();
    }

}