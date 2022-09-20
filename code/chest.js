const CHEST = {
    chests: [
        { selector: 0, index: 0, open: false, openRound: 0, coords: { x: 1, y: 1 } },
        { selector: 1, index: 14, open: false, openRound: 0, coords: { x: 1, y: 15 } },
        { selector: 2, index: 210, open: false, openRound: 0, coords: { x: 15, y: 1 } },
        { selector: 3, index: 224, open: false, openRound: 0, coords: { x: 15, y: 15 } },
    ],

    createTreasure() {
        // choose treasure based on rarity from separate treasure array
        const item = gameItems[Math.floor(Math.random() * gameItems.length)];
        this.displayTreasure(item);
    },

    displayTreasure(item) {
        $(".treasureDisplay").innerHTML = "";
        const treasureCard = div();
        treasureCard.classList.add("treasureCard", "showBonus");
        treasureCard.style.backgroundImage = `url(../media/items/${item.img}.png)`;
        treasureCard.dataset.bonus = item.bonus;

        let cancel = div();
        cancel.innerText = "Cancel";
        cancel.classList.add("cancel");
        let take = div();
        take.innerText = "Take";
        take.classList.add("take");

        cancel.addEventListener("click", () => {
            $(".treasureCard").style.transform = "scale(0)";

            setTimeout(() => {
                $(".treasureDisplay").style.display = "none";
            }, 500);

            $(".take").style.pointerEvents = "none";
            $(".cancel").style.pointerEvents = "none";
        });

        take.addEventListener("click", () => {
            $(".treasureCard").style.transform = "scale(0)";

            setTimeout(() => {
                $(".treasureDisplay").style.display = "none";
            }, 500);

            INV.addItem(item);

            $(".take").style.pointerEvents = "none";
            $(".cancel").style.pointerEvents = "none";
        });

        $(".treasureDisplay").append(treasureCard, cancel, take);
        $(".treasureDisplay").style.display = "flex";

        setTimeout(() => {
            $(".treasureCard").style.transform = "scale(1)";
        }, 100);
    },

    // displayTreasure(type, treasure) {
    //     $(".treasureDisplay").innerHTML = "";

    //     const treasureCard = div();
    //     treasureCard.classList.add("treasureCard");
    //     treasureCard.classList.add("showBonus");
    //     treasureCard.style.backgroundImage = `url(../media/items/${treasure.img}.png)`;
    //     treasureCard.dataset.bonus = treasure.bonus;

    //     let cancel = div();
    //     cancel.innerText = "Cancel";
    //     cancel.classList.add("cancel");
    //     let take = div();
    //     take.innerText = "Take";
    //     take.classList.add("take");

    //     cancel.addEventListener("click", () => {
    //         $(".treasureCard").style.transform = "scale(0)";

    //         setTimeout(() => {
    //             $(".treasureDisplay").style.display = "none";
    //         }, 500);

    //         $(".take").style.pointerEvents = "none";
    //         $(".cancel").style.pointerEvents = "none";
    //     });

    //     take.addEventListener("click", () => {
    //         $(".treasureCard").style.transform = "scale(0)";

    //         setTimeout(() => {
    //             $(".treasureDisplay").style.display = "none";
    //         }, 500);

    //         INV.addItem(treasure);
    //         VILLAGE.removeItem();
    //         if (type === "treasure") {
    //             //  this.emptyChest();
    //         }

    //         $(".take").style.pointerEvents = "none";
    //         $(".cancel").style.pointerEvents = "none";
    //     });

    //     $(".treasureDisplay").append(treasureCard, cancel, take);
    //     $(".treasureDisplay").style.display = "flex";

    //     setTimeout(() => {
    //         $(".treasureCard").style.transform = "scale(1)";
    //     }, 100);
    // },

    // emptyChest(chest) {
    //     (MAP.map[chest.index] = "C"),
    //         ($$(".chest")[chest.selector].style.backgroundColor = "black");
    //     chest.openRound = GAME.gameRound + 3;
    // },

    // checkChests() {
    //     this.chests.forEach(chest => {
    //         if (chest.openRound === GAME.gameRound) {
    //             (MAP.map[chest.index] = "c"),
    //                 ($$(".chest")[chest.selector].style.backgroundColor = "brown");
    //         }
    //     });
    // },
};
