import { createElement } from './utils.js';

export const player1 = {
    player: 1,
    name: 'GRISHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fork', 'spoon'],
    changeHP,
    elHP,
    renderHP,
};

export const player2 = {
    player: 2,
    name: 'LENA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'plate'],
    changeHP,
    elHP,
    renderHP,
};

export function createPlayer({ player, hp, name, img }) {
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = `${hp}%`;
    $name.innerText = name;
    $img.src = img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);

    return $player;
};

function changeHP(damage) {
    if (this.hp > damage) {
        this.hp -= damage;
    } else {
        this.hp = 0;
    };
    return this.hp;
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    return this.elHP().style.width = `${this.hp}%`;
}