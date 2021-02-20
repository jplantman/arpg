// click to move

// controls is passed to the player.
// player isn't ever controlled directly from here, but controller will record all data relating to player input, and the player can handle it during their update

var initPlayerControls = function(camera){

    // this is the controls data the player gets to see
    controls = {
        mouseIsDown: false,
        mousePosition: undefined,
        justClicked: false,
    }

    canvas.addEventListener('mousedown', function(e){
        controls.mouseIsDown = e.which;
        controls.justClicked = true;
        controls.mousePosition = [e.offsetX , e.offsetY];
        
    });

    canvas.addEventListener('contextmenu', function(e){
        e.preventDefault();
    });

    canvas.addEventListener('mouseup', function(){
        controls.mouseIsDown = false;
        controls.justClicked = false;
    });
    

    canvas.addEventListener('mousemove', function(e){
        controls.mousePosition = [e.offsetX , e.offsetY];
    });

    return controls;
}















// keyboard controls

// const keyCodes = [
//     ["W", 87],
//     ["S", 83],
//     ["A", 65],
//     ["D", 68],
//     ["UP", 38],
//     ["DOWN", 40],
//     ["LEFT", 37],
//     ["RIGHT", 39]
// ]

// const controls = {
//     "W": false,
//     "S": false,
//     "A": false,
//     "D": false,
//     "UP": false,
//     "DOWN": false,
//     "LEFT": false,
//     "RIGHT": false
// }

// document.addEventListener("keydown", function(e){
//     for (let i = 0; i < keyCodes.length; i++) {
//         const element = keyCodes[i];
//         if (e.keyCode == element[1]){
//             controls[element[0]] = true;
//         }
//     }
// });

// document.addEventListener("keyup", function(e){
//     for (let i = 0; i < keyCodes.length; i++) {
//         const element = keyCodes[i];
//         if (e.keyCode == element[1]){
//             controls[element[0]] = false;
//         }
//     }
// });