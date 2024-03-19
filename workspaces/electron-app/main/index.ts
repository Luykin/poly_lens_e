import * as fs from 'fs-extra';
import _ from 'lodash';
import * as path from 'node:path';
import { IGlobal } from 'shared-lib/apis';
import { App } from './components/app';

declare global {
  // Global augmentation of the `Global` interface
  interface Global extends IGlobal {}
}

declare const global: IGlobal;

// Load config
const currentEnvironment = process.env.X_NODE_ENV || process.env.NODE_ENV;
const appConfigs = fs.readJsonSync(path.join(__dirname, 'config.json'));
const defaultConfig = appConfigs.development;
const currentConfig = appConfigs[currentEnvironment];
global.appConfig =
  currentEnvironment === 'development'
    ? defaultConfig
    : _.merge(defaultConfig, currentConfig);

// Launch app
App.launch();
