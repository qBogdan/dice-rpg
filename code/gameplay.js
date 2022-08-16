
class PLAYER {
    constructor(name, color) {
        this.selector = "",
            this.name = name,
            this.color = color,
            this.maxHealth = 10,
            this.health = 8,
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
        const container = $('.playerStats');
        container.innerHTML = this.playerProfileConstructor();
    },

    activePlayer() { // sets controlls for the current player
        return this.players[this.round]
    },

    fight() {
        this.removeDice(1);
        this.addSixDie();
        this.addActionButton()
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
        this.rollDice();
        this.addActionButton()
        // probably will be replaced by a button
        // change player display
    },

    createDice() { // create random dice elements 
        $('.diceWindow').innerHTML = ""; // resets dice container element
        this.activePlayer().diceRound = []; // resets current dice array

        let startN = 1;
        let endN = 6

        for (let i = 0; i < this.activePlayer().diceNumber; i++) {

            let dieR = Math.floor(Math.random() * endN) + startN; // creates random number

            if (dieR === 1) { // prevents game from having more than one attack per turn 
                startN = 2;
                endN = 5
            }

            let die = document.createElement('div'); // create die element
            die.classList.add('die');
            die.classList.add(`die${dieR}`);

            this.activePlayer().diceRound.push(dieR) // push die number to player array

            $('.diceWindow').append(die)
        }
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
                this.movePawn(direction, inst);
                this.removeDice(inst[direction].die)
            } else if (this.activePlayer().diceRound.includes(6)) {
                this.movePawn(direction, inst);
                this.removeDice(6)
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

    removeDice(dieNr) { // removes die element once used
        let dieI = this.activePlayer().diceRound.findIndex(x => x === dieNr);
        this.activePlayer().diceRound.splice(dieI, 1);
        $$('.die')[dieI].remove();
    },

    addSixDie() {
        this.activePlayer().diceRound.push(6);
        let six = document.createElement('div');
        six.classList.add('die');
        six.classList.add('die6');
        $('.diceWindow').append(six)
    },


    rollDice() {
        this.createDice();
        // dice animation;
    },

    startGame() {
        this.addPlayer("Bogdan", 'darkgrey');
        this.addPlayer("Liviuta", 'darkred');
        this.addPlayer("Gabi", 'orange');
        this.addPlayer("Andrei", 'blue');
        this.addPlayer("Maduta", 'green');

        this.addEvents();
        this.rollDice();
        MAP.drawMap();
        this.displayCurrentPlayer();
        this.addActionButton()

    }

}