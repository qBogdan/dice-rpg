
class PLAYER {
    constructor(name, color) {
        this.selector = "",
        this.name = name,
        this.color = color,
        this.health = 10,
        this.attack = 0,
        this.defense = 0,
        this.gold = 0,
        this.coords = {},
        this.items = [],
        this.diceNumber = 3,
        this.diceRound = []
    }
}

const GAME = {
    players: [],
    round: 0,

    activePlayer() {
        return this.players[this.round]
    },

    nextPlayer() {
        this.round = (this.round + 1) % this.players.length;
        $('.endTurn').style.backgroundColor = this.activePlayer().color ;
        this.rollDice()
    },

    move(direction) {
        const pawn = document.querySelector(`.${this.activePlayer().selector}`);
        
        if (direction === "n") {
            pawn.style.top = getCoords(this.activePlayer().coords.x - 1) + 'px';
            this.activePlayer().coords.x --;

        } else if (direction === "s") {
            pawn.style.top = getCoords(this.activePlayer().coords.x + 1) + 'px';
            this.activePlayer().coords.x ++;

        } else if (direction === 'w') {
            pawn.style.left = getCoords(this.activePlayer().coords.y - 1) + 'px';
            this.activePlayer().coords.y --;

        } else if (direction === 'e') {
            pawn.style.left = getCoords(this.activePlayer().coords.y + 1) + 'px';
            this.activePlayer().coords.y ++;
        }

    },

    rollDice() {
        $('.diceWindow').innerHTML = "";

        for ( let i = 0 ; i < this.activePlayer().diceNumber ; i++) {
            let die = document.createElement('div');
            let dieR = Math.floor(Math.random()*6) +1 ;
            die.classList.add('die');
            die.innerText = dieR;

            $('.diceWindow').append(die)
        }
        
    }

}
