const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.control .button');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fork', 'spoon'],
    changeHP,
    elHP,
    renderHP,
};
const player2 = {
    player: 2,
    name: 'Grisha',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'plate'],
    changeHP,
    elHP,
    renderHP,
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

function createPlayer(playerObject) {
    const $player = createElement('div', 'player' + playerObject.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = playerObject.hp + '%';
    $name.innerText = playerObject.name;
    $img.src = playerObject.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);

    return $player;
};

function getRandom(max) {
    return Math.ceil(Math.random() * max);
}

function changeHP(damage) {
    if (this.hp > damage) {
        this.hp -= damage;
    } else {
        this.hp = 0;
    };
    return this.hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    return this.elHP().style.width = this.hp + '%';
}

function showResults(name) {
    const $resultTitle = createElement('div', 'resultTitle');
    if (name) {
        $resultTitle.innerText = name + '  Wins!';
    } else {
        $resultTitle.innerText = 'Draw! You both are dead!';
    }
    return $resultTitle;
}

function winnerChecker(player1, player2) {
    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showResults(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp) {
        $arenas.appendChild(showResults(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResults());
    }
}

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

function buttonDisabler() {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton();
    }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }
    return attack;
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
    }

    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
    }
    player1.renderHP();
    player2.renderHP();
    winnerChecker(player1, player2);
    buttonDisabler();
})