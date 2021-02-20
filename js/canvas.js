// UI universal colors and styles
var menuColor = "#444";


// Game window. Canvas and all other elements go in here
var gameWindow = document.createElement('div');
document.body.appendChild(gameWindow);
gameWindow.style = "display: inline-block";


// create canvas, insert into game window
var canvas = document.createElement('canvas');
canvas.width = 64*10;
canvas.height = 64*6;
gameWindow.appendChild(canvas);
// document.body.insertBefore(canvas, document.body.childNodes[0]);
var ctx = canvas.getContext('2d');


// game menu for pausing, saving, etc
var gameMenu = document.createElement('div');

gameMenu.innerHTML = "Pause, etc...";

gameMenu.style.position = "absolute";
gameMenu.style.top = canvas.height*0.25+"px";
gameMenu.style.left = canvas.width*0.25+"px";
gameMenu.style.height = canvas.height*0.5+"px";
gameMenu.style.width = canvas.width*0.5+"px";
gameMenu.style.backgroundColor = menuColor;
// add buttons and stuff to this menu

// fade whole screen, put game menu on top of that
var fade = document.createElement('div');
fade.style.display = "none";
fade.style.position = "absolute";
fade.style.top = 0;
fade.style.height = canvas.height+"px";
fade.style.width = canvas.width+"px";
fade.style.backgroundColor = "rgba(0,0,0,0.5)";
gameWindow.appendChild(fade);
fade.appendChild(gameMenu);


var textMenu = document.createElement('div');
textMenu.style.position = "absolute";
textMenu.style.top = 0;
textMenu.style.height = 0;
textMenu.style.width = canvas.width+"px";
textMenu.style.backgroundColor = "rgba(200,200,200,0.5)";
textMenu.style.overflowY = "scroll";
textMenu.style.padding = 0;

gameWindow.appendChild(textMenu);
function say(text){
    textMenu.isOpen = true; // keep track of if game menu is open
    textMenu.style.padding = "10px";
    textMenu.style.height = canvas.height/4+"px";
    textMenu.innerHTML += text+"<br/>";
}
textMenu.addEventListener('click', function(){
    if (textMenu.isOpen){
        // close if open
        textMenu.style.height = 0;
        textMenu.style.padding = 0;
        textMenu.isOpen = false;
    } else {
        // open if close
        textMenu.style.height = canvas.height/4+"px";
        textMenu.style.padding = "10px";
        textMenu.isOpen = true;
    }
    
})


// 
