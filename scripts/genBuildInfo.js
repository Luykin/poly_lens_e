/*
 * Script that writes a file name buildInfo.json in the project root
 * Containing information relating to the build/version of the project
 * Used for in-app product updates, example file contents below:
 *
 * {
 *   "version": "0.0.1",
 *   "branch": "some-feature",
 *   "commitId": "9a1b3da0",
 *   "build": "0.0.1-some-feature-9a1b3da0"
 * }
 */

const childProcess = require('child_process');
const packageJson = require('../package.json');
const builderJson = require('../electron-builder.json');
const path = require('path');
const fs = require('fs');
const os = require('os');

const productId = getProductId();
const version = packageJson.version;
const appId = builderJson.appId || packageJson.build.appId;
const branch = process.env.CI_COMMIT_REF_SLUG || getGitBranch();
let releaseChannel = branch;
const commitId = process.env.CI_COMMIT_SHORT_SHA || getGitHash();
const buildNumber = process.env.LENSDESKTOPBUILDNUMBER || 0;
let build = `${version}.${buildNumber}`;

// Use only the version identifier for builds from master
if (branch == 'master') {
  build = version;
  releaseChannel = null;
}

const buildInfoFile = path.join(
  path.resolve(__dirname),
  '..',
  'buildInfo.json'
);

// Determine the productId (OS Platfrom) for this build, ideally this is passed in via an arg, but if not we will determine based on host-platform.
function getProductId() {
  const firstArg = process.argv[2];
  if (
    firstArg &&
    firstArg.length > 0 &&
    firstArg.match(/lens-desktop-(windows|mac|linux)/)
  ) {
    return firstArg;
  } else if (os.platform == 'win32') {
    return 'lens-desktop-windows';
  } else if (os.platform == 'darwin') {
    return 'lens-desktop-mac';
  } else if (os.platform == 'linux') {
    return 'lens-desktop-linux';
  }
  throw new Error('Could not determine platform (productId) for this build');
}

/* The git branch lowercased, shortened to 63 bytes, and with everything except 0-9 and a-z replaced with '-' and no leading or trailing '-' */
function getGitBranch() {
  try {
    // current git branch, lowercased
    const branchName = childProcess
      .execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe' })
      .toString()
      .trim()
      .toLowerCase();
    const regex = '/[^a-z0-9-]/g';
    // replace all non-alphanumeric characters with hyphens, strip leading and triling hyphens, limit to 63 chars
    return branchName
      .replace(eval(regex), '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 64);
  } catch (e) {
    return 'unknown';
  }
}

/* The first eight characters of the current git commit revision */
function getGitHash() {
  try {
    return childProcess
      .execSync('git rev-parse HEAD', { stdio: 'pipe' })
      .toString()
      .trim()
      .substring(0, 8);
  } catch (e) {
    return 'unknown';
  }
}

// Changing the buildInfo object? Please also consider updates to utility.service.ts handlers
const buildInfo = {
  productId,
  appId,
  releaseChannel,
  version,
  branch,
  commitId,
  build,
};

// write buildInfo as JSON to buildInfo.json in project root
fs.writeFileSync(buildInfoFile, JSON.stringify(buildInfo, null, 2) + '\n');
