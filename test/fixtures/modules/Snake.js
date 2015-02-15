var Snake = Animal.extend({
    move: function(){
        alert("Slithering...");
        Animal.prototype.move.call(this, 5);
    }
});

module.exports = Snake;