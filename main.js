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

function randomDamage() {
    return Math.ceil(Math.random() * 20);
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    randomHit = randomDamage();
    if (player.hp > randomHit) {
        player.hp -= randomHit;
    } else {
        player.hp = 0;
    };
    $playerLife.style.width = player.hp + '%';
};

function playerWins(name) {
    if (name) {
        const $winsTitle = createElement('div', 'winsTitle');
        $winsTitle.innerText = name + '  Wins!';

        return $winsTitle;
    } else {
        const $drawTitle = createElement('div', 'winsTitle');
        $drawTitle.innerText = 'Split! You both are dead!';

        return $drawTitle;
    }
}


function winnerChecker(player1, player2) {
    if (player1.hp == 0 && player2.hp > player1.hp) {
        $arenas.appendChild(playerWins(player2.name));
        $randomButton.disabled = true;
    } else if (player2.hp == 0 && player1.hp > player2.hp) {
        $arenas.appendChild(playerWins(player1.name));
        $randomButton.disabled = true;
    } else if (player1.hp == 0 && player2.hp == 0) {
        $arenas.appendChild(playerWins());
        $randomButton.disabled = true;
    }
}

$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
    winnerChecker(player1, player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));