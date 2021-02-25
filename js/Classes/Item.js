function setupItemClass(data){
    class Item extends Sprite{
        constructor(imgName, x, y, options, bonusOptions){
            super(imgName, x, y, options, bonusOptions);
            this.type = "item";
            this.equippableSlots = options.equippableSlots;
            this.isClickable = true;
            this.data = options; // item data such as damage, etc
            this.imgName = options.imgName
            // console.log('creating item ', imgName, options)
        }
        interact = function(player){
            this.markedForDeath = true;
            player.gainItem(this);
        }
    }

    




    return Item;
}