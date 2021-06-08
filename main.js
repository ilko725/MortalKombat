const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fork', 'spoon'],
    attack: function() {
        console.log(player1.name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};
const player2 = {
    player: 2,
    name: 'Grisha',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'plate'],
    attack: function() {
        console.log(player2.name + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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

function randomDamage(max) {
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
    return this.lifeBar = document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    return this.lifeBar.style.width = this.hp + '%';
}

function showResults(name) {
    const $resultTitle = createElement('div', 'resultTitle');
    if (name) {
        $resultTitle.innerText = name + '  Wins!';
    } else {
        $resultTitle.innerText = 'Split! You both are dead!';
    }
    return $resultTitle;
}


function winnerChecker(player1, player2) {
    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showResults(player2.name));
        $randomButton.disabled = true;
    } else if (player2.hp === 0 && player1.hp > player2.hp) {
        $arenas.appendChild(showResults(player1.name));
        $randomButton.disabled = true;
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResults());
        $randomButton.disabled = true;
    }
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);

    return $reloadWrap;
};

function reloadButtonActivation() {
    if ($randomButton.disabled) {
        $arenas.appendChild(createReloadButton());
        const $reloadButton = document.querySelector('.reloadWrap .button');

        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        });
    };
}

$randomButton.addEventListener('click', function() {
    player1.changeHP(randomDamage(20));
    player2.changeHP(randomDamage(20));
    player1.elHP();
    player2.elHP();
    player1.renderHP();
    player2.renderHP();
    winnerChecker(player1, player2);
    reloadButtonActivation();

});
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));