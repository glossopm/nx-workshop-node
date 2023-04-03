/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatFiles, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace';
import { replaceInFile } from '../utils';

export default async function update(host: Tree) {
  // nx generate @nrwl/workspace:lib auth --directory=api
  await libraryGenerator(host, {
    name: 'auth',
    directory: 'api',
  });

  host.write(
    'libs/api/auth/src/lib/api-auth.ts',
    `export type AuthResponse = AuthSuccessResponse | AuthFailureResponse;
export interface AuthSuccessResponse {
  success: true;
  name: string;
}
export interface AuthFailureResponse {
  success: false;
}

export function doAuth(): AuthResponse {
  return { success: true, name: 'Cheddar' };
}
`
  );

  host.write(
    'apps/api/src/main.ts',
    `/**
* This is not a production server yet!
* This is only a minimal backend to get started.
*/

import express from 'express';
import { doAuth } from '@bg-hoard/api/auth';
import { getAllGames, getGame } from './app/games.repository';

const app = express();

app.get('/api/games', (req, res) => {
 res.send(getAllGames());
});

app.get('/api/games/:id', (req, res) => {
 return res.send(getGame(req.params.id));
});

app.post('/api/auth', (req, res) => {
  res.send(doAuth());
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
 console.log(\`Listening at http://localhost:\${port}/api\`);
});
server.on('error', console.error);
`
  );

  await formatFiles(host);
}
