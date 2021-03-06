(function(){
    var modules = {};
    function setter(){ throw new Error('Cannot manually set module property'); }
    function setModule(name, factory){
        if(modules.hasOwnProperty(name)){
            throw new Error('Module '+name+' already exists.');
        }
        Object.defineProperty(modules, name, {
            get: function(){
                if(factory.busy) {
                    throw new Error('Cyclic dependency detected on module '+name);
                }
                factory.busy = true;
                var value = factory();
                Object.defineProperty(modules, name, {
                    value: value
                });
                factory.busy = false;
                return value;
            },
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    with(modules){
        (function(modules, module, exports, setModule, setter){
            modules.originalWindow = window;
        })(modules, undefined, undefined, undefined, undefined);
        setModule('window', function(){
            var module = {}, exports = module.exports = {};
            (function(modules, module, exports, setModule, setter){
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
                module.exports = window;
                
            })(modules, module, exports, undefined, undefined);
            return module.exports;
        });
        setModule('Horse', function(){
            var module = {}, exports = module.exports = {};
            (function(modules, module, exports, setModule, setter){
                var Horse = Animal.extend({
                    move: function(){
                        alert("Galloping...");
                        Animal.prototype.move.call(this, 45);
                    }
                });
                module.exports = Horse;
                
            })(modules, module, exports, undefined, undefined);
            return module.exports;
        });
        setModule('Animal', function(){
            var module = {}, exports = module.exports = {};
            (function(modules, module, exports, setModule, setter){
                function Animal(name){
                    this.name = name;
                }
                
                Animal.prototype.move = function(meters){
                    alert(this.name + " moved "+meters+"m.");
                };
                
                // Simplistic extend function just for this demo
                Animal.extend = function(protoProps) {
                    var child = function(){
                        return Animal.apply(this, arguments);
                    };
                    var Surrogate = function(){
                        this.constructor = child;
                    };
                    Surrogate.prototype = Animal.prototype;
                    child.prototype = new Surrogate;
                    for(var key in protoProps){
                        if(protoProps.hasOwnProperty(key)){
                            child.prototype[key] = protoProps[key];
                        }
                    }
                    return child;
                };
                module.exports = Animal;
                
            })(modules, module, exports, undefined, undefined);
            return module.exports;
        });
        setModule('Snake', function(){
            var module = {}, exports = module.exports = {};
            (function(modules, module, exports, setModule, setter){
                var Snake = Animal.extend({
                    move: function(){
                        alert("Slithering...");
                        Animal.prototype.move.call(this, 5);
                    }
                });
                module.exports = Snake;
                
            })(modules, module, exports, undefined, undefined);
            return module.exports;
        });
        (function(modules, module, exports, setModule, setter){
            var sam = new Snake("Sammy the Python");
            var tom = new Horse("Tommy the Palomino");
            sam.move();
            tom.move();
        })(modules, undefined, undefined, undefined, undefined);
    }
    if(typeof module !== 'undefined' && module.exports){
        module.exports = modules;
    } else {
        this['modules'] = modules;
    }
}).call(this);