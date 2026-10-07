import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const workspace = JSON.parse(readFileSync('angular.json', 'utf8'));
const projectName = workspace.defaultProject ?? Object.keys(workspace.projects ?? {})[0];

if (!projectName) {
  throw new Error('No Angular project found in angular.json.');
}

const project = workspace.projects[projectName];
const buildTarget = project?.architect?.build ?? project?.targets?.build;
const options = buildTarget?.options;

if (!options?.outputPath) {
  throw new Error(`No build outputPath configured for Angular project "${projectName}".`);
}

const configuredOutput =
  typeof options.outputPath === 'string'
    ? options.outputPath
    : options.outputPath.base;

if (!configuredOutput) {
  throw new Error(`Unable to resolve build outputPath for Angular project "${projectName}".`);
}

const browserDirectory =
  typeof options.outputPath === 'object' && options.outputPath.browser
    ? options.outputPath.browser
    : 'browser';

const candidates = [
  join(configuredOutput, browserDirectory),
  configuredOutput
];

const outputPath = candidates.find((candidate) => existsSync(join(candidate, 'index.html')));

if (!outputPath) {
  throw new Error(
    `Built site index.html was not found. Checked: ${candidates.join(', ')}`
  );
}

console.log(`path=${outputPath.replaceAll('\\', '/')}`);
