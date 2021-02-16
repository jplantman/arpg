// click to move

var initPlayerControls = function(camera){
    controls = {
        mouseIsDown: false,
        mousePosition: undefined
    }
    canvas.addEventListener('mousedown', function(e){
        controls.mouseIsDown = e.which;
        if (e.which == 1){
            controls.mousePosition = [e.offsetX , e.offsetY];
            
        }
        else if (e.which == 3){
        }
        
    })
    canvas.addEventListener('contextmenu', function(e){
        e.preventDefault();
    })
    canvas.addEventListener('mouseup', function(){
        controls.mouseIsDown = false;
    })

    canvas.addEventListener('mousemove', function(e){
        // console.log(e.offsetX, e.offsetY);
        if (controls.mouseIsDown){
            controls.mousePosition = [e.offsetX , e.offsetY];
            // console.log(e.offsetX, camera.x);
        }
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