const VILLAGE = {
    villageTick: 0,
    villages: [
        {
            name: "W",
            color: "green",
            mapChar: "w",
            shopItems: [],
        },
        {
            name: "N",
            color: "green",
            mapChar: "n",
            shopItems: [],
        },
        {
            name: "E",
            color: "green",
            mapChar: "e",
            shopItems: [],
        },
    ],

    placeArtifact() {
        if (GAME.gameTick === this.villageTick + 3) {
            this.createItem(this.villages[Math.floor(Math.random() * this.villages.length)]);
            this.villageTick = GAME.gameTick;
        }
    },

    createItem(village) {
        MAP.map[MAP.getFreeLocation()] = village.mapChar;
        MAP.drawMap();
    },

    removeItem() {
        MAP.map[MAP.getIndex(GAME.activePlayer().coords.x, GAME.activePlayer().coords.y)] = ".";

        MAP.drawMap();
    },

    enterVillage(village) {
        this.checkPlayerItems(village);
    },

    checkVilalge(location) {
        if (location === "N" || location === "E" || location === "W") {
            $(".shopButton").style.display = "flex";
        } else {
            $(".shopButton").style.display = "none";
        }
    },

    openShop(village) {
        console.log(village);
    },

    checkPlayerItems(village) {
        GAME.activePlayer().items.forEach((item, index) => {
            if (item.village === village.toLowerCase()) {
                GAME.activePlayer().gold += item.bonus;
            }
        });

        GAME.activePlayer().items = GAME.activePlayer().items.filter(
            (item) => item.village !== village.toLowerCase()
        );

        GAME.displayCurrentPlayer();
    },
};
