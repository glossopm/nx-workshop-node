import { Tree } from '@nrwl/devkit';

export function replaceInFile(
  host: Tree,
  path: string,
  find: string,
  replace: string
) {
  const newContent = host.read(path).toString().replace(find, replace);
  host.write(path, newContent);
}

export function stripConsoleColors(log: string): string {
  return log.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
}
