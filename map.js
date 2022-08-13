
/*
 1  2  3  4  5  6  7  8  9  10 11 12 */ // 66 = Q
let mapString = 
`c  .  .  .  n  n  n  n  .  .  .  c
 .  .  .  .  .  .  .  .  .  .  .  .
 .  .  .  .  .  .  .  .  .  .  .  .
 .  .  .  .  x  .  .  x  .  .  .  .
 w  .  x  .  .  .  .  .  .  x  .  e
 w  .  .  .  .  d  d  .  .  .  .  e
 w  .  .  .  .  d  d  .  .  .  .  e
 w  .  .  .  x  .  .  x  .  .  .  e
 .  .  .  .  .  .  .  .  .  .  .  .
 .  .  x  .  .  .  .  .  .  x  .  .
 .  .  .  .  .  .  .  .  .  .  .  .
 x  .  .  s  s  s  s  s  s  .  .  x`


const MAP = {
    map: mapString.split(/\s+|\r?\n/),
    playerPos: {},

    indexCoords(index){
        return {
            x: Math.floor(index/12 + 1) ,
            y: index % 12 + 1
        }
    },

    drawMap() {
        this.map.forEach((loc, index) => {
            
            const place = document.createElement('div');

            if (loc === 'x') {
                place.classList.add('light');
                $('#map').append(place);
            } else if (loc === 'c') {
                place.classList.add('chest');
                $('#map').append(place);
            }

            place.style.gridRowStart = this.indexCoords(index).x ;
            place.style.gridColumnStart = this.indexCoords(index).y            
            
        })

    },

    location(x,y) {
        return this.map[12 * (x-1) + (y-1)];
    },

    activePlayerLocation() {
        return this.map[12 * (GAME.activePlayer().coords.x -1) + (GAME.activePlayer().coords.y -1)]
    },

    // neighbours(x,y) {
    //     return {
    //         n: this.location(x - 1,y),
    //         e: this.location(x,y + 1),
    //         s: this.location(x + 1,y),
    //         w: this.location(x,y - 1),
    //     }
    // },

    playEvent() { // plays event depending on player location on map
        if (this.activePlayerLocation() === 'x') {
            GAME.addSixDie()
        }
        // else if 'c'
        // else if  'd'
        // ....
    }

}