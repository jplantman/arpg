
var gameLoopActive = true;
var objectsToUpdate = [];
var lastTime;
function gameLoop(){
    // erase everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // calculate dt
    var now = Date.now();
    var dt = now - lastTime;
    lastTime = now;
    // handle objects updates and draws
    handleObjectUpdatesAndDraws(dt);
    // loop again
    if (gameLoopActive){
        requestAnimationFrame(gameLoop);
    }
}
lastTime = Date.now();
gameLoop();

function handleObjectUpdatesAndDraws(dt){
    for (let i = 0; i < objectsToUpdate.length; i++) {
        const element = objectsToUpdate[i];
        element.update(dt);
        element.draw();
    }
}
