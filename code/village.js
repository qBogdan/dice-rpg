const VILLAGE = {

    villages: [], // list of villages objects
    items: [], // village Items

    createItem(village) { // creates and places an object for the specified village

        MAP.map[MAP.freeLocation()] = 'Q'
        MAP.drawMap()
    },

    removeItem() { // removes object once grabbed by a player

    }


}