
var loopActive = true;
var objectsToUpdate = [];
var objectsToUpdateLast = []; // these 2 arrays are concatenated during the loop, to ensure the last ones happen at the end
var lastTime;

/*
            the idea is to have ONE loop, and iterate through each thing just once per frame, rather than having a million small loops scattered around

            mark any checks that have to happen on the object, and handle them in this function

        */
       
function loop(){
    // erase everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // calculate dt
    var now = Date.now();
    var dt = now - lastTime;
    lastTime = now;
    // handle objects updates and draws
    updateAndDrawEverything(dt);
    // loop again
    if (loopActive){
        requestAnimationFrame(loop);
    }
}
// start the loop! //
lastTime = Date.now();
loop();


function updateAndDrawEverything(dt){
    var objectsToUpdateInTotal = objectsToUpdate.concat(objectsToUpdateLast);
    for (let i = 0; i < objectsToUpdateInTotal.length; i++) {
        const element = objectsToUpdateInTotal[i];

        // remove Sprites that died -- UNTESTED
        if ( element.markedForDeath ){

            // check which array the object belonged to, and remove it from that source array
            if (i < objectsToUpdate){
                objectsToUpdate.splice(i, 1);
            } else {
                var iToRemove = i-objectsToUpdate.length;
                objectsToUpdateLast.splice(iToRemove, 1);
            }
            continue;
        }

        element.update(dt);
        element.draw();
        

        // Check for collision data and run collision check
        if (element.collisionData){
            
            // loop through the array of collisionDatas
            for (let n = 0; n < element.collisionData.length; n++) {
                const thisCollisionData = element.collisionData[n];
                // console.log(thisCollisionData)
                for (let i = 0; i < thisCollisionData.target.length; i++) {
                    const target = thisCollisionData.target[i];
                    collisionCheck(element, target, thisCollisionData.resolution, thisCollisionData.callback);
                }
            }
        }      
    }
}