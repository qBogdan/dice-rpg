const SHOP = {
    addEvents() {
        $(".leaveShop").addEventListener("click", () => {
            $("#shop").style.display = "none";
            INV.displayItems();
            GAME.updatePlayerVisual();
            $(".prevItem").innerHTML = "";
            $(".shopAction").innerHTML = "";
        });
    },

    mode: "buy",

    openShop(village) {
        const stock = gameItems.filter((i) => i.village === village);
        $("#shop").style.display = "flex";
        this.displayItems(stock);
    },

    displayItems(stock) {
        const shopItems = $(".shopItems");
        shopItems.innerHTML = "";
        const sellItems = $(".sellItems");
        sellItems.innerHTML = "";

        for (let i = 0; i < 6; i++) {
            const shopCell = document.createElement("div");
            shopCell.classList.add("shopItem");

            if (stock[i] !== undefined) {
                shopCell.style.backgroundImage = `url(../media/items/${stock[i].img}.png)`;
                shopCell.addEventListener("click", () => {
                    this.mode = "buy";
                    this.previewItem(stock[i]);
                });
            }

            shopItems.append(shopCell);
        }

        this.displaySellItems();
        $("#currentGold").innerText = GAME.activePlayer().gold;
    },

    displaySellItems() {
        const sellItems = $(".sellItems");
        sellItems.innerHTML = "";

        for (let i = 0; i < 6; i++) {
            const sellCell = document.createElement("div");
            sellCell.classList.add("sellItem");

            if (GAME.activePlayer().items[i] !== undefined) {
                console.log(GAME.activePlayer().items[i].name);
                sellCell.style.backgroundImage = `url(../media/items/${
                    GAME.activePlayer().items[i].img
                }.png)`;
                sellCell.addEventListener("click", () => {
                    this.mode = "sell";
                    this.previewItem(GAME.activePlayer().items[i]);
                });
            }

            sellItems.append(sellCell);
        }
        $("#currentGold").innerText = GAME.activePlayer().gold;
    },

    previewItem(item) {
        $(".prevItem").innerHTML = "";

        const selectedItem = document.createElement("div");
        const description = document.createElement("p");
        const price = document.createElement("p");

        selectedItem.classList.add("selectedItem");
        selectedItem.style.backgroundImage = `url(../media/items/${item.img}.png)`;

        description.innerText = item.description;
        price.innerText = `Price: ${
            this.mode === "buy" ? item.price : Math.floor(item.price / 2)
        } gold`;

        $(".prevItem").append(selectedItem, description, price);

        this.setShopButton(item);
    },

    setShopButton(item) {
        $(".shopAction").innerHTML = "";
        const shopButton = document.createElement("button");
        shopButton.innerText = this.mode;

        shopButton.addEventListener("click", () => {
            if (this.mode === "sell") {
                this.sellItem(item);
            } else {
                this.buyItem(item);
            }
        });
        $(".shopAction").append(shopButton);
    },

    sellItem(item) {
        GAME.activePlayer().items = GAME.activePlayer().items.filter((i) => i.name !== item.name);
        GAME.activePlayer().gold += Math.floor(item.price / 2);
        this.displaySellItems();
    },

    buyItem(item) {
        if (GAME.activePlayer().items.length < 6 && GAME.activePlayer().gold >= item.price) {
            GAME.activePlayer().items.push(item);
            GAME.activePlayer().gold -= item.price;
            this.displaySellItems();
        } else {
            alert("no monies or space");
        }
    },
};
