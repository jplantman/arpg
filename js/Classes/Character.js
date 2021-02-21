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
                console.log('finishedAttacking');
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

            /////////////////    start attacking    //////////////////
            Sprite.addAnimation(
                this, 'slashUp', 
                [[0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12]],
                5,
                true,
                this.basicAttack.bind(this)
            )
            Sprite.addAnimation(
                this, 'slashLeft', 
                [[0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13]],
                5,
                true,
                this.basicAttack.bind(this)
            )
            Sprite.addAnimation(
                this, 'slashDown', 
                [[0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14]],
                5,
                true,
                this.basicAttack.bind(this)
            )
            Sprite.addAnimation(
                this, 'slashRight', 
                [[0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15]],
                5,
                true,
                this.basicAttack.bind(this)
            )
                //////////////  Attack Finish  ////////////////////////////

            Sprite.addAnimation(
                this, 'slashUpFinish', 
                [[4, 12], [3, 12], [2, 12]],
                5,
                true,
                this.finishedAttacking
            )
            Sprite.addAnimation(
                this, 'slashLeftFinish', 
                [[4, 13], [3, 13], [2, 13]],
                5,
                true,
                this.finishedAttacking
            )
            Sprite.addAnimation(
                this, 'slashDownFinish', 
                [[4, 14], [3, 14], [2, 14]],
                5,
                true,
                this.finishedAttacking
            )
            Sprite.addAnimation(
                this, 'slashRightFinish', 
                [[4, 15], [3, 15], [2, 15]],
                5,
                true,
                this.finishedAttacking
            )

            ///////////////////////////

            this.movementSpeed = 80;
            this.actionCue = [];
        }

        stopMoving(){
            this.actionCue = [];
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
        }

        updateActionCue(dt){
            // action cue takes action arrays like:
            // ["move", x, y] or ["attack", {Enemy}, range] or ["interact", {Chest}, range]
            // this function will make a Character walk up to something/somewhere and do some action there
            
            var action = this.actionCue[0];
            
            // if there's an action...
            if (action){ 
                // get the details
                var x, y, range, actionType;
                // check if the action is to a point or a Sprite
                if (typeof action[1] == 'number'){
                    x = action[1];
                    y = action[2];
                    range = action[3] || 0;
                } else if (typeof action[1] == 'object'){
                    x = action[1].x;
                    y = action[1].y;
                    range = action[2]
                     + // add the size of each Sprite to account for their bodies
                        this.hitcircle().r +
                        action[1].hitcircle().r;
                    
                }
                actionType = action[0];
                console.log('doing action ', action)
                

                // get the x and y vectors for this player moving towards the point
                var vectorX = x - this.x;
                var vectorY = y - this.y;// - 22; // -22 so the feet land at the location, rather than the waist area
                // if far from point, keep moving
                range += this.movementSpeed/100; // how far from there is close enough depends on how fast you're moving
                
                // are we close enough to where we need to go?
                // or do we need to walk?
                var needToWalk = actionType != "attackInPlace" &&
                            Math.sqrt( vectorX*vectorX + vectorY*vectorY ) > range
                if (needToWalk){
                    // start walking. calculate x and y of our path
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
                    // do something if you were supposed to
                    if (actionType == 'interact'){
                        action[1].interact()
                    } else if (actionType == 'attack' || actionType == "attackInPlace"){
                        this.launchBasicAttack(x, y);
                    }
                    this.actionCue.shift();
                }
            }
            return;
            
        }



        launchBasicAttack(x, y){ // this STARTS a basic attack. At the peak of animation, launchBasicAttack
            console.log('launchBasicAttack');
            this.isAttacking = true
            // console.log(this.type," is attacking ",x, y);
            // find direction of click
            var vectorX = x - this.x;
            var vectorY = y - this.y;

            // make sure the attack uses the correct range
            var range = 5; // test number
            // extend range by your size
            range += this.hitcircle().r;
            if (range){ // this is the range only for melee attacks. Not relevant when shooting
                // to find the correct x and y, we need to do some math
                // angle of the attack should == atan2(y, x)
                var angle = Math.atan2(vectorY, vectorX) - Math.PI;

                // // need the hypotenuse (distance between points) to calc our true x and y
                // var hyp = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
                var y = (this.y+9) + range * -Math.sin(angle);
                var x = this.x + range * -Math.cos(angle);
            }

            var sideX = Math.abs(vectorX);
            var sideY = Math.abs(vectorY);

            // store the parameters to be used when calling the basicAttack function for this launchBasicAttack call
            this.basicAttackData = [x, y, {
                damage: 10,
                modifiedHitcircle: {r: 5},
                damageType: "physical",
                fromType: this.type // does the attack belong to the player or an enemy?
            }];

            if ( sideX > sideY ){
                if (vectorX > 0){ this.animate('slashRight'); this.direction = 'right'; }
                else { this.animate('slashLeft'); this.direction = 'left'; }
            } else {
                if (vectorY > 0){ this.animate('slashDown'); this.direction = 'down'; }
                else { this.animate('slashUp'); this.direction = 'up'; }
            }

        }
        basicAttack(){
            var basicAttackData = this.basicAttackData;
            objectsToUpdate.push(new Attack(
                undefined, // imgName
                basicAttackData[0], // x
                basicAttackData[1], // y
                basicAttackData[2], // options
                undefined // bonusOptions
            ));
            console.log('basicAttack', this.direction);
            if (this.direction == 'up'){ this.animate('slashUpFinish') }
            else if (this.direction == 'down'){ this.animate('slashDownFinish') }
            else if (this.direction == 'left'){ this.animate('slashLeftFinish') }
            else if (this.direction == 'right'){ this.animate('slashRightFinish') }
            else {
                addError("don't know what to do with this direction: ", this.direction)
            }
        }

        // calculate distance from this char to target
        calculateDistanceTo(target){
            var sideX = this.x - target.x;
            var sideY = this.y - target.y;

            return distance = Math.sqrt(sideX*sideX + sideY*sideY);

        }

        update(dt){
            // this.updateMovement(dt);
            this.updateActionCue(dt);
        }
    }

    return Character;
}