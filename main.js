const player1 = {
    name: 'Scorpion',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['fork', 'spoon'],
    attack: function() {
        console.log(player1.name + ' Fight...');
    },
};
const player2 = {
    name: 'Grisha',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'plate'],
    attack: function() {
        console.log(player2.name + 'Fight...');
    },
};
/* Task #2

*/

/*
function createPlayerTask2(playernumber, name, hp, img) {
    const $player1 = document.createElement('div');
    $player1.classList.add(playernumber);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = name;

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $arenas = document.querySelector('.arenas');
    const $img = document.createElement('img');
    $img.src = img;

    $arenas.appendChild($player1);
    $player1.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player1.appendChild($character);
    $character.appendChild($img);
};

createPlayerTask2('player1', "SCORPION", 50, player1.img);
createPlayerTask2('player2', "SUB-ZERO", 80, player2.img);
*/

/* Task #3

*/
function createPlayerTask3(playerposition, playerobject) {
    const $player = document.createElement('div');
    $player.classList.add(playerposition);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = playerobject.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerobject.name;

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $arenas = document.querySelector('.arenas');
    const $img = document.createElement('img');
    $img.src = playerobject.img;

    $arenas.appendChild($player);
    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);
};

createPlayerTask3('player1', player1);
createPlayerTask3('player2', player2);
console.log(player1.attack());
console.log(player2.attack());