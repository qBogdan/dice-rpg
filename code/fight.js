
class NPC {
    constructor(level) {
        this.type = "npc",
        this.selector = "",
            this.name = 'Jasper',
            this.level = level,
            this.maxHealth = 6 + 5 * level,
            this.health = this.maxHealth,
            this.skillPoints = 3 + 3 * level
        this.attack = 0,
            this.defence = 0
    }
}

const FIGHT = {

    activeNPC: {},

    createNPC(lvl) {
        this.activeNPC = new NPC(lvl)
    },

    createScene() {
        this.createNPC(1);
        $('.fightDisplay').innerHTML = "";
        $('.fightScene').style.display = 'flex';
        $('.fightDisplay').innerHTML += this.fighterConstructor(GAME.activePlayer()) + this.fightStatsConstructor() + this.fighterConstructor(this.activeNPC)
        this.addACtionEvents();

    },

    fighterConstructor(fighter) {
        return `
        <div class="fighter">

                <div class="fPicture"></div>
                <h1>${fighter.name}</h1>

                <div class="healthBar">
                    <div class="bar">
                        <div class="${fighter.type === "npc" ? "npcBarValue" : "barValue"}" style="width:${100 / fighter.maxHealth * fighter.health}%" ></div>
                    </div>
                 </div>

                <div class="status">
                    <div class="${fighter.type === "npc" ? "npcHealthValue" : "healthValue"} ">${fighter.health}</div>
                    <div class="attack">${fighter.attack}</div>
                    <div class="defence">${fighter.defence}</div>
                </div>

            </div>`
    },

    fightStatsConstructor() {
        return `
            <div class="fightMenu">
                <div class="fightStats">

                    <div class="fightsStats">
                        <div class="thisAction"></div>
                        <div class="thisDie"></div>
                    </div>

                    <div class="fightResult">0</div>

                    <div class="fightsStats">
                        <div class="thisAction"></div>
                        <div class="thisDie"></div>
                    </div>

                </div>

                <div class="fightOptions">
                    <div class="attackAction attack"></div>
                    <div class="defenceAction defence"></div>
                </div>
            </div>`
    },

    addACtionEvents() {
        $('.attackAction').addEventListener('click', () => {
            console.log('attack');
            this.fight('attack')
        });

        $('.defenceAction').addEventListener('click', () => {
            console.log('defence');
            this.fight('defence')
        });
    },

    fight(action) {

        const playerAction = {
            action: action,
            die: Math.floor(Math.random() * 6) + 1
        }

        const npcAction = {
            action: ['attack', 'defence'][Math.floor(Math.random() * 2)],
            die: Math.floor(Math.random() * 6) + 1
        }

        const winner = this.determineWinner(action, playerAction, npcAction);

        this.updateVisuals(winner);

        //check win/lose condition
        //next turn
    },

    determineWinner(action, player, npc) {

        let winner = {
            name: 'none',
            hit: 0
        }

        if (action === "attack") {
            if ((player.die + GAME.activePlayer().attack) === (npc.die + this.activeNPC[action])) {
                winner.name = 'none',
                    winner.hit = 0
            } else if ((player.die + GAME.activePlayer().attack) > (npc.die + this.activeNPC[action])) {
                winner.name = 'player';
                winner.hit = npc.action === "attack" ? player.die + GAME.activePlayer().attack : (player.die + GAME.activePlayer().attack) - + this.activeNPC.defence
            } else {
                winner.name = "npc";
                winner.hit = npc.action === "attack" ? npc.die + this.activeNPC.attack : 1
            }
        }

        if (action === "defence") {
            if (npc.action === 'defence' || (player.die + GAME.activePlayer().defence) === (npc.die + this.activeNPC[action])) {
                winner.name = 'none',
                    winner.hit = 0
            } else if ((player.die + GAME.activePlayer().defence) > (npc.die + this.activeNPC[action])) {
                winner.name = 'player';
                winner.hit = 1
            } else {
                winner.name = "npc";
                winner.hit = (npc.die + this.activeNPC.attack) - GAME.activePlayer().defence
            }
        }

        return winner;
    },

    updateVisuals(winner) {


        if (winner.name === "none") {

            $('.fightResult').style.color = "black"

        } else if (winner.name === "player") {

            $('.fightResult').style.color = "blue";
            this.activeNPC.health -= winner.hit;

            if (this.activeNPC.health <= 0) {
                this.activeNPC.health = 0;
                this.fighterDead('npc');
            }

            $('.npcHealthValue').innerText = this.activeNPC.health;
            $('.npcBarValue').style.width = (100 / this.activeNPC.maxHealth) * this.activeNPC.health + '%'
        } else {

            $('.fightResult').style.color = "red";
            GAME.activePlayer().health -= winner.hit;

            if (GAME.activePlayer().health <= 0) {
                GAME.activePlayer().health = 0
                this.fighterDead('player')
            }

            $$('.healthValue').forEach(val => {
                val.innerText = GAME.activePlayer().health;
                console.log(val);
            });

            $$('.barValue').forEach(val => {
                val.style.width = (100 / GAME.activePlayer().maxHealth) * GAME.activePlayer().health + '%';
                console.log(val);
            })
        }

        $('.fightResult').innerText = winner.hit
    },

    fighterDead(fighter) {
        $('.fightResult').innerText = fighter + " is dead";

    }

}