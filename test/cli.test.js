var readFile = require('./utils/readFile');

function testEqual(test, file){
    var cli = readFile(__dirname+'/cli/'+file);
    var expected = readFile(__dirname+'/expected/'+file);
    test.equal(cli, expected);
}

exports.testCLI = function(test){
    testEqual(test, 'simple.js');
    testEqual(test, 'simple.autoexports.js');
    testEqual(test, 'custom.js');
    testEqual(test, 'custom.jollyjumper.js');
    testEqual(test, 'custom.besthorse.js');
    test.done();
};