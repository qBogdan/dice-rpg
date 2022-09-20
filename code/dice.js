const DICE = {
    rollDice() {
        $(".diceDisplay").innerHTML = ""; // resets dice container element
        player().diceRound = []; // resets current dice array
        for (let die = 0; die < player().diceNumber; die++) {
            let randomValue = Math.floor(Math.random() * 5) + 2; // generates random die from 2 to 6
            const dieElement = div();
            dieElement.classList.add("die", `die${randomValue}`);
            player().diceRound.push(randomValue); // adds die to player
            $(".diceDisplay").append(dieElement); // adds die lement to DOM
        }
    },

    removeDie(die) {
        player().diceRound.splice(
            player().diceRound.findIndex(x => x === die),
            1
        );
        $(`.die${die}`).remove();
    },

    addDie(die) {
        // adds a die when necesarry , mostly used for adding 6 and 1
        player().diceRound.push(die);
        const newDie = div();
        newDie.classList.add("die", `die${die}`);
        $(".diceDisplay").append(newDie);
    },
};
