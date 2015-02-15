var Horse = Animal.extend({
    move: function(){
        alert("Galloping...");
        Animal.prototype.move.call(this, 45);
    }
});