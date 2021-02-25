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

            // enable collision with player's attacks
            enableCollisions(this, {
                target: Attack.playerAttacks,
                type: 'circlevscircles',
                options: {
                    resolution: false,
                    killOnContact: true
                },
                callback: this.takeAttack.bind(this)
            });

            // AI
            this.spawnPoint = {x: x, y: y}; // tethered to spawn point
            this.behavior = "brute"; // behavior type brute
            // will chase player if player is whithin x range of spawn point. else, will return to spawn point
        }

        update(dt){
            if (this.isAttacking){ return }
            // check if player is close enough
            var sideX = this.spawnPoint.x - world.player.x;
            var sideY = this.spawnPoint.y - world.player.y;

            var homeRange = 350; // how far from home will I go?
            if (homeRange*homeRange > sideX*sideX + sideY*sideY){
                // player is within range. get him!
                // cue up action to walk up and attack
                this.actionCue = [["attack", world.player, 0]];
            } else {
                this.actionCue = [["move", this.spawnPoint.x, this.spawnPoint.y]];
            }

            super.update(dt);
        }


        
    }

    Enemy.array = [];

    Enemy.generateFromTiledData = function(object){
        object = Sprite.extractTiledObjectProperties(object);
        var enemy = new Enemy(object.spritesheetName, object.x, object.y, object);
        Enemy.array.push(enemy);
        objectsToUpdate.push(enemy);
    }

    return Enemy;
}

