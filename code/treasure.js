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
            selector: 0,
            index: 0,
            open: false,
            openRound: 0,
            coords: {
                x: 1,
                y: 1
            }
        },
        {   
            selector: 1,
            index: 14,
            open: false,
            openRound: 0,
            coords: {
                x: 1,
                y: 15
            }
        },
        {
            selector: 2,
            index: 210,
            open: false,
            openRound: 0,
            coords: {
                x: 15,
                y: 1
            }
        },
        {
            selector: 3,
            index: 224,
            open: false,
            openRound: 0,
            coords: {
                x: 15,
                y: 15
            }
        }
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

    },

    emptyChest(chest) {
        MAP.map[chest.index] = 'C',
        $$('.chest')[chest.selector].style.backgroundColor = "black";
        chest.openRound = GAME.gameRound + 3;
    },

    checkChests() {
        this.chests.forEach(chest => {
            if (chest.openRound === GAME.gameRound) {
                MAP.map[chest.index] = 'c',
                $$('.chest')[chest.selector].style.backgroundColor = "brown";
            }
        })
    },

}