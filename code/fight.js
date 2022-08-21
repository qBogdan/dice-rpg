
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
        <div class="fighter ${fighter.type === 'npc' ? 'npcFighter' : 'playerFighter'}">

                <div class="avatar">
                    <img src="./media/avatarPlaceholder.png" alt="">
                    <h1>${fighter.name}</h1>
                </div>

                <div class="healthBar">
                    <div class="barContainer">
                        <div class="bar" style="width:${100 / fighter.maxHealth * fighter.health}%" ></div>
                    </div>
                 </div>

                <div class="status">
                    <div class="statIcon maxHealth" > ${fighter.health}</div>
                    <div class="statIcon attack">${fighter.attack}</div>
                    <div class="statIcon defence">${fighter.defence}</div>
                </div>

            </div>`
    },

    fightStatsConstructor() {
        return `
            <div class="fightMenu">

                <div class="fightStats">

                    <div class="fightAction playerFightAction"></div>

                    <div class="fightResult">0</div>

                    <div class="fightAction npcFightAction"></div>

                </div>

                <div class="fightOptions">
                    <div class="attackAction  statIcon attack"></div>
                    <div class="defenceAction statIcon defence"></div>
                </div>
            </div>`
    },

    addACtionEvents() {
        $('.attackAction').addEventListener('click', () => {
            this.fight('attack')
        });

        $('.defenceAction').addEventListener('click', () => {
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

        this.displayChoices(playerAction , npcAction)

    },


    displayChoices(playerAction, npcAction) {
        

        $('.playerFightAction').innerHTML = `<div class="${playerAction.action === "attack" ? "attack" : "defence"}">
            ${playerAction.action === "attack" ? playerAction.die + GAME.activePlayer().attack : playerAction.die + GAME.activePlayer().defence}
        </div>`

        $('.npcFightAction').innerHTML = `<div class="${npcAction.action === "attack" ? "attack" : "defence"}">
            ${npcAction.action === "attack" ? npcAction.die + this.activeNPC.attack : npcAction.die + this.activeNPC.defence}
        </div>`

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
                winner.hit = npc.action === "attack" ? player.die + GAME.activePlayer().attack : (player.die + GAME.activePlayer().attack) - (this.activeNPC.defence + npc.die)
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
                winner.hit = (npc.die + this.activeNPC.attack) - (GAME.activePlayer().defence + player.die)
            }
        }

        return winner;
    },

    updateNpc() {
        $('.npcFighter .status .maxHealth').innerText = this.activeNPC.health;
        $('.npcFighter .bar').style.width = (100 / this.activeNPC.maxHealth) * this.activeNPC.health + '%'
    },

    updateVisuals(winner) {


        if (winner.name === "none") {

            $('.fightResult').style.color = "black"

        } else if (winner.name === "player") {

            $('.fightResult').style.color = "blue";
            this.activeNPC.health = this.activeNPC.health - winner.hit < 0 ? 0 : this.activeNPC.health - winner.hit ;

            if (this.activeNPC.health <= 0) {
                this.fighterDead('npc');
                return
            }

            this.updateNpc()

        } else {

            $('.fightResult').style.color = "red";
            GAME.activePlayer().health = GAME.activePlayer().health - winner.hit < 0 ? 0 : GAME.activePlayer().health - winner.hit ;

            if (GAME.activePlayer().health <= 0) {
                this.fighterDead('player');
                return
            }

            GAME.updatePlayerVisual();

        }

        $('.fightResult').innerText = winner.hit
    },

    fighterDead(fighter) {

        if (fighter === "npc") {

            DICE.removeDice(1);
            DICE.addSixDie();
            $('.fightResult').innerText = GAME.activePlayer().name + 'wins';
            this.updateNpc();
        }

        if (fighter === 'player') {
            $('.fightResult').innerText = 'NPC wins';
            GAME.updatePlayerVisual()
            setTimeout(() => {
                GAME.resetPlayer();
            }, 2000);
            
        }

        GAME.addbuttonDisplay();
        
        setTimeout(() => {
            $('.fightScene').style.display = 'none';
        }, 2000);
        
    }

}