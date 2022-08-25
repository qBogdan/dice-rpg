const DICE = {
    createDice() {
        // create random dice elements
        $(".diceDisplay").innerHTML = ""; // resets dice container element
        GAME.activePlayer().diceRound = []; // resets current dice array

        let startN = 1;
        let endN = 6;

        for (let i = 0; i < GAME.activePlayer().diceNumber; i++) {
            //let dieR = Math.floor(Math.random() * endN) + startN; // creates random number
            let dieR = 6; // temp all 6

            if (dieR === 1) {
                // prevents game from having more than one attack per turn
                startN = 2;
                endN = 5;
            }

            let die = document.createElement("div"); // create die element
            die.classList.add("die");
            die.classList.add(`die${dieR}`);

            GAME.activePlayer().diceRound.push(dieR); // push die number to player array

            $(".diceDisplay").append(die);
        }
    },

    removeDice(dieNr) {
        // removes die element once used
        let dieI = GAME.activePlayer().diceRound.findIndex((x) => x === dieNr);
        GAME.activePlayer().diceRound.splice(dieI, 1);
        $$(".die")[dieI].remove();
    },

    addSixDie() {
        GAME.activePlayer().diceRound.push(6);
        let six = document.createElement("div");
        six.classList.add("die");
        six.classList.add("die6");
        $(".diceDisplay").append(six);
    },

    rollDice() {
        this.createDice();
        // dice animation;
    },
};
