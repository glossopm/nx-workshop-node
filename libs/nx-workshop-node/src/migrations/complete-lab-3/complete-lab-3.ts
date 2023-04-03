import {
  formatFiles,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

export default async function update(host: Tree) {
  process.env.NX_PROJECT_GLOB_CACHE = 'false';
  const config = readProjectConfiguration(host, 'api');
  config.targets['build'].options.bundle = true;
  updateProjectConfiguration(host, 'api', config);
  process.env.NX_PROJECT_GLOB_CACHE = 'true';
  await formatFiles(host);
}
