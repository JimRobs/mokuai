var fs = require('fs-extra');

module.exports = function readFile(filepath){
    return fs.readFileSync(filepath, {
        encoding: 'utf8'
    });
};