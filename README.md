### Intro :

- Project is based on last [Angular 17](https://angular.io/) version with required dependencies for [Electron 27](https://www.electronjs.org/).
- Written in [Typescript 4/5](https://www.typescriptlang.org/) and includes test samples ([WebdriverIO](https://webdriver.io/) and [Jasmine](https://jasmine.github.io/)).
- The app is runnable `on desktop` (with **live-reload** in `development mode`).
- The app is also runnable `on browser` but **without Electron features**.
- Generating platform distributables thanks to [`electron-forge`](https://www.electronforge.io/).
- Minimal app size - thanks to the packaging based on its [`webpack-template`](https://www.electronforge.io/templates/typescript-+-webpack-template).

### Version bump

SemVer is versioning scheme used in this project.
To bump the version, do update `version` field in `package.json` file. 

### Project structure :

```
├── ./README.md
├── ./package-lock.json
├── ./package.json
├── ./tsconfig.json
├── ./webpack.main.config.js
├── ./webpack.plugins.js
├── ./webpack.renderer.config.js
├── ./webpack.rules.js
└── ./workspaces
    ├── ./angular-app           # Angular source directory (web renderer part)
        ├── ./src/app/core      # Core components/services (DFU manager, Settings Manager, etc.) 
        ├── ./src/app/features  # Per-feature components/services (Device Settings, Control, Device Support, Poly Support, etc.)
        ├── ./src/app/shared    # Shared components/pipes/services (modals, cards, input-like components, animations, etc.)
    ├── ./electron-app          # Electron source directory (main & preload part)
    └── ./shared-lib            # Shared source directory (common part)
```

## Getting started

- NVM (for development purpose)
- Node.js ^20.9.0 (for parity with https://angular.io/guide/versions#actively-supported-versions)

Then from your command line:

```bash
# Install dependencies
npm install

# If using Contracts-definitions mock on Mac: create SocketPortNumber from
# the Contracts-definitions constants.ts file PORT_NUMBER constant
mkdir -p "/Users/`whoami`/Library/Application Support/Poly/Lens Control Service/"
echo "59414" > "/Users/`whoami`/Library/Application Support/Poly/Lens Control Service/SocketPortNumber"

# Run the app (dev mode)
npm start
```

## How to use

| Command                                       | Description                                   |
| --------------------------------------------- | --------------------------------------------- |
| `npm install`                                 | Install dependencies                          |
| `npm run start`                               | Run the app on desktop (dev mode)             |
| `npm run start:angular-app`                   | Run the app on browser (dev mode)             |
| `npm run test:angular`                        | Run **angular** unit tests                    |
| `npm run test:angular -- <something>.spec.ts` | Run **angular** unit tests from just one file |
| `npm run package`                             | Build and prepare application content         |
| `npm run make`                                | Generate platform distributables (./out)      |
| `npm run clean`                               | Delete generated outputs                      |

## Behind a proxy

After settings **HTTP_PROXY** and **HTTPS_PROXY** environment variables :

```bash
# Install dependencies
npx cross-env ELECTRON_GET_USE_PROXY=true GLOBAL_AGENT_HTTPS_PROXY=%HTTPS_PROXY% npm install
```

### Adding dependencies

This project architecture is based on [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). This allows having different version of the same dependency depending on your workspace :

- electron-app
  `npm install --save <dependency>`
- angular-app
  `npm install --save <dependency> -w angular-app`
- shared-lib
  `npm install --save <dependency> -w shared-lib`

### Listing outdated dependencies

- electron-app
  `npm run outdated-deps:electron-app`
- angular-app
  `npm run outdated-deps:angular-app`
- shared-lib
  `npm run outdated-deps:shared-lib`
- all of them
  `npm run outdated-deps`

### Updating dependencies

- electron-app
  `npm run update-deps:electron-app`
- angular-app
  `npm run update-deps:angular-app`
- shared-lib
  `npm run update-deps:shared-lib`
- all of them
  `npm run update-deps`

## Communication with Lens Control Service (LCS)

LCS is a gate for Lens Desktop so it can communicate with devices and the cloud as well.

The communication chain is the follow:

`State Management (Renderer) <---> IPC <---> LCS API Client (Main) <---> Socket Client (Main) <---> LCS`

- Socket Client is a client that communicates with the LCS via a socket channel. Part of the main process.
- LCS API Client is a service that aims to be an IPC channel between the main and renderer process for LCS-related communication. It's a kind of proxy, pretty simple and with no business logic - just about passing messages between the renderer and LCS. Part of the main process.
- State Management is the final destination for data received from LCS. It created requests for LCS when some date are needed. Part of the renderer process.

## State Management

Purpose of the state management is to have a single source of truth for all data that needs to be displayed/used on the UI. The state management is implemented on top on RxJS, it is immutable and predictable, as all data are stored on one place, one store.

The state management is final destination for all data received from external sources (eg. LCS). Should work with UI models, which means that LCS responses should be converted into correlated UI models before storing them.

## Resources

### Internal resources

- [Virtual environments](https://github.azc.ext.hp.com/codeway/virtual-environments/blob/master/docs/) - Virtual Environments

### Electron

- [electronjs.org/docs](https://electronjs.org/docs) - Electron's documentation
- [electron/simple-samples](https://github.com/electron/simple-samples) - Small applications with ideas to take further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - Sample app that teaches you how to use Electron

### Angular

- [angular.io/start](https://angular.io/start) - Getting started with Angular
- [angular.io/docs](https://angular.io/docs) - Angular's documentation
- [cli.angular.io](https://cli.angular.io/) - Angular CLI documentation
