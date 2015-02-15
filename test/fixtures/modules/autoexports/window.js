var window = {
    description: [
        'This module dangerously overrides window in the mokuai context with this object. ',
        'Fortunately, we prepended a file that saves originalWindow, so you can still use it.'
    ].join(''),

    isWindow: function(){
        return this === window;
    },

    isOriginalWindow: function() {
        return this === originalWindow;
    }
};