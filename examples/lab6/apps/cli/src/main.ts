import fetch from 'node-fetch';

const port = process.env.port || 3333;
const baseUrl = `http://localhost:${port}/api`;
let fetchUrl = baseUrl;

if (process.argv.length >= 3 && process.argv[2]) {
    // this doesn't work yet
    fetchUrl = `${baseUrl}/games/${process.argv}`
} else {
    fetchUrl = `${baseUrl}/games`
}

fetch(fetchUrl).then(response => response.json().then((val: any[]) => {
  console.log(val.map(game => `${game.name}: ${game.description}`).join('\\n'));
}));
