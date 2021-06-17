// import { displayCurrentTime, getRandom } from './utils/index.js';
// import { LOGS } from './constants/index.js'

// const $chat = document.querySelector('.chat');

// function getTextLog(type, playerName1, playerName2) {
//     switch (type) {
//         case 'start':
//             return LOGS[type].replace('[player1]', playerName1).replace('[player2]', playerName2).replace('[time]', displayCurrentTime());
//         case 'hit':
//         case 'defence':
//             return LOGS[type][getRandom(LOGS[type].length - 1) - 1].replace('[playerKick]', playerName1).replace('[playerDefence]', playerName2);
//         case 'end':
//             return LOGS[type][getRandom(LOGS[type].length - 1) - 1].replace('[playerWins]', playerName1).replace('[playerLose]', playerName2);
//         case 'draw':
//             return LOGS[type];
//         default:
//             'Nu yo mayo!';
//             break;
//     }
// }

// export function generateLogs(type, { name } = {}, { name: playerName2, hp } = {}, damage) {
//     let text = getTextLog(type, name, playerName2);
//     switch (type) {
//         case 'hit':
//             text = `${displayCurrentTime()} - ${text} -${damage} [${hp}/100]`;
//             break;
//         case 'defence':
//             text = `${displayCurrentTime()} - ${text}`;
//             break;
//         case 'end':
//         case 'start':
//         case 'draw':
//             break;
//         default:
//             text = 'WTF is going on?'
//             break;
//     }
//     const el = `<p>${text}</p>`;
//     $chat.insertAdjacentHTML('afterbegin', el);
// }