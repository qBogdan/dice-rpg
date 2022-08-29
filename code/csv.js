let csvArray = [];

Papa.parse("./data/test.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (result) {
        csvArray = result.data;
    },
});
