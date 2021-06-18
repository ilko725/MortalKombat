import Game from './game/index.js';

const game = new Game();

game.start();

// const q = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');

// console.log(q);

// q.then(response => {
//     console.log(response);
//     return response.json();
// }).then(data => console.log(data));

// async function getPlayers() {
//     const q = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');
//     const body = await q.json();
//     console.log(body);
//     return body;
// const queue = new Promise(resolve => setTimeout(() => resolve(), 3000));
// const queue2 = new Promise(resolve => setTimeout(() => resolve(), 3500));
// console.log('wait');
// await queue;
// console.log(5 * 4);
// await queue2;
// console.log('finish');
// }

// getPlayers();