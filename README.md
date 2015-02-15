# mokuai

Generates JavaScript modules, elegantly wrapped into an awesome closure, with no sort concern and no verbose require
calls, just pure code.

## Description

CommonJS is awesome for external libraries, but not perfect when you want to split you own application in modules.

For example, want to use your awesome `utils` module in every file but keep your global var clean ? You need to
require your `utils` module in every file:

```js
// If you are in the same directory
var utils = require('./utils');
utils.doAnAwesomeJob();
```

```js
// If you're not, it can be unpleasant
var utils = require('./../../../../../utils');
utils.doAnAwesomeJob();
```

What about making `utils` module, and all your application modules, directly accessible from any of them. Well, Mokuai
makes it possible.

```js
// Do not need to require it, just use it
utils.doAnAwesomeJob();
```

Your module does not have a pleasant var name ? No problem, all modules are accessible from the `modules` keyword.

```js
modules['my-awesome-utils-function'].doAnAwesomeJob();
```

### How does it work ?

Mokuai wraps your modules into a special closure.

All modules are saved in a `modules` object, and are refered with a special `getter` which initializes your module when
it is first called, just like a `require` call.

To be easily accessed anywhere, all your modules are declared in a ~~evil~~ powerful **with** statement and it works
like magic.

The only limit is that your modules names have to be unique. Everything else is possible.

### Module declaration

Each module exports its value just like in CommonJS:

With `module.exports`

```js
var utils = {
    doAnAwesomeJob: function(){
        // ... do something awesome
    },
    // ...
};
// ...
module.exports = utils;
```

or just using the `exports` shortcut

```js
exports.doAnAwesomeJob = function(){
    // ... do something awesome
};
// ...
```

### Prepend / Append

Mokuai lets you prepend/append your modules with any code.

For example, you can append your application launcher:

```js
// Launch application when DOM ready
$(App.launch);
```

or save a dangerously overridden global var by prepending this kind of code:

```js
// Application defines a module named 'window', so all modules can't access the real global window var anymore.
// Fortunately, we can prepend this to save the original window
modules.originalWindow = window;
```

### Export

All modules are wrapped in a mokuai closure. So nothing is exported by default.

But you can still export things using the **exports** option.

If the **exports** value is **true**, then all your modules will be exported.
If the **exports** value is a string, then only the module with the **exports** name will be exported.

Export works in CommonJS environments, like Node.js:

```js
// exports=true
module.exports = modules;
// exports='utils'
module.exports = modules['utils'];
```

and in the browser too:

```js
// exports=true
window['modules'] = modules;
// exports='utils'
window['utils'] = modules['utils'];
```

In the browser, you can customize the name of your exported module using the **exportsname** option:

```js
// exports=true and exportsname=MyAwesomeModules
window['MyAwesomeModules'] = modules;
// exports='utils' and exportsname=MyAwesomeUtils
window['MyAwesomeUtils'] = modules['utils'];
```

### Auto Export Modules

Still find it **verbose** to use module.exports to export your module ? Well you can use the **autoexports** option to
automatically export the name of your module.

```js
// With autoexports to true, no need to use module.exports.
// My module name is 'utils', so I just need to write this:
var utils = {
    doAnAwesomeJob: function(){
        // ... do something awesome
    }
    // ...
};
// ...
```

## Usage

### CLI

If you want to use the mokuai cli, install it globally via npm:

```bash
$ npm install mokuai --global
```

Then you can use the `mokuai` command, as follow:

```bash
$ mokuai --help

  Usage: mokuai <[modulename:]file ...> [options]

  Wrap your CoffeeScript modules with mokuai.
  If the --output (-o) option is not used, the result is printed into the console.
  Modules are automatically named after file basenames (path/to/file.coffee => file).
  Files can also be prefixed by a custom module name and a colon (custom:path/to/file.js => custom).

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -p, --prepend <value>      (repeatable) add the <value> file to prepended files (files that are prepended to modules)
    -a, --append <value>       (repeatable) add the <value> file to appended files (files that are appended to modules)
    -e, --exports [value]      define the exports mokuai option ([value] is optional and can be either false, true, or any module name)
    -n, --exportsname <value>  set the exportsname mokuai option to <value>
    -A, --autoexports          set the autoexports mokuai option to true
    -o, --output <output>      set the output file (if not set, print the result in the console)

  Examples:

    $ mokuai path/to/module.coffee customname:path/to/another/module.coffee
    $ mokuai <files> --output gen/app.js
    $ mokuai <files> --exports --output gen/app.js
    $ mokuai <files> --exports --exportsname MyApp --output gen/app.js
    $ mokuai <files> --exports AppModule --exportsname MyApp --output gen/app.js
    $ mokuai <files> --exports MainModule --exportsname MyApp --output gen/app.js
    $ mokuai <files> --append prepare.coffee --append launch.coffee --autoexports --output gen/app.js
    $ mokuai <files> --prepend prepend.coffee --append append.coffee --exports --output gen/app.js
```

Modules are automatically named after files basenames, unless you prefix the filepath with a custom name followed by a
colon.

For example:

```bash
$ mokuai path/to/module.coffee customname:path/to/another/module.coffee --output closure.js
```

will create 2 modules named `module` and `customname`.

**prepend** / **append** options are repeatable to allow multiple files:

```bash
$ mokuai <files> --prepend prepend1.coffee --prepend prepend2.coffee --append append1.coffee --append append2.coffee
```

### Node.js library

If you want to use the library in a Node.js project, install it locally via npm:

```bash
$ npm install mokuai
```

or save it as a dev dependency, adding the `--save-dev` option:

```bash
$ npm install mokuai --save-dev
```

Then, you can just require  `mokuai` in your code and use it as follow.

```js
var mokuai = require('mokuai');
var closure = mokuai({
    moduleName1: 'moduleContent1',
    moduleName2: 'moduleContent2',
    // ...
    moduleNameN: 'moduleContentN'
}, {
    prepend: [
        'prependContent1',
        'prependContent2',
        // ...
        'prependContentN'
    ],
    append: [
        'appendContent1',
        'appendContent2',
        // ...
        'appendContentN'
    ],
    autoexports: false,
    exports: 'moduleName1',
    exportsname: 'MyCustomExportsName',
});
// Do whatever you want with 'closure'
```

If you want to compile from filepaths instead of modules contents:

```js
var mokuai = require('mokuai');
var closure = mokuai.fromFiles({
    moduleName1: 'path/to/module1.coffee',
    moduleName2: 'path/to/module2.coffee',
    // ...
    moduleNameN: 'path/to/moduleContentN.coffee'
}, {
    prepend: [
        'path/to/prependContent1.coffee',
        'path/to/prependContent2.coffee',
        // ...
        'path/to/prependContentN.coffee'
    ],
    append: [
        'path/to/appendContent1.coffee',
        'path/to/appendContent2.coffee',
        // ...
        'path/to/appendContentN.coffee'
    ],
    autoexports: false,
    exports: 'moduleName1',
    exportsname: 'MyCustomExportsName'
});
// Do whatever you want with 'closure'
```

## License

[MIT](LICENSE-MIT)