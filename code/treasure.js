class TREASURE {
    constructor() {
        this.items = []
    }
}

const itemList = [
    {
        name: 'armor',
        type: 'defence',
        slot: 'armor',
        bonus: 3,
        img: 'outfit4.png'
    },

    {
        name: 'Fancy armor',
        type: 'defence',
        slot: 'armor',
        bonus: 7,
        img: 'outfit19.png'
    }
]

const CHEST = {

    chests: [
        {
            location: 'nw',
            open: false,
            openRound: 0,
        },
        {
            location: 'ne',
            open: false,
            openRound: 0,
        },
        {
            location: 'sw',
            open: false,
            openRound: 0,
        },
        {
            location: 'se',
            open: false,
            openRound: 0,
        },
    ],
    createNewTreasure() {
        const thisTreasure = this.randomTreasure();
        this.displayTreasure(thisTreasure)
    },

    randomTreasure() {
        return itemList[Math.floor(Math.random() * itemList.length)]
    },

    displayTreasure(thisTreasure) {
        $('.treasureDisplay').innerHTML = ""

        const treasureCard = document.createElement('div');
        treasureCard.classList.add('treasureCard');
        treasureCard.classList.add('showBonus');
        treasureCard.style.backgroundImage = `url(./media/items/${thisTreasure.img})`;
        treasureCard.dataset.bonus = thisTreasure.bonus;


        treasureCard.addEventListener('click', (treasureCard) => {

            $('.treasureCard').style.transform = "scale(0)";

            setTimeout(() => {
                $('.treasureDisplay').style.display = 'none';
            }, 500);

            INV.addItem(thisTreasure)
        })


        $('.treasureDisplay').style.display = 'flex';
        $('.treasureDisplay').append(treasureCard);

        setTimeout(() => {
            $('.treasureCard').style.transform = "scale(1)"
        }, 100);

    }


}