var setupCharacterClass = function(camera){

    class Character extends Sprite {
        constructor(imgData, x, y, options){
            options = options || {};

            // default hit circle size
            options.modifiedHitcircle = 
                    options.modifiedHitcircle || {dx:0, dy:10, r: 20, resolutionWeight: 50};

            super (imgData, x, y, options );

            // to access this from inside a callback function
            var that = this;

            this.dx; // how much you moved last time you moved, used for collision resolution
            this.dy;

            this.direction; // keep track of what direction you're facing. Helps decide which animation to play

            this.isAttacking = false; // keep track of when you are attacking

            // set initial frame
            this.frame = [0, 10];

            // add animations, which assume the standard spritesheet coming from LPC character generator
            // http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/
            Sprite.addAnimation(
                this, 'walkDown', 
                [[0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10]],
                5
            )
            Sprite.addAnimation(
                this, 'walkUp', 
                [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8]],
                5
            )
            Sprite.addAnimation(
                this, 'walkLeft', 
                [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9]],
                5
            )
            Sprite.addAnimation(
                this, 'walkRight', 
                [[0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11]],
                5
            )

            this.finishedAttacking = function(){
                that.isAttacking = false;
                // stand normally facing the direction you were just attacking
                switch(that.direction){
                    case 'up':
                        that.frame = [0, 0];
                        break;
                    case "left": 
                        that.frame = [0, 1];
                        break;
                    case "down":
                        that.frame = [0, 2];
                        break;
                    case "right":
                        that.frame = [0, 3];
                        break;
                }
            }
            Sprite.addAnimation(
                this, 'slashUp', 
                [[0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [4, 12], [3, 12], [2, 12]],
                5,
                true,
                this.finishedAttacking
            )
            Sprite.addAnimation(
                this, 'slashLeft', 
                [[0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [4, 13], [3, 13], [2, 13]],
                5,
                true,
                this.finishedAttacking
            )
            Sprite.addAnimation(
                this, 'slashDown', 
                [[0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [4, 14], [3, 14], [2, 14]],
                5,
                true,
                this.finishedAttacking
            )
            Sprite.addAnimation(
                this, 'slashRight', 
                [[0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [4, 15], [3, 15], [2, 15]],
                5,
                true,
                this.finishedAttacking
            )

            this.movementSpeed = 80;
            this.movingTo = undefined;
            this.movingToCue = [];
            this.actionCue = [];
        }

        stopMoving(){
            this.movingTo = undefined;
            if (this.currentAnimation == 'walkDown'){
                this.frame = [0, 10]
            } else if (this.currentAnimation == 'walkUp'){
                this.frame = [0, 12]
            } else if (this.currentAnimation == 'walkLeft'){
                this.frame = [0, 9]
            } else if (this.currentAnimation == 'walkRight'){
                this.frame = [0, 11]
            } 
            this.stopAnimation();
            this.movingToCue = [];
        }

        updateActionCue(dt){
            // action cue takes action arrays like:
            // ["move", x, y] or ["attack", {Enemy}, range]

            var action = this.actionCue[0];
            // If action is to move
            if (!action){
                return; // if no action, do nothing
            }
            else if (action[0] == "move"){
                if (typeof action[1] == 'number'){
                    this.moveTo(action[1], action[2]);
                } else if (typeof action[1] == "object"){ // else, move target should be a sprite
                    // expecting ["move", {Sprite}, closeEnoughRange]
                    this.moveTo(action[1].x, action[1].y, action[2])
                } else {
                    addError("Don't know how to handle this action: ", action);
                } 
            } else if (action[0] == 'interact'){

            } else if (action[0] == "attack"){

            }
        }

        moveTo(x, y, closeEnough){
            // if passed x y coordinates, move to there
                // move to spot
            // get the x and y vectors for this player moving towards a point
            var vectorX = x - this.x;
            var vectorY = y - this.y - 22; // -22 so the feet land at the location, rather than the waist area
            // if far from point, keep moving
            var closeEnough = closeEnough || this.movementSpeed/70; // how far from point  is close enough depends on how fast you're moving
            if (Math.sqrt( vectorX*vectorX + vectorY*vectorY ) > closeEnough){
                var sideX = Math.abs(vectorX);
                var sideY = Math.abs(vectorY);

                var sum = sideX + sideY;

                var velocityX = vectorX / sum * this.movementSpeed;
                var velocityY = vectorY / sum * this.movementSpeed;

                if ( sideX > sideY ){
                    if (vectorX > 0){ this.animate('walkRight') }
                    else { this.animate('walkLeft') }
                } else {
                    if (vectorY > 0){ this.animate('walkDown') }
                    else { this.animate('walkUp') }
                }
                // this.dx = velocityX * dt/1000;
                // this.dy = velocityY * dt/1000;
                this.x += velocityX * dt/1000; // this.dx;
                this.y += velocityY * dt/1000; // this.dy;
            } else {
                // else, you've arrived!
                this.stopMoving();
                this.actionCue.shift();
            }
        }



        updateMovement(dt){
            if (this.movingTo){

                var movingTo;
                // if movingTo is array, they are [x, y] coords. move there
                if ( Array.isArray(this.movingTo) ){
                    movingTo = this.movingTo;
                } else if (typeof this.movingTo == "object"){
                    // else if its an object (not array) Its a Sprite. Use its x y
                    movingTo = [this.movingTo.x, this.movingTo.y]
                }
                
                // get the x and y vectors for this player moving towards a point
                var vectorX = movingTo[0] - this.x;
                var vectorY = movingTo[1] - this.y - 22; // -22 so the feet land at the location, rather than the waist area
                // if far from point, keep moving
                var closeEnough = this.movementSpeed/70; // how far from point  is close enough depends on how fast you're moving
                if (Math.sqrt( vectorX*vectorX + vectorY*vectorY ) > closeEnough){
                    var sideX = Math.abs(vectorX);
                    var sideY = Math.abs(vectorY);

                    var sum = sideX + sideY;

                    var velocityX = vectorX / sum * this.movementSpeed;
                    var velocityY = vectorY / sum * this.movementSpeed;

                    if ( sideX > sideY ){
                        if (vectorX > 0){ this.animate('walkRight') }
                        else { this.animate('walkLeft') }
                    } else {
                        if (vectorY > 0){ this.animate('walkDown') }
                        else { this.animate('walkUp') }
                    }
                    // this.dx = velocityX * dt/1000;
                    // this.dy = velocityY * dt/1000;
                    this.x += velocityX * dt/1000; // this.dx;
                    this.y += velocityY * dt/1000; // this.dy;
                } else {
                    // else, you've arrived!
                    // check to see if there's more movement cued up
                    if (this.movingToCue.length){
                        this.movingTo = this.movingToCue.shift();
                    } else {
                        this.stopMoving();
                    }
                }       
            }
        }

        // calculate distance from this char to target
        calculateDistanceTo(target){
            var sideX = this.x - target.x;
            var sideY = this.y - target.y;

            return distance = Math.sqrt(sideX*sideX + sideY*sideY);

        }

        update(dt){
            this.updateMovement(dt);
        }
    }

    return Character;
}