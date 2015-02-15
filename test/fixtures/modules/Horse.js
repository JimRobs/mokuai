var Horse = Animal.extend({
    move: function(){
        alert("Galloping...");
        Animal.prototype.move.call(this, 45);
    }
});

module.exports = Horse;