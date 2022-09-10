const SHOP = {
    addEvents() {
        $(".leaveShop").addEventListener("click", () => {
            $("#shop").style.display = "none";
        });
    },

    openShop() {
        console.log("shop");
        $("#shop").style.display = "flex";
    },
};
