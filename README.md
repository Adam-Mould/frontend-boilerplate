# Frontend Boilerplate

Here is my custom built front-end boilerplate, which can be used as a great headstart for setting up your next project. The purpose of the boilerplate is to optimize the development workflow, ensuring processes are automated wherever possible, leaving us more time to focus on the cool stuff.

## Prerequisites

To use this boilerplate to its full potential you will need [NodeJS](https://nodejs.org) installed on your machine.

## Quick start

1. Clone the repo: `git clone https://github.com/Adam-Mould/frontend-boilerplate.git`
2. From the root `/frontend-boilerplate` directory, run `npm install`
3. Run `gulp` to begin the default watcher tasks. Reference `/gulpfile.js` for a list of available commands.

## Features

- [Node package manager (NPM)](https://www.npmjs.com) handling all package dependencies.
- [Gulp](http://gulpjs.com) is used to automate the workflow throughout development, and prepare the site ready for deployment. All the tasks can be found in the `/gulpfile.js`.
- [Foundation 6](http://foundation.zurb.com/sites/docs) framework baked-in. Import only the required features for your project to keep that CSS lean.
- [SASS](http://sass-lang.com) and the awesome [Bourbon mixin library](http://bourbon.io/) are setup and ready to use.
- ES2015 JavaScript can be used throughout. We use [BabelJS](https://babeljs.io) to transpile the JavaScript to ES5 for better browser support.
- SVG icon library can be set up in seconds. Gulp build task available to concatenate all svg files.

## What's included

Within the repo you'll find the following directories and files:

```
frontend-boilerplate/
├── assets/
│   ├── img/
│   ├── js/
│   │   └─ app.js
│   ├── scss/
│   │   ├- foundation/
│   │   │   ├- _core.scss
│   │   │   └─ _settings.scss
│   │   └─ style.scss
│   └── src_img/
│       └─ icons/
├── gulpfile.js
├── index.html
└── package.json

```

The `gulp build` task will create a new folder `dist` within `assets/js`. This will hold the concatenated and minified JavaScript files.