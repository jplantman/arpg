var setupSpriteClass = function(data, camera){

    class Sprite{
        constructor(imgName, x, y, options){

            options = options || {};
            
            let imgData = data.images[imgName]
            this.imgObj = imgData[0];
            this.frameWidth = imgData[1];
            this.frameHeight = imgData[2];

            this.x = x;
            this.y = y;
            this.frame = [0, 0];

            // can pass custom hitbox, else default hitbox will == sprite's dimensions
            // resolutionWeight: the higher it is, the more priority for staying still in a collision resolution
            this.hitcircleData = options.modifiedHitcircle || {r: this.frameWidth/2, dx:0, dy:0, resolutionWeight: 100}

        }

        // returns a hitbox of current location, OR of alternate location if parameters are passed
        // for use in collision detection functions, instead of the full sprite object
        hitcircle(x, y){
            this.hitcircleData.x = x ? x + this.hitcircleData.dx : this.x + this.hitcircleData.dx;
            this.hitcircleData.y = y ? y + this.hitcircleData.dy : this.y + this.hitcircleData.dy;
            return this.hitcircleData;
        }

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

            var debugging = true; // shows collision circles
            if (debugging){
                var hitcircle = this.hitcircle();
            ctx.fillStyle = 'red';
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(hitcircle.x - camera.x+camera.width/2, 
                hitcircle.y - camera.y+camera.height/2, 
                hitcircle.r, 
                0, 2*3.142)
            ctx.fill();
            ctx.globalAlpha = 1;
            }
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

