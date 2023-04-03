/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatFiles, Tree } from '@nrwl/devkit';
import { libraryGenerator, moveGenerator } from '@nrwl/workspace';
import { insertImport } from '@nrwl/workspace/src/generators/utils/insert-import';
import { replaceInFile } from '../utils';

export default async function update(host: Tree) {
  // nx generate @nrwl/workspace:lib util-interface --directory=api
  await libraryGenerator(host, {
    name: 'util-interface',
    directory: 'api',
  });
  host.write(
    'libs/api/util-interface/src/lib/api-util-interface.ts',
    `export interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}
`
  );

  // nx generate @nrwl/workspace:move --projectName=api-util-interface util-interface
  await moveGenerator(host, {
    projectName: 'api-util-interface',
    destination: 'util-interface',
    updateImportPath: true,
  });
  const apiRepositoryPath = 'apps/api/src/app/games.repository.ts';
  insertImport(host, apiRepositoryPath, 'Game', '@bg-hoard/util-interface');
  replaceInFile(
    host,
    apiRepositoryPath,
    `const games = [`,
    `const games: Game[] = [`
  );
  const cliMainPath = 'apps/cli/src/main.ts';
  insertImport(host, cliMainPath, 'Game', '@bg-hoard/util-interface');
  replaceInFile(
    host,
    cliMainPath,
    'val: any[]',
    'val: Game[]'
  );

  await formatFiles(host);
}
