var setupSpriteClass = function(data, camera){

    class Sprite{
        constructor(imgName, x, y, hitRadius, hitdx, hitdy ){
            let imgData = data.images[imgName]
            this.imgObj = imgData[0];
            this.frameWidth = imgData[1];
            this.frameHeight = imgData[2];

            this.x = x;
            this.y = y;
            this.frame = [0, 0];

            this.hitCircle = {
                x: function(){ return this.x-hitdx; },
                y: function(){ return this.y-hitdy; },
                r: hitRadius
            }
        }

        collidingWithCircle(otherCircle){
            var x = this.hitCircle.x - otherCircle.x;
            var y = this.hitCircle.y - otherCircle.y;
        
            var dist = Math.sqrt(x*x+y*y);
        
            // circles are colliding if the distance between them is <= the sum of their radii
        
            return dist <= this.hitCircle.r + otherCircle.r; 
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

