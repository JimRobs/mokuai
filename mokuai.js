/*
 * mokuai
 * https://github.com/JimRobs/mokuai
 *
 * Copyright (c) 2015 JimRobs
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs-extra');
var _ = require('lodash');

// Get package.json data
var pkg = fs.readJSONSync(__dirname+'/package.json');

// Utility function to read file content as string with utf8 encoding
function readFile(filepath){
    return fs.readFileSync(filepath, {
        encoding: 'utf8'
    });
}

// Build lodash mokuai template
var template = _.template(readFile(__dirname+'/templates/mokuai.template'));

// Wraps all modules into a mokuai closure.
// modules {Object} Map of modules. key: module name, value: module content
// options {Object} Options for mokuai wrapper
// options.prepend {String[]} Array of content to be prepended to the modules
// options.append {String[]} Array of content to be appended to the modules
// options.exports {Boolean|String} Define the exports type
//                                  false: Do not export any module (default)
//                                  true: Export all modules
//                                  string: Export the module with the string value as name
// options.exportsname {null|String} Define the global name of the exported module when options.exports is defined.
//                                   Applies only for non-CommonJS environments (e.g. browser without CommonJS)
//                                   Default is the options.exports value, or "modules" if options.exports is "true"
// options.autoexports {Boolean} Define if the modules should be automatically exported using the name as variable.
//                               For example, for the module 'home', 'module.exports = home' will automatically be
//                               added to the module declaration. (default is false)
function mokuai(modules, options){
    // Copy modules argument
    modules = _.extend({}, modules);
    // Copy options argument with default values
    options = _.extend({
        prepend: [],
        append: [],
        exports: false,
        exportsname: null,
        autoexports: false
    }, options);
    // Render mokuai template with arguments
    return template({
        modules: modules,
        options: options
    });
}

// Wraps all files as modules into a mokuai closure.
// modules {Object} Map of modules. key: module name, value: module filepath
// options {Object} Options for mokuai wrapper
// options.prepend {String[]} Array of filepaths, which content will be prepended to the modules
// options.append {String[]} Array of filpaths, which content will be appended to the modules
// options.exports {Boolean|String} Define the exports type
//                                  false: Do not export any module (default)
//                                  true: Export all modules
//                                  string: Export the module with the string value as name
// options.exportsname {null|String} Define the global name of the exported module when options.exports is defined.
//                                   Applies only for non-CommonJS environments (e.g. browser without CommonJS)
//                                   Default is the options.exports value, or "modules" if options.exports is "true"
// options.autoexports {Boolean} Define if the modules should be automatically exported using the name as variable.
//                               For example, for the module 'home', 'module.exports = home' will automatically be
//                               added to the module declaration. (default is false)//
mokuai.fromFiles = function(modules, options){
    // Copy modules argument
    modules = _.extend({}, modules);
    // Copy options argument with default values for prepend and append options
    options = _.extend({
        prepend: [],
        append: []
    }, options);

    // Map modules, prepend and append arguments with file contents
    modules = _.mapValues(modules, readFile);
    options.prepend = _.map(options.prepend, readFile);
    options.append = _.map(options.append, readFile);

    // Call simple mokuai method with file contents
    return mokuai(modules, options);
};

// Set mokuai version from the package.json version
mokuai.version = pkg.version;

module.exports = mokuai;