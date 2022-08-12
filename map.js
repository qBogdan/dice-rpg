
/*
 1  2  3  4  5  6  7  8  9  10 11 12 */
let mapString = 
`c  .  .  .  n  n  n  n  .  .  .  c
 .  .  .  .  .  .  .  .  .  .  .  .
 .  .  x  .  .  .  .  .  .  x  .  .
 .  .  .  .  .  .  x  .  .  .  .  .
 w  .  .  .  .  N  .  .  .  .  .  e
 w  .  .  x  W  Q  E  .  .  .  .  e
 w  .  .  .  .  S  d  .  x  .  .  e
 w  .  .  .  .  .  .  .  .  .  .  e
 .  .  .  .  .  x  .  .  .  .  .  .
 .  .  x  .  .  .  .  .  .  x  .  .
 .  .  .  .  .  .  .  .  .  .  .  .
 x  .  .  s  s  s  s  s  s  .  .  x`


const MAP = {
    map: mapString.split(/\s+|\r?\n/),
    playerPos: {},


    location(x,y) {
        return this.map[12 * (x-1) + (y-1)];
    },

    activePlayerLocation() {
        return this.map[12 * (GAME.activePlayer().coords.x -1) + (GAME.activePlayer().coords.y -1)]
    },

    neighbours(x,y) {
        return {
            n: this.map[12 * (x-2) + (y-1)],
            e: this.map[12 * (x-1) +  y   ],
            s: this.map[12 *  x    + (y-1)],
            w: this.map[12 * (x-1) + (y-2)]
        }
    },

    playEvent() { // plays event depending on player location on map
        if (this.activePlayerLocation() === 'x') {
            GAME.addSixDie()
        }
        // else if 'c'
        // else if  'd'
        // ....
    }

}