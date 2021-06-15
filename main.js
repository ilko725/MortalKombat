import { player1, player2, createPlayer } from './players.js';
import { generateLogs } from './logs.js';
import { winnerChecker, enemyAttack, playerAttack, $formFight, $arenas } from './controls.js';

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player2, player1);

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();


    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2);
    }
    player1.renderHP();
    player2.renderHP();
    winnerChecker(player1, player2);
})