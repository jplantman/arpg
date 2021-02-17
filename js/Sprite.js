var setupSpriteClass = function(data, camera){

    class Sprite{
        constructor(imgName, x, y, modifiedHitbox){
            let imgData = data.images[imgName]
            this.imgObj = imgData[0];
            this.frameWidth = imgData[1];
            this.frameHeight = imgData[2];

            this.lastx; // store these values when moving, so we can revert to old position in case of collision
            this.lasty;

            this.x = x;
            this.y = y;
            this.frame = [0, 0];

            // can pass custom hitbox, else default hitbox will == sprite's dimensions
            this.hitboxData = modifiedHitbox || {w: this.frameWidth, h: this.frameHeight, dx:0, dy:0}

        }

        // returns a hitbox of current location, OR of alternate location if parameters are passed
        // for use in collision detection functions, instead of the full sprite object
        hitbox(x, y){
            this.hitboxData.x = x ? x-this.frameWidth/2 + this.hitboxData.dx : this.x-this.frameWidth/2 + this.hitboxData.dx;
            this.hitboxData.y = y ? y-this.frameHeight/2 + this.hitboxData.dy : this.y- this.frameHeight/2+ this.hitboxData.dy;
            return this.hitboxData;
        }

        // collidingWithCircle(otherCircle){    // OLD, consider deleting this code
        //     var x = this.hitCircle.x - otherCircle.x;
        //     var y = this.hitCircle.y - otherCircle.y;
        
        //     var dist = Math.sqrt(x*x+y*y);
        
        //     // circles are colliding if the distance between them is <= the sum of their radii
        
        //     return dist <= this.hitCircle.r + otherCircle.r; 
        // }

        update(dt){
            
        }

        draw(){
            


            if (this.currentAnimation){
                var animObj = this.animations[this.currentAnimation]
                this.frameCount++;
                if (this.frameCount >= animObj[1]){
                    this.frameCount = 0;
                    this.animationIndex = (this.animationIndex+1)%animObj[0].length;
                    this.frame = animObj[0][this.animationIndex];
                }
            }
            ctx.drawImage(
                this.imgObj,
                this.frame[0]*this.frameWidth, this.frame[1]*this.frameHeight, this.frameWidth, this.frameHeight,
                this.x - this.frameWidth/2 - camera.x+camera.width/2, 
                this.y - this.frameHeight/2 - camera.y+camera.height/2, 
                this.frameWidth, this.frameHeight
            )
        }
    }

    // sprite.currentAnimation = "animationName"; to animate
    Sprite.addAnimation = function(sprite, animationName, framesArray, framesPerFrame){
        sprite.animations = sprite.animations || {};
        sprite.animations[animationName] = [framesArray, framesPerFrame];
        sprite.frameCount = sprite.frameCount || 0;
        sprite.animationIndex = 0;
        // sprite.currentAnimation;
    }

    return Sprite;

}

