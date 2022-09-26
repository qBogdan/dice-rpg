class PLAYER {
    constructor(name, color, picture) {
        this.selector = "";
        this.name = name;
        this.picture = picture;
        this.index = 0;
        this.color = color;
        this.maxHealth = 30;
        this.health = this.maxHealth;
        this.attack = 0;
        this.defence = 0;
        this.gold = 0;
        this.coords = {};
        this.mapLocation;
        this.mapIndex;
        this.items = [];
        this.equipment = {
            attack: undefined,
            defence: undefined,
            accesory: undefined,
        };
        this.diceRound = [];
        this.diceNumber = 3;
    }
}

const player = () => {
    const player = GAME.players[GAME.playerTurn];
    player.mapIndex = MAP.getIndex(player.coords);
    player.mapLocation = MAP.getLocation(player.coords);
    return player;
};

const GAME = {
    gameTick: 0, // increases every move
    playerTurn: 0, // increases every next player and resets after all play 1 turn
    gameTurn: 0, // increases every next player
    gameRound: 0, // increases after all players end a turn
    players: [], // array of all players object

    addPlayer(name, color, picture) {
        const newPlayer = new PLAYER(name, color, picture); // creates the player
        newPlayer.selector = `.player${this.players.length}`;
        newPlayer.index = this.players.length;
        newPlayer.coords = {
            x: MAP.size,
            y: 5 + newPlayer.index,
        };
        this.players.push(newPlayer);

        const player = div();
        player.classList.add(`player`, `player${newPlayer.index}`);
        player.style.top = MAP.elementPosition(newPlayer.coords).x;
        player.style.left = MAP.elementPosition(newPlayer.coords).y;
        player.style.background = color;

        $("#map").append(player);
    },

    nextPlayer() {
        this.playerTurn = (this.gameTurn + 1) % this.players.length;
        this.gameTurn++;
        if (this.gameTurn === 0) {
            this.gameRound++;
        }
        this.displayCurrentPlayer();
    },

    start() {
        this.addEvents();
        this.displayCurrentPlayer();
    },

    addEvents() {
        $$(".arrowButton").forEach((button) => {
            // adds events for arrow buttons
            button.addEventListener("click", (e) => {
                this.moveCommand(e.target.dataset.direction);
            });
        });

        $(".endButton").addEventListener("click", () => {
            this.nextPlayer();
        });

        $(".inventoryWindow").addEventListener("click", (e) => {
            if (e.target.dataset.type !== "empty" && e.target.dataset.type !== "artifact") {
                INV.useItem(player().items[e.target.dataset.index], e.target.dataset.index);
            }
        });
    },

    moveCommand(direction) {
        const instructions = {
            // map the instructions for each cardinal point
            n: { dir: "n", val: -1, axis: "x", style: "top", die: 2 },
            e: { dir: "e", val: 1, axis: "y", style: "left", die: 3 },
            s: { dir: "s", val: 1, axis: "x", style: "top", die: 4 },
            w: { dir: "w", val: -1, axis: "y", style: "left", die: 5 },
        };
        const thisMove = instructions[direction];

        function hasDie(die) {
            let clear;
            if (player().diceRound.includes(die)) {
                clear = true;
                DICE.removeDie(die);
            } else if (player().diceRound.includes(6)) {
                clear = true;
                DICE.removeDie(6);
            } else if (player().diceRound.includes(1)) {
                clear = true;
                DICE.removeDie(1);
            }
            return clear;
        }

        if (this.checkPath(thisMove) /* && hasDie(thisMove.die)*/) {
            player().coords[thisMove.axis] += thisMove.val;
            this.move(thisMove);
            this.gameTick++;
            MAP.playEvent();
        }
    },

    checkPath(instructions) {
        // check if next coordinate is empty before moving
        function checkEdge() {
            if (
                player().coords[instructions.axis] + instructions.val > 0 &&
                player().coords[instructions.axis] + instructions.val < MAP.size + 1
            ) {
                return true;
            }
        }

        function checkNeighbour() {
            let free = true;
            let nextMove = { ...player().coords };
            nextMove[instructions.axis] += instructions.val;
            GAME.players.forEach((player) => {
                if (MAP.compareCoords(nextMove, player.coords)) {
                    free = false;
                }
            });
            return free;
        }
        if (checkEdge() && checkNeighbour()) {
            return true;
        }
    },

    move(instructions) {
        $(player().selector).style[instructions.style] = MAP.elementPosition(player().coords)[
            instructions.axis
        ];
    },

    displayCurrentPlayer() {
        //display picture and name
        this.updateNameStats();
        INV.displayEquipment();
        INV.displayItems();
        DICE.rollDice();
        this.updateLifeBar();
    },

    updateNameStats() {
        //update picture
        $(".playerName").innerText = player().name;
        $(".gold").innerText = player().gold;
        $(".attack").innerText = player().attack;
        $(".defence").innerText = player().defence;
        $(".maxHealth").innerText = player().maxHealth;
    },

    updateLifeBar() {
        $(".bar").style.width = `${(100 / player().maxHealth) * player().health}%`;
    },
};

/*

    addEvents() {
        // getCoords

        $$(".arrowButton").forEach((ar) => {
            ar.addEventListener("click", (e) => {
                this.move(e.target.dataset.direction);
            });
        });

        $(".endButton").addEventListener("click", () => {
            this.nextPlayer();
        });

        $(".shopButton").addEventListener("click", () => {
            SHOP.openShop(MAP.location(this.activePlayer().coords.x, this.activePlayer().coords.y));
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                $(".fightScene").style.display = "none";
            }
        });
    },

    displayCurrentPlayer() {
        $(".playerImg").style.border = `solid 5px ${this.activePlayer().color}`;
        $(".playerName").innerText = this.activePlayer().name;
        $(".playerStats .gold").innerText = this.activePlayer().gold;
        $(".playerStats .attack").innerText = this.activePlayer().attack;
        $(".playerStats .defence").innerText = this.activePlayer().defence;
        $(".playerStats .maxHealth").innerText = this.activePlayer().health;
        $(".playerInfo  .bar").style.width = `${
            (100 / this.activePlayer().maxHealth) * this.activePlayer().health
        }%`;
        INV.displayItems();
        INV.displayEquipment();
    },

    charactersLocation() {
        return this.players.map((x) => MAP.getIndex(x.coords.x, x.coords.y));
    },


    startGame() {
        this.addPlayer("Bogdan", "black");
        // this.addPlayer("Liviuta", "darkred");
        // this.addPlayer("Gabi", "purple");
        //this.addPlayer("Iasmina", "darkblue");
        // this.addPlayer("Maduta", "darkgreen");

        SHOP.addEvents();
        INV.addEvents();
        this.addEvents();
        DICE.rollDice();
        MAP.drawMap();
        this.displayCurrentPlayer();
    },

    updatePlayerVisual() {
        $(".playerStats .maxHealth").innerText = GAME.activePlayer().health;

        $(".playerInfo .bar").style.width =
            (100 / GAME.activePlayer().maxHealth) * GAME.activePlayer().health + "%";
    },

    resetPlayer() {
        this.activePlayer().health = GAME.activePlayer().maxHealth;
        this.updatePlayerVisual();
        this.activePlayer().items = [];
        this.activePlayer().coords = {
            x: MAP.size,
            y: 5 + this.activePlayer().index,
        };
        $(`.${this.activePlayer().selector}`).style.top =
            MAP.getCoords(this.activePlayer().coords.x) + "px";
        $(`.${this.activePlayer().selector}`).style.left =
            MAP.getCoords(this.activePlayer().coords.y) + "px";
        GAME.nextPlayer();
    },
};
*/
