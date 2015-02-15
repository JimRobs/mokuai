var mokuai = require('../mokuai');
var readFile = require('./utils/readFile');
var fixtures = require('./utils/fixtures');

var expected = readFile(__dirname+'/expected/custom.js');

exports.testCustom = function(test){
    var result = mokuai({
        JollyJumper: readFile(fixtures.modules.Horse),
        Animal: readFile(fixtures.modules.Animal),
        Kaa: readFile(fixtures.modules.Snake)
    }, {
        exports: true
    });

    test.equals(result, expected);
    test.done();
};

exports.testCustomFromFiles = function(test){
    var result = mokuai.fromFiles({
        JollyJumper: fixtures.modules.Horse,
        Animal: fixtures.modules.Animal,
        Kaa: fixtures.modules.Snake
    }, {
        exports: true
    });

    test.equals(result, expected);
    test.done();
};