var setupNPCClass = function(data, imgMaker){
    class NPC extends Character {
        constructor(imgName, x, y, options, bonusOptions){
            super(imgName, x, y, options, bonusOptions);
            this.type = "npc"

            if (options.wearing){
                this.wearing = options.wearing.split(" ");
                this.imgObj = imgMaker( [imgName].concat(this.wearing) );
            }
            
            this.name = randy('name');
            this.isClickable = true;
            this.clickFunc = ["say", "<b>"+this.name+":</b> Hi, I'm "+this.name];
        }
        
        interact = function(){
            if (this.clickFunc[0] == 'say'){
                world.ui.say(this.clickFunc[1]);
            }
        }
    }

    NPC.array = [];

    NPC.generateFromTiledData = function(object){
        object = Sprite.extractTiledObjectProperties(object);
        var npc = new NPC(object.spritesheetName, object.x, object.y, object);
        NPC.array.push(npc);
        objectsToUpdate.push(npc);
    }

    return NPC;
}

