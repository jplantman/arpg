var setupEnemyClass = function(data, imgMaker){
    class Enemy extends Character {
        constructor(imgName, x, y, options, bonusOptions){
            super(imgName, x, y, options, bonusOptions);
            this.type = "enemy";

            if (options.wearing){
                var wearing = options.wearing.split(" ");
                this.imgObj = imgMaker( [imgName].concat(wearing) );
            }
            
            this.name = randy('name');
            this.isClickable = true;
            this.clickFunc = ["fight", "<b>"+this.name+":</b> Hi, I'm "+this.name];
            
        }


    }



    Enemy.array = [];

    Enemy.generateFromTiledData = function(object){
        object = Sprite.extractTiledObjectProperties(object);
        console.log(object);
        var enemy = new Enemy(object.spritesheetName, object.x, object.y, object);
        Enemy.array.push(enemy);
        objectsToUpdate.push(enemy);
    }

    return Enemy;
}

