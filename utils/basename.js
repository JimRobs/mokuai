var path = require('path');

// Utility function to get basename of file
function basename(file){
    var extname = path.extname(file);
    return path.basename(file, extname);
}

module.exports = basename;