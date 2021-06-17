import { winnerChecker, enemyAttack, playerAttack, $formFight } from './controls.js';
import { generateLogs } from './logs.js';
import Player from './Player/index.js';

import Game from './game/index.js';
const game = new Game();

game.start();







export const player1 = new Player({
    player: 1,
    name: 'GRISHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fork', 'spoon'],
    rootSelector: 'arenas',
});

export const player2 = new Player({
    player: 2,
    name: 'LENA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'plate'],
    rootSelector: 'arenas',
});

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
    const { hit, defence, value } = playerAttack();


    if (hitEnemy !== defence) {
        player1.changeHP(valueEnemy);
        generateLogs('hit', player2, player1, valueEnemy);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (hit !== defenceEnemy) {
        player2.changeHP(value);
        generateLogs('hit', player1, player2, value);
    } else {
        generateLogs('defence', player1, player2);
    }
    player1.renderHP();
    player2.renderHP();
    winnerChecker(player1, player2);
})

function init() {
    player1.createPlayer();
    player2.createPlayer();
    console.log(player1)
    generateLogs('start', player1, player2);
}

init();