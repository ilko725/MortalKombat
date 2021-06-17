import { winnerChecker, enemyAttack, playerAttack, $formFight } from '../controls.js';
import { generateLogs } from '../logs.js';
import { createElement } from '../utils/index.js';
import Player from '../Player/index.js';

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
        // export const $formFight = document.querySelector('.control');
        //this.formFight = props.$formFight;
    };

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Restart';

        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        });

        $reloadWrap.appendChild($reloadButton);
        $arenas.appendChild($reloadWrap);

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

    buttonDisabler = () => {
        if (player1.hp === 0 || player2.hp === 0) {
            $fightButton.disabled = true;
            createReloadButton();
        }
    };

    winnerChecker = (player1, player2) => {
        if (player1.hp === 0 && player2.hp > player1.hp) {
            $arenas.appendChild(showResults(player2.name));
            generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player1.hp > player2.hp) {
            $arenas.appendChild(showResults(player1.name));
            generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(showResults());
            generateLogs('draw');
        };
        buttonDisabler();
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

    playerAttack = () => {
        const attack = {};

        for (let item of $formFight) {
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

    // formFight.addEventListener('submit', function(e) {
    //     e.preventDefault();

    //     const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
    //     const { hit, defence, value } = playerAttack();


    //     if (hitEnemy !== defence) {
    //         player1.changeHP(valueEnemy);
    //         generateLogs('hit', player2, player1, valueEnemy);
    //     } else {
    //         generateLogs('defence', player2, player1);
    //     }

    //     if (hit !== defenceEnemy) {
    //         player2.changeHP(value);
    //         generateLogs('hit', player1, player2, value);
    //     } else {
    //         generateLogs('defence', player1, player2);
    //     }
    //     player1.renderHP();
    //     player2.renderHP();
    //     winnerChecker(player1, player2);
    // })

    start = () => {
        this.player1.createPlayer();
        this.player2.createPlayer();
        console.log(this.player2);
        // generateLogs('start', player1, player2);
    }
};

export default Game;