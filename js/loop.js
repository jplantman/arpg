
var loopActive = true;
var objectsToUpdate = [];
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
    for (let i = 0; i < objectsToUpdate.length; i++) {
        const element = objectsToUpdate[i];
        element.update(dt);
        element.draw();


        // Check for collision data and run collision check
        if (element.collisionData){
            
            // loop through the array of collisionDatas
            for (let n = 0; n < element.collisionData.length; n++) {
                const thisCollisionData = element.collisionData[n];
               
                // Check what kind of collision //

                // circle vs circles
                if (thisCollisionData.type == "circlevscircles"){
                    var arrayTwo = thisCollisionData.target;
                    for (let i = 0; i < arrayTwo.length; i++) {
                        const target = arrayTwo[i];
                        
                        // run collision function
                        circlesvscirclesCollision(element, target, thisCollisionData.resolution, thisCollisionData.callback, thisCollisionData.callbackParams);  
                    }
                } else if (thisCollisionData.type == "circlesvsselves") {

                } else if (thisCollisionData.type == "circlevsrectangles") {

                }
            }
        }      
    }
}