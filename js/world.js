var setupWorld = function(data, camera){

    var world = {
        array:[
            ['g1', 'g1', 'g1', 'g1', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g1', 'g', 'g0', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g0', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g2', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g0', 'g', 'g', 'g2', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g0', 'g', 'g', 'g2', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g0', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g0', 'g', 'g', 'g2', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g2', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
            ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g1', 'g', 'g', 'g', 'g', 'g', 'g']
        ],
        scenery: [
            ['rock', 16, 16],
            ['rock', 16*10, 16*3],
            ['rock', 16*35, 16*22],
            ['rock', 16*20, 16*2],
            ['rock', 16*9, 16*28],
        ],
        collideableScenery: [],
        setupScenery:function(Sprite){
            for (let i = 0; i < this.scenery.length; i++) {
                const element = this.scenery[i];
                
                var sceneryObj = new Sprite(element[0], element[1], element[2]); //, 0, 0, 16);
                objectsToUpdate.push(sceneryObj);

                // certain scenery but not others should be collide enabled
                if (element[0] == 'rock'){
                    this.collideableScenery.push(sceneryObj);
                }
            }
        },
        draw: function(){
            // console.log(this.array);
            for (let row = 0; row < this.array.length; row++) {
                const element = this.array[row];
                // console.log(element)
                for (let col = 0; col < element.length; col++) {
                    var spriteName, frameX, frameY;
                    if (element[col] == 'g'){
                        spriteName = 'grass';
                        frameX = 1;
                        frameY = 3;
                    }
                    else if (element[col] == 'g0'){
                        spriteName = 'grass';
                        frameX = 0;
                        frameY = 5;
                    }
                    else if (element[col] == 'g1'){
                        spriteName = 'grass';
                        frameX = 1;
                        frameY = 5;
                    }
                    else if (element[col] == 'g2'){
                        spriteName = 'grass';
                        frameX = 2;
                        frameY = 5;
                    }
                    // console.log(spriteName, row, col)
                    ctx.drawImage(data.images[spriteName][0], 
                        32*frameX, 32*frameY, 32, 32,
                        Math.round(32*col-camera.x+camera.width/2), Math.round(32*row-camera.y+camera.height/2), 32, 32 
                    )
                }
                
            }
        },
        update: function(){},


        // the thing passed is bound to the world bounds
        bound(thing){
            
            if (thing.x - thing.width/2 < 0){
                thing.x = thing.width/2;
            } else if (thing.x + thing.width/2 > this.width){
                thing.x = this.width-thing.width/2;
            }

            if (thing.y - thing.height/2 < 0){
                thing.y = thing.height/2;
            } else if (thing.y + thing.height/2 > this.height){
                thing.y = this.height-thing.height/2;
            }

        }
        
    };

    // calculate world bounds
    world.width = world.array[0].length*32;
    world.height = world.array.length*32;

    
    console.log('world width and height', world.width, world.height)
    return world;


    
}