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