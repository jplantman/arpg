var setupCharacterClass = function(camera){

    class Character extends Sprite {
        constructor(imgData, x, y){
            super (imgData, x, y, {dx:16, dy:24, w:32, h:40});

            this.frame = [0, 10];

            Sprite.addAnimation(
                this, 'walkDown', 
                [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10]],
                5
            )
            Sprite.addAnimation(
                this, 'walkUp', 
                [[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8]],
                5
            )
            Sprite.addAnimation(
                this, 'walkLeft', 
                [[1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9]],
                5
            )
            Sprite.addAnimation(
                this, 'walkRight', 
                [[1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11]],
                5
            )

            this.movementSpeed = 80;
            this.movingTo = undefined;

        }

        draw(){
            super.draw();

            // show the hitbox, for debugging!
            var hitbox = this.hitbox();
            ctx.fillStyle = 'red';
            ctx.globalAlpha = 0.3;
            ctx.fillRect(hitbox.x - camera.x+camera.width/2, hitbox.y - camera.y+camera.height/2, hitbox.w, hitbox.h);
            ctx.globalAlpha = 1;
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
            this.currentAnimation = undefined;
        }

        updateMovement(dt){
            if (this.movingTo){
                
                // get the x and y vectors for this player moving towards a point

                var vectorX = this.movingTo[0] - this.x;
                var vectorY = this.movingTo[1] - this.y - 22; // -22 so the feet land at the location, rather than the waist area
                // if far from point, keep moving
                if (Math.sqrt( vectorX*vectorX + vectorY*vectorY ) > this.movementSpeed/70){
                    var sideX = Math.abs(vectorX);
                    var sideY = Math.abs(vectorY);

                    var sum = sideX + sideY;

                    var velocityX = vectorX / sum * this.movementSpeed;
                    var velocityY = vectorY / sum * this.movementSpeed;

                    if ( sideX > sideY ){
                        if (vectorX > 0){ this.currentAnimation = 'walkRight' }
                        else { this.currentAnimation = 'walkLeft' }
                    } else {
                        if (vectorY > 0){ this.currentAnimation = 'walkDown' }
                        else { this.currentAnimation = 'walkUp' }
                    }
                    this.x += velocityX * dt/1000;
                    this.y += velocityY * dt/1000;
                } else {
                    this.stopMoving();
                }       
            }
        }

        update(dt){
            this.updateMovement(dt);
        }
    }

    return Character;
}