# pylon

[![CircleCI](https://circleci.com/gh/iotexproject/pylon/tree/master.svg?style=svg)](https://circleci.com/gh/iotexproject/pylon/tree/master)

- [Documentation](https://docs.iotex.io/pylon/get-started.html?utm_source=github-pylon)
- [Contributing](https://docs.iotex.io/pylon/code-review-checklist.html?utm_source=github-pylon)

## Getting Started

Pylon is a full-stack starter for building IoTeX Dapps. Here are the features you’ll find in Pylon:

- Out-of-box integration with IoTeX antenna SDK and ioPay wallet
- Server-side rendering and universal rendering with React and Redux
- Apollo GraphQL (docs + playground), ES2017, TypeScript, TSX support out of the box
- Server-side development via Koa.js

### Create a project

```bash
git clone git@github.com:iotexproject/pylon.git my-awesome-project
```

### Run your project

This is intended for \*nix users. If you use Windows, go to [Run on Windows](#run-on-windows). Let's first prepare the environment.

```bash
cd my-awesome-project

nvm use 10.15.0
npm install

# prepare environment variable
cp ./.env.tmpl ./.env
```

#### Development mode

To run your project in development mode, run:

```bash
npm run watch
```

The development site will be available at [http://localhost:5000](http://localhost:5000).

#### Production Mode

It's sometimes useful to run a project in production mode, for example, to check bundle size or to debug a production-only issue. To run your project in production mode locally, run:

```bash
npm run build-production
NODE_ENV=production npm run start
```

#### NPM scripts

- `npm run test`: test the whole project and generate a test coverage
- `npm run ava ./path/to/test-file.js`: run a specific test file
- `npm run build`: build source code from `src` to `dist`
- `npm run lint`: run the linter
- `npm run kill`: kill the node server occupying the port 5000.
