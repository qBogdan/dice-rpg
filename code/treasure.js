class TREASURE {
    constructor() {
        this.items = [];
    }
}

const itemList = [
    {
        name: "armor",
        type: "defence",
        slot: "armor",
        bonus: 3,
        img: "outfit4.png",
    },

    {
        name: "Fancy armor",
        type: "defence",
        slot: "armor",
        bonus: 7,
        img: "outfit19.png",
    },
];

const artifactList = [
    {
        type: "artifact",
        village: "w",
        bonus: 10,
        index: 0,
        img: "WArtifact.png",
    },
    {
        type: "artifact",
        village: "e",
        bonus: 10,
        index: 0,
        img: "EArtifact.png",
    },
    {
        type: "artifact",
        village: "n",
        bonus: 10,
        index: 0,
        img: "NArtifact.png",
    },
];

const CHEST = {
    chests: [
        {
            selector: 0,
            index: 0,
            open: false,
            openRound: 0,
            coords: {
                x: 1,
                y: 1,
            },
        },
        {
            selector: 1,
            index: 14,
            open: false,
            openRound: 0,
            coords: {
                x: 1,
                y: 15,
            },
        },
        {
            selector: 2,
            index: 210,
            open: false,
            openRound: 0,
            coords: {
                x: 15,
                y: 1,
            },
        },
        {
            selector: 3,
            index: 224,
            open: false,
            openRound: 0,
            coords: {
                x: 15,
                y: 15,
            },
        },
    ],

    createNewTreasure(type) {
        let item;

        if (type === "treasure") {
            item = itemList[Math.floor(Math.random() * itemList.length)];
        } else {
            item = { ...artifactList[artifactList.findIndex((a) => a.village === type)] };
        }

        this.displayTreasure(type, item);
    },

    displayTreasure(type, treasure) {
        $(".treasureDisplay").innerHTML = "";

        const treasureCard = document.createElement("div");
        treasureCard.classList.add("treasureCard");
        treasureCard.classList.add("showBonus");
        treasureCard.style.backgroundImage = `url(./media/items/${treasure.img})`;
        treasureCard.dataset.bonus = treasure.bonus;

        treasureCard.addEventListener("click", () => {
            $(".treasureCard").style.transform = "scale(0)";

            setTimeout(() => {
                $(".treasureDisplay").style.display = "none";
            }, 500);

            INV.addItem(treasure);
            VILLAGE.removeItem();
        });

        $(".treasureDisplay").style.display = "flex";
        $(".treasureDisplay").append(treasureCard);

        setTimeout(() => {
            $(".treasureCard").style.transform = "scale(1)";
        }, 100);
    },

    emptyChest(chest) {
        (MAP.map[chest.index] = "C"),
            ($$(".chest")[chest.selector].style.backgroundColor = "black");
        chest.openRound = GAME.gameRound + 3;
    },

    checkChests() {
        this.chests.forEach((chest) => {
            if (chest.openRound === GAME.gameRound) {
                (MAP.map[chest.index] = "c"),
                    ($$(".chest")[chest.selector].style.backgroundColor = "brown");
            }
        });
    },
};
