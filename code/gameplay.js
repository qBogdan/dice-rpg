
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
            this.gold = 120,
            this.coords = {},
            this.items = [],
            this.diceNumber = 4,
            this.diceRound = []
    }
}

const GAME = {
    playerCount: 0,
    players: [],
    round: 0,

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

    playerProfileConstructor() {
        return `
            
        <div class="profile">
            <div class="picture" style="background : ${this.activePlayer().color}"></div>
            <h1>${this.activePlayer().name}</h1>
        </div>
        
        <div class="statsContainer">

            <div class="healthBar">
                <div class="healthValue">${this.activePlayer().health}</div>
                <div class="bar">
                    <div class="barValue" style="width:${100 / this.activePlayer().maxHealth * this.activePlayer().health}%" ></div>
                </div>
            </div>

            <div class="stats">
                <div class="statPoint attack">${this.activePlayer().attack}</div>
                <div class="statPoint defence">${this.activePlayer().defence}</div>
                <div class="statPoint gold"> ${this.activePlayer().gold}</div>
            </div>
        </div>
        `
    },

    displayCurrentPlayer() {
        $('.playerStats').innerHTML = this.playerProfileConstructor();
    },

    activePlayer() { // sets controlls for the current player
        return this.players[this.round]
    },

    addActionButton() {
        $('.actionButton').innerHTML = "";

        let end = document.createElement('div');
        end.classList.add('endTurn');
        end.innerText = 'end'
        end.addEventListener('click', () => { this.nextPlayer() });

        let fight = document.createElement('div');
        fight.classList.add('fight');
        fight.innerText = 'fight';
        fight.addEventListener('click', () => { FIGHT.createScene() })


        if (this.activePlayer().diceRound.find(n => n === 1) === 1) {
            $('.actionButton').append(fight)
        } else {
            $('.actionButton').append(end)
        }

    },

    nextPlayer() { // swithces to the next player 
        this.round = (this.round + 1) % this.players.length;
        this.displayCurrentPlayer();
        DICE.rollDice();
        this.addActionButton()
        // probably will be replaced by a button
        // change player display
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
        this.addPlayer("Bogdan", 'darkgrey');
        this.addPlayer("Liviuta", 'darkred');
        this.addPlayer("Gabi", 'orange');
        this.addPlayer("Andrei", 'blue');
        this.addPlayer("Maduta", 'green');

        this.addEvents();
        DICE.rollDice();
        MAP.drawMap();
        this.displayCurrentPlayer();
        this.addActionButton()

    },

    updatePlayerVisual() {
        $$('.healthValue').forEach(val => {
            val.innerText = GAME.activePlayer().health;
        });

        $$('.barValue').forEach(val => {
            val.style.width = (100 / GAME.activePlayer().maxHealth) * GAME.activePlayer().health + '%';
        })
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