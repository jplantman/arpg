


// UI universal colors and styles
var backgroundColor1 = "#444";
var backgroundColor2 = "rgba(0,0,0,0.5)";
var foregroundColor = "white";

// Game window. Canvas and all other elements go in here
var gameWindow = document.createElement('div');

gameWindow.style.display = "inline-block";
gameWindow.style.lineHeight = 0;
gameWindow.style.border = "1px solid black";
gameWindow.style.position = 'relative';

// create canvas, insert into game window
var canvas = document.createElement('canvas');
canvas.width = 64*10;
canvas.height = 64*6;

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
gameMenu.style.backgroundColor = backgroundColor1;
// add buttons and stuff to this menu

var setupUI = function(world){
    
    world.ui = {};

    // fade whole screen, put game menu on top of that
    var fade = document.createElement('div');
    fade.style.display = "none";
    fade.style.position = "absolute";
    fade.style.top = 0;
    fade.style.height = canvas.height+"px";
    fade.style.width = canvas.width+"px";
    fade.style.backgroundColor = backgroundColor2;



    var textMenu = document.createElement('div');
    textMenu.style.position = "absolute";
    textMenu.style.top = 0;
    textMenu.style.height = 0;
    textMenu.style.width = (canvas.width-20)+"px";
    textMenu.style.backgroundColor = "rgba(200,200,200,0.5)";
    textMenu.style.overflowY = "scroll";
    textMenu.style.padding = 0;

    world.ui.say = function(text){ 
        textMenu.isOpen = true; // keep track of if game menu is open
        textMenu.style.padding = "10px";
        textMenu.style.height = canvas.height/6+"px";
        textMenu.innerHTML += "<p>" + text + "</p>";
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

    ////////////////// Player's UI /////////////////////

    var playerUI = document.createElement('div');
    var playerUIheight = 30
    playerUI.style.position = 'relative';
    playerUI.style.height = playerUIheight+"px";
    playerUI.style.width = canvas.width+"px";
    playerUI.style.backgroundColor = "lightgrey";
    playerUI.style.padding = 0;
    playerUI.style.margin = 0;




    var menuButtonsBar = document.createElement('div');
    menuButtonsBar.style.backgroundColor = "lightgrey";
    menuButtonsBar.style.width = "100px";
    menuButtonsBar.style.height = "20px";
    menuButtonsBar.style.position = 'absolute';
    menuButtonsBar.style.left = "50%";
    menuButtonsBar.style.top = "-20px";
    menuButtonsBar.style.transform = "translate(-50%, 0)";
    menuButtonsBar.style.borderTopLeftRadius = "6px";
    menuButtonsBar.style.borderTopRightRadius = "6px";
    menuButtonsBar.style.userSelect = "none";
    menuButtonsBar.style.cursor = 'pointer';


    ////////////////// Items Menu /////////////////////

    var itemsMenuBtn = document.createElement('div');
    itemsMenuBtn.innerHTML = "I";
    itemsMenuBtn.style.backgroundColor = "rgba(0,0,0,0.2)";
    itemsMenuBtn.style.padding = '1px';
    itemsMenuBtn.style.height = '15px';
    itemsMenuBtn.style.width = '15px';
    itemsMenuBtn.style.lineHeight = '15px';
    itemsMenuBtn.style.margin = '2px';
    itemsMenuBtn.style.borderRadius = "2px";
    itemsMenuBtn.style.display = 'inline-block';
    itemsMenuBtn.addEventListener('click', function(){
        if (itemsMenu.isOpen){
            itemsMenu.style.display = "none";
            itemsMenu.isOpen = false;
            world.ui.clearSelection();
        } else {
            world.ui.updateItemsMenu();
            itemsMenu.style.display = "block";
            itemsMenu.isOpen = true;
        }
    });
    var itemsMenu = document.createElement('div');
    itemsMenu.isOpen = false;
    itemsMenu.style.display = "none";
    itemsMenu.style.position = "absolute";
    itemsMenu.style.top = 0;
    itemsMenu.style.right = 0;
    itemsMenu.style.height = canvas.height+"px";
    itemsMenu.style.width = canvas.width/2.5+"px";
    itemsMenu.style.backgroundColor = backgroundColor2;

    var equipMenu = document.createElement('div'); // top half of items menu
    equipMenu.style.position = "relative";
    equipMenu.style.top = 0;
    equipMenu.style.height = canvas.height/2+"px";
    equipMenu.style.width = canvas.width/2.5+"px";
    equipMenu.style.backgroundImage = "url('imgs/playerEquip.png')"
    equipMenu.style.backgroundSize = "100% 100%";

    var equipHat = document.createElement('div'); 
    // equipHat.style.backgroundColor = "red";
    equipHat.style.position = "absolute";
    equipHat.style.top = 0;
    equipHat.style.left = "38%"
    equipHat.style.height = "23%";
    equipHat.style.width = "23%";
    equipHat.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipHat.index = 0;

    var equipNecklace = document.createElement('div'); 
    // equipNecklace.style.backgroundColor = "red";
    equipNecklace.style.position = "absolute";
    equipNecklace.style.top = "10%";
    equipNecklace.style.left = "70%"
    equipNecklace.style.height = "23%";
    equipNecklace.style.width = "23%";
    equipNecklace.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipNecklace.index = 1;

    // maybe add later
    // var equipCharm = document.createElement('div'); 
    // // equipCharm.style.backgroundColor = "red";
    // equipCharm.style.position = "absolute";
    // equipCharm.style.top = "10%";
    // equipCharm.style.left = "70%"
    // equipCharm.style.height = "23%";
    // equipCharm.style.width = "23%";
    // equipCharm.style.border = "3px solid rgba(255, 255, 255, 0.5)";

    var equipRightHand = document.createElement('div'); 
    // equipRightHand.style.backgroundColor = "red";
    equipRightHand.style.position = "absolute";
    equipRightHand.style.top = "38%";
    equipRightHand.style.left = "5%"
    equipRightHand.style.height = "23%";
    equipRightHand.style.width = "23%";
    equipRightHand.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipRightHand.index = 2;

    var equipBody = document.createElement('div'); 
    // equipBody.style.backgroundColor = "red";
    equipBody.style.position = "absolute";
    equipBody.style.top = "38%";
    equipBody.style.left = "38%"
    equipBody.style.height = "23%";
    equipBody.style.width = "23%";
    equipBody.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipBody.index = 3;

    var equipLeftHand = document.createElement('div'); 
    // equipLeftHand.style.backgroundColor = "red";
    equipLeftHand.style.position = "absolute";
    equipLeftHand.style.top = "38%";
    equipLeftHand.style.left = "70%"
    equipLeftHand.style.height = "23%";
    equipLeftHand.style.width = "23%";
    equipLeftHand.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipLeftHand.index = 4;

    var equipRightRing = document.createElement('div'); 
    // equipRightRing.style.backgroundColor = "red";
    equipRightRing.style.position = "absolute";
    equipRightRing.style.top = "68%";
    equipRightRing.style.left = "5%"
    equipRightRing.style.height = "23%";
    equipRightRing.style.width = "23%";
    equipRightRing.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipRightRing.index = 5;

    var equipFeet = document.createElement('div'); 
    // equipFeet.style.backgroundColor = "red";
    equipFeet.style.position = "absolute";
    equipFeet.style.top = "68%";
    equipFeet.style.left = "38%"
    equipFeet.style.height = "23%";
    equipFeet.style.width = "23%";
    equipFeet.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipFeet.index = 6;
    
    var equipLeftRing = document.createElement('div'); 
    // equipLeftRing.style.backgroundColor = "red";
    equipLeftRing.style.position = "absolute";
    equipLeftRing.style.top = "68%";
    equipLeftRing.style.left = "70%"
    equipLeftRing.style.height = "23%";
    equipLeftRing.style.width = "23%";
    equipLeftRing.style.border = "3px solid rgba(255, 255, 255, 0.5)";
    equipLeftRing.index = 7;

    equipHat.addEventListener('click', function(){
        world.ui.equipClick(equipHat);
    });
    equipNecklace.addEventListener('click', function(){
        world.ui.equipClick(equipNecklace);
    });
    equipRightHand.addEventListener('click', function(){
        world.ui.equipClick(equipRightHand);
    });
    equipBody.addEventListener('click', function(){
        world.ui.equipClick(equipBody);
    });
    equipLeftHand.addEventListener('click', function(){
        world.ui.equipClick(equipLeftHand);
    });
    equipRightRing.addEventListener('click', function(){
        world.ui.equipClick(equipRightRing);
    });
    equipFeet.addEventListener('click', function(){
        world.ui.equipClick(equipFeet);
    });
    equipLeftRing.addEventListener('click', function(){
        world.ui.equipClick(equipLeftRing);
    });


    // inventory items slots //

    var inventoryMenu = document.createElement('div'); // top half of items menu
    // inventoryMenu.style.position = "relative";
    // inventoryMenu.style.top = "";
    inventoryMenu.style.height = canvas.height/2+"px";
    inventoryMenu.style.width = canvas.width/2.5+"px";
    
    world.ui.inventoryMenu = inventoryMenu; // so we can access it from itemsManager.js
    inventoryMenu.slots = [];
    var slotsAcross = 6,
        slotsDown = 4;

    for (var y = 0; y < slotsDown; y++) {
        inventoryMenu.slots[y] = [];
        for (var x = 0; x < slotsAcross; x++) {
            (function(x, y){
                var inventorySlot = document.createElement('div'); 
                inventorySlot.setAttribute('data-x', x);
                inventorySlot.setAttribute('data-y', y);
                inventorySlot.style.boxSizing = "border-box"
                inventorySlot.style.float = "left";
                inventorySlot.style.height = 100/slotsDown+"%";
                inventorySlot.style.width = 100/slotsAcross+"%";
                inventorySlot.style.border = "2px solid rgba(255, 255, 255, 0.5)";
                inventoryMenu.appendChild( inventorySlot );
                inventoryMenu.slots[y][x] = inventorySlot;
                inventorySlot.addEventListener('click', function(){
                    // click an item to select it
                    var x = inventorySlot.getAttribute('data-x');
                    var y = inventorySlot.getAttribute('data-y');
                    var item = world.player.inventory[y][x];
                    world.ui.inventoryClick(x, y, item, inventorySlot);
                })
            })(x, y);
            
        }
        
    }


    ////////////////// Health And Magic Bar ///////////////////////////

    var healthBarBack = document.createElement('div'); 
    healthBarBack.style.backgroundColor = backgroundColor2;
    healthBarBack.style.width = "100px";
    healthBarBack.style.position = 'absolute';
    healthBarBack.style.left = "8px";
    healthBarBack.style.top = "3px";
    healthBarBack.style.border = "2px solid black";
    healthBarBack.style.height = (playerUIheight-10)+"px";



    var healthBar = document.createElement('div'); 
    healthBar.style.backgroundColor = "red";
    healthBar.style.width = "100%";
    healthBar.style.height = "100%";

    healthBar.update = function(player){
        var percent = 100 * player.health / player.healthMax;
        healthBar.style.width = percent+"%";
    }
    world.ui.healthBar = healthBar;
    ////////////////// Character Menu /////////////////////

    var characterMenuBtn = document.createElement('div');
    characterMenuBtn.innerHTML = "C";
    characterMenuBtn.style.backgroundColor = "rgba(0,0,0,0.2)";
    characterMenuBtn.style.padding = '1px';
    characterMenuBtn.style.height = '15px';
    characterMenuBtn.style.width = '15px';
    characterMenuBtn.style.lineHeight = '15px';
    characterMenuBtn.style.margin = '2px';
    characterMenuBtn.style.borderRadius = "2px";
    characterMenuBtn.style.display = 'inline-block';
    characterMenuBtn.addEventListener('click', function(){
        if (characterMenu.isOpen){
            characterMenu.style.display = "none";
            characterMenu.isOpen = false;
        } else {
            characterMenu.style.display = "block";
            characterMenu.isOpen = true;
            characterMenu.showInfo();
        }
    });
    var characterMenu = document.createElement('div');
    characterMenu.isOpen = false;
    characterMenu.style.display = "none";
    characterMenu.style.position = "absolute";
    characterMenu.style.top = 0;
    characterMenu.style.left = 0;
    characterMenu.style.height = canvas.height+"px";
    characterMenu.style.width = canvas.width/2.5+"px";
    characterMenu.style.backgroundColor = backgroundColor2;
    characterMenu.style.color = foregroundColor;
    characterMenu.style.padding = "10px";
    characterMenu.style.fontSize = "1em";
    characterMenu.showInfo = function(){
        characterMenu.innerHTML = 
                "<p style='font-size: 1.2em'>"+ world.player.name +"</p><br/>"+
                "<p>Strength: "+ world.player.strength +"</p><br/>"+
                "<p>Skill: "+ world.player.skill +"</p><br/>"+
                "<p>Toughness: "+ world.player.toughness +"</p><br/>"+
                "<p>Magicka: "+ world.player.magicka +"</p><br/>";
    }





    /////////////  All elements appended into document here   /////////////

    gameWindow.appendChild(textMenu);


    gameWindow.appendChild(fade);
    fade.appendChild(gameMenu);
    gameWindow.appendChild(characterMenu);
    gameWindow.appendChild(itemsMenu);
    itemsMenu.appendChild(equipMenu);
    equipMenu.appendChild(equipHat);
    equipMenu.appendChild(equipNecklace);
    equipMenu.appendChild(equipRightHand);
    equipMenu.appendChild(equipLeftHand);
    equipMenu.appendChild(equipBody);
    equipMenu.appendChild(equipRightRing);
    equipMenu.appendChild(equipLeftRing);
    equipMenu.appendChild(equipFeet);
    itemsMenu.appendChild(inventoryMenu)

    gameWindow.appendChild(canvas);

    gameWindow.appendChild(playerUI);

    playerUI.appendChild(healthBarBack);

    healthBarBack.appendChild(healthBar);

    playerUI.appendChild(menuButtonsBar);
    menuButtonsBar.appendChild(characterMenuBtn);
    menuButtonsBar.appendChild(itemsMenuBtn);

    document.body.appendChild(gameWindow);

}