






/*
 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15*/ // 66 = Q
let mapString = 
`c  .  .  .  .  N  N  N  N  N  .  .  .  .  c
 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .
 .  .  x  .  .  .  .  .  .  .  .  .  x  .  .
 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .
 .  .  .  .  x  .  .  .  .  .  x  .  .  .  .
 W  .  .  .  .  .  .  .  .  .  .  .  .  .  E
 W  .  .  .  .  .  d  d  d  .  .  .  .  .  E
 W  .  .  .  .  .  d  D  d  .  .  .  .  .  E
 W  .  .  .  .  .  d  d  d  .  .  .  .  .  E
 W  .  .  .  .  .  .  .  .  .  .  .  .  .  E
 .  .  .  .  x  .  .  .  .  .  x  .  .  .  .
 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .
 .  .  x  .  .  .  .  .  .  .  .  .  x  .  .
 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .
 c  .  .  .  S  S  S  S  S  S  S  .  .  .  c`


const MAP = {
    map: mapString.split(/\s+|\r?\n/),
    playerPos: {},
    size: 15,

    indexCoords(index){
        return {
            x: Math.floor(index/this.size + 1) ,
            y: index % this.size + 1
        }
    },

    getCoords(n) {
        return $('#map').offsetWidth / this.size * (n - 1)
    },

    drawMap() {
        this.map.forEach((loc, index) => {
            
            const place = document.createElement('div');

            place.style.gridRowStart = this.indexCoords(index).x ;
            place.style.gridColumnStart = this.indexCoords(index).y   

            if (loc === 'x') {
                place.classList.add('light');
                $('#map').append(place);
            } else if (loc === 'c') {
                place.classList.add('chest');
                $('#map').append(place);
            } else if (loc === 'd') {
                place.classList.add('mountainTile');
                $('#map').append(place);
            } else if (loc === 'D') {
                place.classList.add('dragonTile');
                $('#map').append(place);
            } else if (loc === 'N') {
                place.classList.add('villageTile');
                place.classList.add('nVillage');
                $('#map').append(place);
            } else if (loc === 'E') {
                place.classList.add('villageTile');
                place.classList.add('eVillage');
                $('#map').append(place);
            } else if (loc === 'S') {
                place.classList.add('villageTile');
                place.classList.add('sVillage');
                $('#map').append(place);
            } else if (loc === 'W') {
                place.classList.add('villageTile');
                place.classList.add('wVillage');
                $('#map').append(place);
            } 
        })

    },

    location(x,y) {
        return this.map[this.size * (x-1) + (y-1)];
    },

    activePlayerLocation() {
        return this.map[this.size * (GAME.activePlayer().coords.x -1) + (GAME.activePlayer().coords.y -1)]
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