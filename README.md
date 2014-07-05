# aster-changed
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Rebuild only changed files in aster.

## Usage

First, install `aster-changed` as a development dependency:

```shell
npm install --save-dev aster-changed
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var changed = require('aster-changed');

aster.src('src/**/*.js')
.map(changed(function (src) {
  return src
    .map(plugin1())
    .map(plugin2())
    // ... any plugins that can work on individual files
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### changed(processor)

#### processor
Type: `Function`

Part of build pipeline that can work on individual files (it will be called on every bunch of changed files and results will be cached for future calls).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-changed
[npm-image]: https://badge.fury.io/js/aster-changed.png

[travis-url]: http://travis-ci.org/asterjs/aster-changed
[travis-image]: https://secure.travis-ci.org/asterjs/aster-changed.png?branch=master
