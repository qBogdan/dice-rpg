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
        this.defece = 0;
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
    const player = GAME.players[GAME.gameTurn];
    return player;
};

const GAME = {
    gameTick: 0, // increases every move
    gameTurn: 0, // increases every next player
    gameRound: 0, // increases after all players end a turn
    players: [],

    addPlayer(name, color, picture) {
        const newPlayer = new PLAYER(name, color, picture); // creates the player
        newPlayer.selector = `player${this.players.length}`;
        newPlayer.index = this.players.length;
        newPlayer.coords = {
            x: MAP.size,
            y: 5 + newPlayer.index,
        };
        this.players.push(newPlayer);

        const playerPawn = document.createElement("div"); // adds player element to map
        playerPawn.classList.add("player", newPlayer.selector);

        const player = document.createElement("div");
        player.classList.add("player");
        player.classList.add(`player${newPlayer.index}`);
        player.style.top = MAP.elementPosition(MAP.size, 5 + newPlayer.index).x;
        player.style.left = MAP.elementPosition(MAP.size, 5 + newPlayer.index).y;
        player.style.background = color;

        $("#map").append(player);
    },

    start() {
        this.addEvents();
    },

    addEvents() {
        $$(".arrowButton").forEach((button) => {
            // adds events for arrow buttons
            button.addEventListener("click", (e) => {
                this.move(e.target.dataset.direction);
            });
        });
    },

    move(direction) {
        const instructions = {
            // map the instructions for each cardinal point
            n: { dir: "n", val: -1, axis: "x", style: "top", die: 2 },
            e: { dir: "e", val: 1, axis: "y", style: "left", die: 3 },
            s: { dir: "s", val: 1, axis: "x", style: "top", die: 4 },
            w: { dir: "w", val: -1, axis: "y", style: "left", die: 5 },
        };

        console.log(checkPath(instructions[direction]));

        // if (clearPath(instructions)) {
        //     checks if the player can move in given direction
        //     if (this.activePlayer().diceRound.includes(inst[direction].die)) {
        //         DICE.removeDice(inst[direction].die);
        //         this.movePawn(direction, inst);
        //     } else if (this.activePlayer().diceRound.includes(6)) {
        //         DICE.removeDice(6);
        //         this.movePawn(direction, inst);
        //     }
        // }
    },
};

function checkPath(instructions) {
    function checkEdge() {
        if (
            player().coords[instructions.axis] + instructions.val > 0 &&
            player().coords[instructions.axis] + instructions.val < MAP.size
        ) {
            return true;
        }
    }
    // console.log("edge", checkEdge());

    function checkNeighbour() {
        let free = true;
        let nextMove = { ...player().coords };
        nextMove[instructions.axis] += instructions.val;
        GAME.players.forEach((player) => {
            if (MAP.compareCoords({}, player.coords)) {
                let free = false;
            }
        });
        console.log("n", free);
        return free;
    }
    //console.log("NEIGH", checkNeighbour());

    if (checkEdge() && checkNeighbour()) {
        return true;
    }
}

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

    activePlayer() {
        // sets controlls for the current player
        return this.players[this.round];
    },

    nextPlayer() {
        // swithces to the next player
        this.round = (this.round + 1) % this.players.length;
        this.displayCurrentPlayer();
        DICE.rollDice();
        this.gameTick++;
        if (this.gameTick % this.playerCount === 0) {
            this.gameRound++;
        }
        CHEST.checkChests();
        VILLAGE.placeArtifact();
        VILLAGE.checkVilalge(
            MAP.location(this.activePlayer().coords.x, this.activePlayer().coords.y)
        );
    },

    move(direction) {
        const inst = {
            // map the instructions for each cardinal point
            n: {
                dir: "x",
                val: -1,
                axis: "top",
                die: 2,
            },
            e: {
                dir: "y",
                val: 1,
                axis: "left",
                die: 3,
            },
            s: {
                dir: "x",
                val: 1,
                axis: "top",
                die: 4,
            },
            w: {
                dir: "y",
                val: -1,
                axis: "left",
                die: 5,
            },
        };

        if (this.checkPath(inst, direction)) {
            if (this.activePlayer().diceRound.includes(inst[direction].die)) {
                DICE.removeDice(inst[direction].die);
                this.movePawn(direction, inst);
            } else if (this.activePlayer().diceRound.includes(6)) {
                //DICE.removeDice(6);
                this.movePawn(direction, inst);
            }
        }
    },

    chekNeighbor(inst, direction) {
        let now = { ...this.activePlayer().coords };
        now[inst[direction].dir] += inst[direction].val;
        let hasNeighbour;

        this.players.forEach((player) => {
            if (JSON.stringify(player.coords) === JSON.stringify(now)) {
                hasNeighbour = true;
            }
        });

        if (hasNeighbour) {
            return true;
        } else {
            return false;
        }
    },

    checkPath(inst, direction) {
        let nextDir = this.activePlayer().coords[inst[direction].dir] + inst[direction].val;

        if (nextDir > 0 && nextDir < MAP.size + 1 && !this.chekNeighbor(inst, direction)) {
            return true;
        } else {
            return false;
        }
    },

    movePawn(direction, inst) {
        // moves the player Element
        const pawn = $(`.${this.activePlayer().selector}`);
        pawn.style[inst[direction].axis] =
            MAP.getCoords(this.activePlayer().coords[inst[direction].dir] + inst[direction].val) +
            "px";
        this.activePlayer().coords[inst[direction].dir] += inst[direction].val;
        MAP.playEvent();
        VILLAGE.checkVilalge(
            MAP.location(this.activePlayer().coords.x, this.activePlayer().coords.y)
        );
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
