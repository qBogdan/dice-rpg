const INV = {
    addItem(item) {
        if (GAME.activePlayer().items.length < 6) {
            GAME.activePlayer().items.push(item);
        }

        this.displayItems();
    },

    addEvents() {
        $$(".inventorySlot").forEach((slot, index) => {
            slot.addEventListener("click", (e) => {
                if (e.target.dataset.interactive == "true") {
                    this.equipItem(GAME.activePlayer().items[index], index);
                }
            });
        });
    },

    displayItems() {
        $$(".inventorySlot").forEach((slot, index) => {
            if (GAME.activePlayer().items[index] !== undefined) {
                if (GAME.activePlayer().items[index].type !== "artifact") {
                    slot.dataset.interactive = true;
                }
                slot.dataset.bonus = GAME.activePlayer().items[index].bonus;
                slot.classList.add("showBonus");
                slot.style.backgroundImage = `url("../media/items/${
                    GAME.activePlayer().items[index].img
                }.png")`;
            } else {
                slot.classList.remove("showBonus");
                slot.dataset.interactive = false;
                slot.style.backgroundImage = "url(./media/inventorySlot.png)";
            }
        });
    },

    equipItem(item, index) {
        GAME.activePlayer().items.splice(index, 1);

        if (GAME.activePlayer().equipment[item.type] !== undefined) {
            GAME.activePlayer().items.push(GAME.activePlayer().equipment[item.type]);
        }

        GAME.activePlayer().equipment[item.type] = item;

        this.displayItems();
        this.displayEquipment();
    },

    displayEquipment() {
        $$(".equipmentSlot").forEach((slot) => {
            slot.style.backgroundImage = `url(./media/${slot.dataset.slot}.png)`;
            slot.classList.remove("showBonus");
        });

        for (let item in GAME.activePlayer().equipment) {
            if (GAME.activePlayer().equipment[item] !== undefined) {
                $(
                    `.${GAME.activePlayer().equipment[item].slot}`
                ).style.backgroundImage = `url(./media/items/${
                    GAME.activePlayer().equipment[item].img
                }.png)`;
                $(`.${GAME.activePlayer().equipment[item].slot}`).dataset.bonus =
                    GAME.activePlayer().equipment[item].bonus;
                $(`.${GAME.activePlayer().equipment[item].slot}`).classList.add("showBonus");

                this.updatePlayerStats(item);
            }
        }
    },

    updatePlayerStats(item) {
        GAME.activePlayer()[item] = GAME.activePlayer().equipment[item].bonus;
        $(`.playerStats .${item}`).innerText = GAME.activePlayer()[item];
    },
};
