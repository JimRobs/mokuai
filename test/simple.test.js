var mokuai = require('../mokuai');
var readFile = require('./utils/readFile');
var fixtures = require('./utils/fixtures');

var expected = readFile(__dirname+'/expected/simple.js');

exports.testSimple = function(test){
    var result = mokuai({
        window: readFile(fixtures.modules.window),
        Horse: readFile(fixtures.modules.Horse),
        Animal: readFile(fixtures.modules.Animal),
        Snake: readFile(fixtures.modules.Snake)
    }, {
        prepend: [
            readFile(fixtures.prepend.window)
        ],
        append: [
            readFile(fixtures.append.instances),
            readFile(fixtures.append.move)
        ]
    });

    test.equals(result, expected);
    test.done();
};

exports.testSimpleFromFiles = function(test){
    var result = mokuai.fromFiles({
        window: fixtures.modules.window,
        Horse: fixtures.modules.Horse,
        Animal: fixtures.modules.Animal,
        Snake: fixtures.modules.Snake
    }, {
        prepend: [
            fixtures.prepend.window
        ],
        append: [
            fixtures.append.instances,
            fixtures.append.move
        ]
    });

    test.equals(result, expected);
    test.done();
};