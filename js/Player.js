var setupPlayerClass = function(){
    class Player extends Character {
        constructor(imgData, x, y, controls, camera){
            super (imgData, x, y);

            this.type = "player";
            this.collisionCounter = 0;
            
            this.controls = controls;
            this.camera = camera;
            this.movementSpeed = 200;
        }

        update(dt){
            if (controls.mouseIsDown == 1){
                // to fix movement not continuing when mouse is held down but not moved, the camera offset must be applied at this point, and not earlier when the controller stores the cursor position. cursor position must be stored as value relative to canvas, not game world
                var canvasPos = this.controls.mousePosition
                this.movingTo = [canvasPos[0] + this.camera.x - this.camera.width/2, canvasPos[1] + this.camera.y - this.camera.height/2];
                this.movingToCue = [];
                
            } else if (controls.mouseIsDown == 3){
                // add move command to the movement cue
                var canvasPos = this.controls.mousePosition
                this.movingToCue.push( [canvasPos[0] + this.camera.x - this.camera.width/2, canvasPos[1] + this.camera.y - this.camera.height/2] );
                
            }
            
            super.update(dt);
        }

    }
    
    return Player;
}