var setupPlayerClass = function(){
    class Player extends Character {
        constructor(imgData, x, y, controls, camera){
            super (imgData, x, y);

            this.name = randy("name");
            this.type = "player";
            this.collisionCounter = 0;

            this.strength = 20;
            this.skill = 20;
            this.toughness = 20;
            this.magicka = 20;
            
            this.controls = controls;
            this.camera = camera;
            this.movementSpeed = 200;
            
            // enable collision with enemy's attacks
            enableCollisions(this, {
                target: Attack.enemyAttacks,
                type: 'circlevscircles',
                options: {
                    resolution: false,
                    killOnContact: true
                },
                callback: this.takeAttack.bind(this)
            });
        }

        update(dt){

            if (this.controls.mouseIsDown && !this.isAttacking){
                // mouse is being clicked!
                // if left click on something, go up to it and interact
                // if right click on something, ???
                // if left click on ground, move there
                // if right click on ground, attack

                var canvasPos = {
                    // to fix movement not continuing when mouse is held down but not moved, the camera offset must be applied at this point, and not earlier when the controller stores the cursor position. cursor position must be stored as value relative to canvas, not game world
                    x: this.controls.mousePosition[0] + this.camera.x - this.camera.width/2,
                    y: this.controls.mousePosition[1] + this.camera.y - this.camera.height/2
                }
                // first check if an item is being selected. If so, all you gotta do is drop that item

                var clickingOnSomething;
                // Are you clicking on something? //
                for (let i = 0; i < objectsToUpdate.length; i++) {
                    const object = objectsToUpdate[i];
                    
                    // check if object is clickable. if not, no need to check any more
                    if (object.isClickable){  
                        if (object.bodyShape == 'circle' && isPointInCircle(canvasPos, object.hitcircle()) ){
                            clickingOnSomething = object; 
                            break;
                        } else
                        if (object.bodyShape == 'rect' && isPointInRectangle(canvasPos, object.hitbox()) ){ 
                            clickingOnSomething = object; 
                            break;
                        }
                    }
                }
                
                // IF CLICKING ON SOMETHING //
                if (clickingOnSomething){
                    // we just clicked, (not hold down and move over)
                    if (this.controls.justClicked && 
                        (clickingOnSomething.type == 'npc' || clickingOnSomething.type == 'item')){
                    // cue action to interact
                        this.actionCue = [["interact", clickingOnSomething, 0]];
                        // clickingOnSomething.onClick();
                    }
                    else if (clickingOnSomething.type == 'enemy'){

                        // if left click enemy
                        if (this.controls.mouseIsDown == 1 && !this.isAttacking){

                            // cue up action to walk up and attack
                            this.actionCue = [["attack", clickingOnSomething, 0]];
                            
                        } else if (this.controls.mouseIsDown == 3){
                            this.actionCue = [["attackInPlace", canvasPos.x, canvasPos.y]];
                        }
                    }

                    
                } 
                // IF NOT CLICKING ON SOMETHING //
                else if (this.controls.mouseIsDown == 1){
                    // if selecting an item, drop it there. else, regular move
                    if (world.player.itemSelected){
                        this.actionCue = [["dropSelectedItem", canvasPos.x, canvasPos.y]];
                    } else {
                        // left click on ground, move there
                        // this.movingTo = [ canvasPos.x, canvasPos.y ];
                        // this.movingToCue = [];
                        this.actionCue = [["move", canvasPos.x, canvasPos.y]];
                    }
                }
                else if (this.controls.mouseIsDown == 3){
                    this.actionCue = [["attackInPlace", canvasPos.x, canvasPos.y]];
                    
                    // // right click on ground, attack ground
                    // this.stopMoving();
                    // this.isAttacking = true;
                    // var mousePos = this.controls.mousePosition;
                    // // find direction of click
                    // var vectorX = (mousePos[0]+ this.camera.x - this.camera.width/2) - this.x;
                    // var vectorY = (mousePos[1]+ this.camera.y - this.camera.height/2) - this.y

                    // var sideX = Math.abs(vectorX);
                    // var sideY = Math.abs(vectorY);

                    // if ( sideX > sideY ){
                    //     if (vectorX > 0){ this.animate('slashRight'); this.direction = 'right'; }
                    //     else { this.animate('slashLeft'); this.direction = 'left'; }
                    // } else {
                    //     if (vectorY > 0){ this.animate('slashDown'); this.direction = 'down'; }
                    //     else { this.animate('slashUp'); this.direction = 'up'; }
                    // }
                }
                
                
            }

            // add move command to the movement cue
            // var canvasPos = this.controls.mousePosition
            // this.movingToCue.push( [canvasPos[0] + this.camera.x - this.camera.width/2, canvasPos[1] + this.camera.y - this.camera.height/2] );
            
            
            super.update(dt);

            // if you just clicked, that click happened by now
            this.controls.justClicked = false;
        }

        takeAttack(attack){
            super.takeAttack(attack);
            world.ui.healthBar.update(this);
            console.log('took attack ', attack)
        }

        gainItem(item){
            world.addToInventory(this, item);
            world.ui.updateItemsMenu();
        }


    }
    
    return Player;
}