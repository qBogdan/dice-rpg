let gameItems = [];

Papa.parse("./data/gameItems.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (result) {
        gameItems = result.data;
    },
});
