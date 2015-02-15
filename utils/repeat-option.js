// Utility function to save repeatable values in cli as array
function repeatOption(value, array){
    array.push(value);
    return array;
}

module.exports = repeatOption;