import Player from '../Player/index.js';
import { HIT, ATTACK, LOGS } from '../constants/index.js';
import { getRandom, createElement, displayCurrentTime } from '../utils/index.js';

class Game {
    constructor(props) {
        this.player1 = new Player({
            player: 1,
            name: 'GRISHA',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            weapon: ['fork', 'spoon'],
            rootSelector: 'arenas',
        });

        this.player2 = new Player({
            player: 2,
            name: 'LENA',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
            weapon: ['knife', 'plate'],
            rootSelector: 'arenas',
        });
        this.$formFight = document.querySelector('.control');
        this.$arenas = document.querySelector('.arenas');
        this.$fightButton = document.querySelector('.control .button');
        this.$chat = document.querySelector('.chat');
    };

    getPlayers = async() => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    };

    ///////////////////////////////  CONTROLS

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Restart';

        $reloadButton.addEventListener('click', function() {
            window.location.pathname = 'index.html';
        });

        $reloadWrap.appendChild($reloadButton);
        this.$arenas.appendChild($reloadWrap);
    };

    showResults = (name) => {
        const $resultTitle = createElement('div', 'resultTitle');
        if (name) {
            $resultTitle.innerText = `${name} Wins!`;
        } else {
            $resultTitle.innerText = 'Draw! You both are dead!';
        }
        return $resultTitle;
    }

    winnerChecker = (player1, player2) => {
        if (player1.hp === 0 && player2.hp > player1.hp) {
            this.$arenas.appendChild(this.showResults(player2.name));
            this.generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player1.hp > player2.hp) {
            this.$arenas.appendChild(this.showResults(player1.name));
            this.generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            this.$arenas.appendChild(this.showResults());
            this.generateLogs('draw');
        };
        if (player1.hp === 0 || player2.hp === 0) {
            this.$fightButton.disabled = true;
            this.createReloadButton();
        }
    }


    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        };
    };

    // justAttack = async() => {
    //     const hit = 'body';
    //     const defence = 'foot';
    //     const fight = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             hit,
    //             defence,
    //         })
    //     });
    //     fight.then(response => {
    //         console.log('fuck');
    //         console.log(response);
    //     })
    //     return fight;
    // };

    playerAttack = () => {
        const attack = {};

        for (let item of this.$formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            };

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            };

            item.checked = false;
        };
        return attack;
    };
    ///////////////////////////////  LOGS

    getTextLog = (type, playerName1, playerName2) => {
        switch (type) {
            case 'start':
                return LOGS[type].replace('[player1]', playerName1).replace('[player2]', playerName2).replace('[time]', displayCurrentTime());
            case 'hit':
            case 'defence':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1].replace('[playerKick]', playerName1).replace('[playerDefence]', playerName2);
            case 'end':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1].replace('[playerWins]', playerName1).replace('[playerLose]', playerName2);
            case 'draw':
                return LOGS[type];
            default:
                return;
        }
    }

    generateLogs = (type, { name } = {}, { name: playerName2, hp } = {}, damage) => {
        let text = this.getTextLog(type, name, playerName2);
        switch (type) {
            case 'hit':
                text = `${displayCurrentTime()} - ${text} -${damage} [${hp}/100]`;
                break;
            case 'defence':
                text = `${displayCurrentTime()} - ${text}`;
                break;
            case 'end':
            case 'start':
            case 'draw':
                break;
            default:
                return;
        }
        const el = `<p>${text}</p>`;
        this.$chat.insertAdjacentHTML('afterbegin', el);
    }

    ///////////////////////////////  START

    start = async() => {
        const players = await this.getPlayers();
        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = players[getRandom(players.length) - 1];
        const player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });
        const player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        });
        // const justAttack = this.justAttack();
        // console.log(justAttack);
        player1.createPlayer();
        player2.createPlayer();
        JSON.parse(localStorage.getItem('player1'));

        this.$formFight.addEventListener('submit', (e) => {
            e.preventDefault();

            const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = this.enemyAttack();
            const { hit, defence, value } = this.playerAttack();

            if (hitEnemy !== defence) {
                player1.changeHP(valueEnemy);
                this.generateLogs('hit', player2, player1, valueEnemy);
            } else {
                this.generateLogs('defence', player2, player1);
            }

            if (hit !== defenceEnemy) {
                player2.changeHP(value);
                this.generateLogs('hit', player1, player2, value);
            } else {
                this.generateLogs('defence', player1, player2);
            }
            player1.renderHP();
            player2.renderHP();
            this.winnerChecker(player1, player2);
        })

        this.generateLogs('start', player1, player2);
    }
};

export default Game;