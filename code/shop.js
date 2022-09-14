const SHOP = {
    addEvents() {
        $(".leaveShop").addEventListener("click", () => {
            $("#shop").style.display = "none";
        });
    },

    mode: "buy",

    openShop(village) {
        const stock = gameItems.filter((i) => i.village === village);
        console.log(stock);

        $("#shop").style.display = "flex";
        this.displayItems(stock);
        // this.previewItem(stock.find((i) => (i.tier = "S")));
        // this.setShopButton();
    },

    displayItems(stock) {
        const shopItems = $(".shopItems");
        const sellItems = $(".sellItems");

        shopItems.innerHTML = "";
        sellItems.innerHTML = "";

        for (let i = 0; i < 6; i++) {
            const shopCell = document.createElement("div");
            const sellCell = document.createElement("div");
            shopCell.classList.add("shopItem");
            sellCell.classList.add("sellItem");

            if (stock[i] !== undefined) {
                shopCell.style.backgroundImage = `url(../media/items/${stock[i].img}.png)`;
                shopCell.addEventListener("click", () => {
                    this.previewItem(stock[i]);
                    this.mode = "buy";
                });
            }

            if (GAME.activePlayer().items[i]) {
                sellCell.style.backgroundImage = `../media/items/${
                    GAME.activePlayer().items[i]
                }.png`;
                shopCell.addEventListener("click", () => {
                    this.previewItem(stock[i]);
                    this.mode = "sell";
                });
            }

            shopItems.append(shopCell);
            sellItems.append(sellCell);
        }
    },

    previewItem(item) {
        $(".prevItem").innerHTML = "";

        const selectedItem = document.createElement("div");
        const description = document.createElement("p");

        selectedItem.classList.add("selectedItem");
        selectedItem.style.backgroundImage = `url(../media/items/${item.img}.png)`;

        description.innerText = item.description;

        $(".prevItem").append(selectedItem, description);

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
        console.log(`${item.name} bought for ${item.price}`);
    },

    buyItem(item) {
        console.log(`${item.name} bought for ${item.price}`);
    },
};
