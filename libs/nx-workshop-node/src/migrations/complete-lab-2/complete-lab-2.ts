/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDependenciesToPackageJson,
  formatFiles,
  installPackagesTask,
  Tree,
} from '@nrwl/devkit';
import { dependencies } from '../../../package.json';
import {
  applicationGenerator,
} from '@nrwl/node';

export default async function update(tree: Tree) {
  await addDependenciesToPackageJson(
    tree,
    {
      'express': 'latest',
    },
    {
      '@nrwl/node': dependencies['@nrwl/node'],
    }
  );
  process.env.NX_PROJECT_GLOB_CACHE = 'false';
  await applicationGenerator(tree, {
    name: 'api',
    framework: 'express'
  });
  process.env.NX_PROJECT_GLOB_CACHE = 'true';
  tree.write(
    'apps/api/src/app/games.repository.ts',
    `const games = [
  {
    id: 'settlers-in-the-can',
    name: 'Settlers in the Can',
    image: 'https://media.giphy.com/media/xUNda3pLJEsg4Nedji/giphy.gif',
    description:
      'Help your bug family claim the best real estate in a spilled can of beans.',
    price: 35,
    rating: Math.random(),
  },
  {
    id: 'chess-pie',
    name: 'Chess Pie',
    image: 'https://media.giphy.com/media/iCZyBnPBLr0dy/giphy.gif',
    description: 'A circular game of Chess that you can eat as you play.',
    price: 15,
    rating: Math.random(),
  },
  {
    id: 'purrfection',
    name: 'Purrfection',
    image: 'https://media.giphy.com/media/12xMvwvQXJNx0k/giphy.gif',
    description: 'A cat grooming contest goes horribly wrong.',
    price: 45,
    rating: Math.random(),
  },
];

export const getAllGames = () => games;
export const getGame = (id: string) => games.find((game) => game.id === id);
`
  );
  tree.write(
    'apps/api/src/main.ts',
    `/**
* This is not a production server yet!
* This is only a minimal backend to get started.
*/

import express from 'express';
import { getAllGames, getGame } from './app/games.repository';

const app = express();

app.get('/api/games', (req, res) => {
 res.send(getAllGames());
});

app.get('/api/games/:id', (req, res) => {
 return res.send(getGame(req.params.id));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
 console.log(\`Listening at http://localhost:\${port}/api\`);
});
server.on('error', console.error);
`
  );

  await formatFiles(tree);
  return async () => {
    installPackagesTask(tree);
  };
}
