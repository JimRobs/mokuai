module.exports = (grunt)->
    'test.cli.simple':
        command:
            '
            node bin/mokuai.js
            test/fixtures/modules/window.js
            test/fixtures/modules/Horse.js
            test/fixtures/modules/Animal.js
            test/fixtures/modules/Snake.js
            --prepend test/fixtures/prepend/window.js
            --append test/fixtures/append/instances.js
            --append test/fixtures/append/move.js
            --output test/cli/simple.js
            '
    'test.cli.simple.autoexports':
        command:
            '
            node bin/mokuai.js
            test/fixtures/modules/autoexports/window.js
            test/fixtures/modules/autoexports/Horse.js
            test/fixtures/modules/autoexports/Animal.js
            test/fixtures/modules/autoexports/Snake.js
            --prepend test/fixtures/prepend/window.js
            --append test/fixtures/append/instances.js
            --append test/fixtures/append/move.js
            --autoexports
            --exports
            --output test/cli/simple.autoexports.js
            '
    'test.cli.custom':
        command:
            '
            node bin/mokuai.js
            JollyJumper:test/fixtures/modules/Horse.js
            test/fixtures/modules/Animal.js
            Kaa:test/fixtures/modules/Snake.js
            --exports
            --output test/cli/custom.js
            '
    'test.cli.custom.jollyjumper':
        command:
            '
            node bin/mokuai.js
            JollyJumper:test/fixtures/modules/Horse.js
            test/fixtures/modules/Animal.js
            --exports JollyJumper
            --output test/cli/custom.jollyjumper.js
            '
    'test.cli.custom.besthorse':
        command:
            '
            node bin/mokuai.js
            JollyJumper:test/fixtures/modules/Horse.js
            test/fixtures/modules/Animal.js
            --exports JollyJumper
            --exportsname BestHorseEver
            --output test/cli/custom.besthorse.js
            '

    # Test CLI failure
    'test.cli.failure':
        command:
            '
            node bin/mokuai.js
            SubAnimal:test/fixtures/modules/Horse.js
            SubAnimal:test/fixtures/modules/Snake.js
            test/fixtures/modules/Animal.js
            '
        options:
            stdout: no
            stderr: no
            callback: (error, stdout, stderr, done)->
                if error and stderr is 'Module name must be unique : found several "SubAnimal"\n'
                    grunt.log.ok 'CLI failed as expected (multiple "SubAnimal" module name)'
                    done()
                else
                    grunt.log.error 'CLI did not failed as expected... '
                    done no

