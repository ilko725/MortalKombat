const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.control .button');
const $chat = document.querySelector('.chat');
const date = new Date();

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    player: 1,
    name: 'GRISHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fork', 'spoon'],
    changeHP,
    elHP,
    renderHP,
};
const player2 = {
    player: 2,
    name: 'LENA',
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
    const $player = createElement('div', `player${playerObject.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = `${playerObject.hp}%`;
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
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    return this.elHP().style.width = `${this.hp}%`;
}

function showResults(name) {
    const $resultTitle = createElement('div', 'resultTitle');
    if (name) {
        $resultTitle.innerText = `${name} Wins!`;
    } else {
        $resultTitle.innerText = 'Draw! You both are dead!';
    }
    return $resultTitle;
}

function winnerChecker(player1, player2) {
    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showResults(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player1.hp > player2.hp) {
        $arenas.appendChild(showResults(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResults());
        generateLogs('draw');
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function displayCurrentTime() {
    return `${date.getHours()}:${date.getMinutes()}`
}

function generateLogs(type, player1, player2, damage) {
    switch (type) {
        case 'start':
            const startText = logs[type].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', displayCurrentTime());
            const startEl = `<p>${startText}</p>`;
            $chat.insertAdjacentHTML('afterbegin', startEl);
            break;
        case 'hit':
            const hitText = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const hitEl = `<p style="color: #F00;">${displayCurrentTime()} - ${hitText} -${damage} [${player2.hp}/100]</p>`;
            $chat.insertAdjacentHTML('afterbegin', hitEl);
            break;
        case 'defence':
            const defenceText = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const defenceEl = `<p style="color: #4F4;">${displayCurrentTime()} - ${defenceText}</p>`;
            $chat.insertAdjacentHTML('afterbegin', defenceEl);
            break;
        case 'end':
            const endEl = logs[type][getRandom(logs[type].length) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            $chat.insertAdjacentHTML('afterbegin', endEl);
            break;
        case 'draw':
            const drawEl = logs[type];
            $chat.insertAdjacentHTML('afterbegin', drawEl);
            break;
    }
}

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
    buttonDisabler();
})