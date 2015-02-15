// Utility function to get the option value from string or boolean value
function boolStringOption(value){
    if(value === 'true' || value === true) return true;
    if(value === 'false' || value === false) return false;
    return value;
}

module.exports = boolStringOption;