/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';

export default function update(host: Tree) {
  const projectUpdates = {
    cli: {
      tags: ['scope:cli', 'type:app'],
    },
    'cli-e2e': {
      tags: ['scope:cli', 'type:e2e'],
      implicitDependencies: ['cli'],
    },
    api: {
      tags: ['scope:api', 'type:app'],
    },
    'api-e2e': {
      tags: ['scope:api', 'type:e2e'],
      implicitDependencies: ['api'],
    },
    'api-auth': {
      tags: ['scope:api', 'type:data-access'],
    },
    'util-interface': {
      tags: ['scope:shared', 'type:util'],
    },
  };
  Object.keys(projectUpdates).forEach((projectName) => {
    const config = readProjectConfiguration(host, projectName);
    config.tags = projectUpdates[projectName].tags;
    config.implicitDependencies =
      projectUpdates[projectName].implicitDependencies || [];
    updateProjectConfiguration(host, projectName, config);
  });

  updateJson(host, '.eslintrc.json', (json) => {
    json.overrides[0].rules[
      '@nrwl/nx/enforce-module-boundaries'
    ][1].depConstraints = [
      {
        sourceTag: 'scope:cli',
        onlyDependOnLibsWithTags: ['scope:cli', 'scope:shared'],
      },
      {
        sourceTag: 'scope:api',
        onlyDependOnLibsWithTags: ['scope:api', 'scope:shared'],
      },
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared'],
      },
      {
        sourceTag: 'type:data-access',
        onlyDependOnLibsWithTags: ['type:data-access', 'type:util'],
      },
      {
        sourceTag: 'type:util',
        onlyDependOnLibsWithTags: ['type:util'],
      },
    ];
    return json;
  });
}
