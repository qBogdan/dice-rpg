const INV = {
    addItem(item) {
        if (player().items.length < 6) {
            player().items.push(item);
        } else {
            alert("no inventory space"); // replace with something pretty
        }

        this.displayItems();
    },

    displayItems() {
        $$(".inventorySlot").forEach((slot, index) => {
            const item = player().items[index];
            if (item) {
                slot.dataset.index = index;
                slot.dataset.type = item.type;
                slot.dataset.bonus = item.bonus;
                slot.classList.add("showBonus");
                slot.style.cursor = "pointer";
                slot.style.backgroundImage = `url("../media/items/${item.img}.png")`;
            } else {
                slot.classList.remove("showBonus");
                slot.dataset.type = "empty";
                slot.style.cursor = "auto";
                slot.backgroundImage = "url(./media/inventorySlot.png)";
            }
        });
    },

    displayEquipment() {
        const eq = player().equipment;
        for (let item in eq) {
            console.log(item);
            if (eq[item]) {
                const slot = $(`[data-slot="${eq[item].type}Slot"]`);
                slot.style.backgroundImage = `url(../media/items/${eq[item].img}.png`;
                slot.dataset.bonus = eq[item].bonus;
                slot.classList.add("showBonus");
            } else {
                $(`[data-slot="${item}Slot"]`).style.backgroundImage = `url(./media/${item}Slot.png)`;
                $(`[data-slot="${item}Slot"]`).classList.remove("showBonus");
            }
        }
    },

    useItem(item, index) {
        if (item.type === "defence" || item.type === "attack" || item.type === "accesory") {
            this.equipItem(item, index);
        } else if (item.type === "heal") {
            //heal item
        } else {
            alert("what type is this item ??");
        }
    },

    equipItem(item, index) {
        player().items.splice(index, 1);

        if (player().equipment[item.type] !== undefined) {
            player().items.push(player().equipment[item.type]);
        }

        player().equipment[item.type] = item;

        this.displayItems();
        this.displayEquipment();
    },

    // consumeItem(item, index) {
    //     if (GAME.activePlayer().health < GAME.activePlayer().maxHealth) {
    //         if (
    //             GAME.activePlayer().health + parseInt(item.bonus) >=
    //             GAME.activePlayer().maxHealth
    //         ) {
    //             GAME.activePlayer().health = GAME.activePlayer().maxHealth;
    //         } else {
    //             GAME.activePlayer().health += parseInt(item.bonus);
    //         }

    //         GAME.activePlayer().items.splice(index, 1);
    //         this.displayItems();
    //         GAME.displayCurrentPlayer();
    //     }
    // },

    // displayEquipment() {
    //     $$(".equipmentSlot").forEach((slot) => {
    //         slot.style.backgroundImage = `url(./media/${slot.dataset.slot}.png)`;
    //         slot.classList.remove("showBonus");
    //     });

    //     for (let item in GAME.activePlayer().equipment) {
    //         if (GAME.activePlayer().equipment[item] !== undefined) {
    //             $(
    //                 `.${GAME.activePlayer().equipment[item].slot}`
    //             ).style.backgroundImage = `url(./media/items/${
    //                 GAME.activePlayer().equipment[item].img
    //             }.png)`;
    //             $(`.${GAME.activePlayer().equipment[item].slot}`).dataset.bonus =
    //                 GAME.activePlayer().equipment[item].bonus;
    //             $(`.${GAME.activePlayer().equipment[item].slot}`).classList.add("showBonus");

    //             this.updatePlayerStats(item);
    //         }
    //     }
    // },

    // updatePlayerStats(item) {
    //     GAME.activePlayer()[item] = GAME.activePlayer().equipment[item].bonus;
    //     $(`.playerStats .${item}`).innerText = GAME.activePlayer()[item];
    // },
};
