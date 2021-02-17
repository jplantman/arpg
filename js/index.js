/*****  Three Main Functions: **********

  preload.js
  create (in this file, index.html)
  gameLoop.js


  **** Family Tree ****

        Sprite
          v
      Character   
          v
        Player

*/

/////////////////////////////////////////////////////////////////////////////////
// create code
var create = function(data) // data contains an obj with all the data from the preload phase and any other previous step
{
    // image maker creates new spritesheets of characters with various items
    var imgMaker = setupImageMaker(data);

    // camera //
    var camera = setupCamera();

    

    // create sprite classes and animations //
    Sprite = setupSpriteClass(data, camera);
    Character = setupCharacterClass(camera);
    Player = setupPlayerClass(data);

    // create and draw world //
    world = setupWorld(data, camera);
    objectsToUpdate.push(world);
    world.setupScenery(Sprite);

    // controls //
    var controls = initPlayerControls();

    //////////////////////////////////////////
    
    // var testEnemy = new Character("skeleton", 768-32, 992-32);
    // objectsToUpdate.push(testEnemy);

    // Player //
    var player = new Player("male-light", 20, 50, controls, camera);
    objectsToUpdate.push(player);
    
    player.imgObj = imgMaker(["male-light","shirt-brown-longsleeve" , "leather-chest-male", "teal-pants-male", "spear-male"]);
    camera.following = player;
    camera.world = world;
    objectsToUpdate.push(camera)

    collisionCheck(player, world.collideableScenery);
    
}


