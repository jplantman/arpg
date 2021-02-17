var setupPlayerClass = function(){
    class Player extends Character {
        constructor(imgData, x, y, controls, camera){
            super (imgData, x, y);
            
            this.controls = controls;
            this.camera = camera;
            this.movementSpeed = 200;
        }

        update(dt){
            if (controls.mouseIsDown == 1){
                // to fix movement not continuing when mouse is held down but not moved, the camera offset must be applied at this point, and not earlier when the controller stores the cursor position. cursor position must be stored as value relative to canvas, not game world
                var canvasPos = this.controls.mousePosition
                this.movingTo = [canvasPos[0] + this.camera.x - this.camera.width/2, canvasPos[1] +  + this.camera.y - this.camera.height/2];
                // console.log(this.hitbox())
            }
            
            super.update(dt);
        }

    }
    
    return Player;
}