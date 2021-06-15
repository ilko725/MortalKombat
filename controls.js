import { getRandom, createElement } from './utils.js';
import { player1, player2 } from './players.js';
import { generateLogs } from './logs.js'


const $fightButton = document.querySelector('.control .button');
export const $formFight = document.querySelector('.control');
export const $arenas = document.querySelector('.arenas');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);

};

function showResults(name) {
    const $resultTitle = createElement('div', 'resultTitle');
    if (name) {
        $resultTitle.innerText = `${name} Wins!`;
    } else {
        $resultTitle.innerText = 'Draw! You both are dead!';
    }
    return $resultTitle;
}

export function winnerChecker(player1, player2) {
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

function buttonDisabler() {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton();
    }
};

export function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    };
};

export function playerAttack() {
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