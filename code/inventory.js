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
            if (item !== undefined) {
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
                slot.style.backgroundImage = "url(../media/inventorySlot.png)";
            }
        });
    },

    displayEquipment() {
        const eq = player().equipment;
        for (let item in eq) {
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
        const bonus = parseInt(item.bonus);
        if (item.type === "defence" || item.type === "attack" || item.type === "accesory") {
            this.equipItem(item, index);
        } else if (item.type === "heal") {
            if (player().health < player().maxHealth) {
                if (player().health + bonus >= player().maxHealth) {
                    player().health = player().maxHealth;
                } else {
                    player().health += bonus;
                }

                player().items.splice(index, 1);
                GAME.updateLifeBar();
                this.displayItems();
            }
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

        this.displayEquipment();
        this.displayItems();
    },
};
