module.exports = {
    modules: {

        autoexports: {
            Animal: __dirname+'/../fixtures/modules/autoexports/Animal.js',
            Horse: __dirname+'/../fixtures/modules/autoexports/Horse.js',
            Snake: __dirname+'/../fixtures/modules/autoexports/Snake.js',
            window: __dirname+'/../fixtures/modules/autoexports/window.js'
        },

        Animal: __dirname+'/../fixtures/modules/Animal.js',
        Horse: __dirname+'/../fixtures/modules/Horse.js',
        Snake: __dirname+'/../fixtures/modules/Snake.js',
        window: __dirname+'/../fixtures/modules/window.js'
    },

    prepend: {
        window: __dirname+'/../fixtures/prepend/window.js'
    },

    append: {
        instances: __dirname+'/../fixtures/append/instances.js',
        move: __dirname+'/../fixtures/append/move.js'
    }
};