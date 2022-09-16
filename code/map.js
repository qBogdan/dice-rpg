/* 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15*/ // 66 = Q
let mapString = `c  .  .  .  .  N  N  N  N  N  .  .  .  .  c
.  .  .  .  .  .  .  .  .  .  .  .  .  .  .
.  .  x  .  .  .  .  .  .  .  .  .  x  .  .
.  .  .  .  .  .  .  x  .  .  .  .  .  .  .
.  .  .  .  x  .  .  .  .  .  x  .  .  .  .
W  .  .  .  .  .  .  .  .  .  .  .  .  .  E
W  .  .  .  .  .  d  d  d  .  .  .  .  .  E
W  .  .  x  .  .  d  D  d  .  .  x  .  .  E
W  .  .  .  .  .  d  d  d  .  .  .  .  .  E
W  .  .  .  .  .  .  .  .  .  .  .  .  .  E
.  .  .  .  x  .  .  .  .  .  x  .  .  .  .
.  .  .  .  .  .  .  x  .  .  .  .  .  .  .
.  .  x  .  .  .  .  .  .  .  .  .  x  .  .
.  .  .  .  .  .  .  .  .  .  .  .  .  .  .
c  .  .  .  S  S  S  S  S  S  S  .  .  .  c`;

const MAP = {
    map: mapString.split(/\s+|\r?\n/),
    size: 15,
    elementPosition(x, y) {
        return {
            x: ($("#map").offsetWidth / this.size) * (x - 1) + "px",
            y: ($("#map").offsetWidth / this.size) * (y - 1) + "px",
        };
    },

    compareCoords(set1, set2) {
        return set1.x === set2.x && set1.y === set2.y;
    },
};

/*
const MAP = {
    map: mapString.split(/\s+|\r?\n/),
    playerPos: {},
    size: 15,

    indexCoords(index) {
        return {
            x: Math.floor(index / this.size + 1),
            y: (index % this.size) + 1,
        };
    },

    getCoords(n) {
        return ($("#map").offsetWidth / this.size) * (n - 1);
    },

    getIndex(x, y) {
        return x * 15 + y - 16;
    },

    compareCoords(set1, set2) {
        return set1.x === set2.x && set1.y === set2.y;
    },

    getFreeLocation() {
        let freeMap = [];

        this.map.forEach((loc, index) => {
            if (loc === "." && this.checkLocation(index)) freeMap.push(index);
        });

        return freeMap[Math.floor(Math.random() * freeMap.length)];
    },

    checkLocation(location) {
        let check = [];

        GAME.charactersLocation().forEach((loc) => {
            if (loc === location) {
                check.push(0);
            } else {
                check.push(1);
            }
        });

        if (check.includes(0)) {
            return false;
        } else {
            return true;
        }
    },

    drawMap() {
        $$(".artifact").forEach((a) => a.remove());

        this.map.forEach((loc, index) => {
            const place = document.createElement("div");

            place.style.gridRowStart = this.indexCoords(index).x;
            place.style.gridColumnStart = this.indexCoords(index).y;

            if (loc === "x") {
                place.classList.add("light");
                $("#map").append(place);
            } else if (loc === "c") {
                place.classList.add("chest");
                $("#map").append(place);
            } else if (loc === "d") {
                place.classList.add("mountainTile");
                $("#map").append(place);
            } else if (loc === "D") {
                place.classList.add("dragonTile");
                $("#map").append(place);
            } else if (loc === "N") {
                place.classList.add("villageTile");
                place.classList.add("nVillage");
                $("#map").append(place);
            } else if (loc === "E") {
                place.classList.add("villageTile");
                place.classList.add("eVillage");
                $("#map").append(place);
            } else if (loc === "S") {
                place.classList.add("villageTile");
                place.classList.add("sVillage");
                $("#map").append(place);
            } else if (loc === "W") {
                place.classList.add("villageTile");
                place.classList.add("wVillage");
                $("#map").append(place);
            } else if (loc === "n") {
                place.classList.add("artifact");
                place.classList.add("nArtifact");
                $("#map").append(place);
            } else if (loc === "w") {
                place.classList.add("artifact");
                place.classList.add("wArtifact");
                $("#map").append(place);
            } else if (loc === "e") {
                place.classList.add("artifact");
                place.classList.add("eArtifact");
                $("#map").append(place);
            }
        });
    },

    location(x, y) {
        return this.map[this.size * (x - 1) + (y - 1)];
    },

    activePlayerLocation() {
        return this.map[
            this.size * (GAME.activePlayer().coords.x - 1) + (GAME.activePlayer().coords.y - 1)
        ];
    },

    playEvent() {
        // plays event depending on player location on map
        if (this.activePlayerLocation() === "x") {
            DICE.addSixDie();
        } else if (this.activePlayerLocation() === "c") {
            CHEST.createNewTreasure("treasure");
            this.activeChest();
        } else if (this.activePlayerLocation() === "S") {
            GAME.activePlayer().health = GAME.activePlayer().maxHealth;

            $(".playerInfo  .bar").style.width = `${
                (100 / GAME.activePlayer().maxHealth) * GAME.activePlayer().health
            }%`;
        } else if (
            this.activePlayerLocation() === "W" ||
            this.activePlayerLocation() === "N" ||
            this.activePlayerLocation() === "E"
        ) {
            VILLAGE.enterVillage(this.activePlayerLocation());
        } else if (
            this.activePlayerLocation() === "w" ||
            this.activePlayerLocation() === "n" ||
            this.activePlayerLocation() === "e"
        ) {
            CHEST.createNewTreasure(this.activePlayerLocation());
        }
    },

    activeChest() {
        CHEST.chests.forEach((chest) => {
            if (this.compareCoords(chest.coords, GAME.activePlayer().coords)) {
                CHEST.emptyChest(chest);
            }
        });
    },
};
*/
