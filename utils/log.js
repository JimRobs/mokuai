var chalk = require('chalk');

// Utility functions to log with colors
// log : no color
function log(value){
    console.log(value);
}
// info : green
log.info = function(value){
    console.info(chalk.green(value));
};

// warn : orange
log.warn = function(value){
    console.warn(chalk.orange(value));
};

// error : red
log.error = function(value){
    console.error(chalk.red(value));
};

module.exports = log;