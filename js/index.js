/*****  Three Main Functions: **********

  preload.js
  create (in this file, index.html)
  loop.js


  **** Family Tree ****

        Sprite
          v
      Character   
          v
        Player

*/

/////////////////////////////////////////////////////////////////////////////////
// create code
const create = function(data) // data contains an obj with all the data from the preload phase and any other previous step
{
    // image maker creates new spritesheets of characters with various items
    const imgMaker = setupImageMaker(data);

    // camera //
    const camera = setupCamera();

    

    // create sprite classes and animations //
    // all setupXClass functions return the class object
    Sprite = setupSpriteClass(data, camera);
    Attack = setupAttackClass(data);
    Character = setupCharacterClass(camera);
    Player = setupPlayerClass(data);
    NPC = setupNPCClass(data, imgMaker);
    Enemy = setupEnemyClass(data, imgMaker);

    // create classes for scenery objects
    Tree = setupTreeClass();

    // create and draw world //
    world = setupWorld(data, camera, testLevel);
    objectsToUpdate.push(world);
    world.processObjectsFromTiledData(Sprite);
    

    // controls //
    const controls = initPlayerControls();

    //////////////////////////////////////////
    
    // var testEnemy = new Character("skeleton", 768-32, 992-32);
    // objectsToUpdate.push(testEnemy);

    // Player //
    const player = new Player("male-light", world.playerStart[0], world.playerStart[1], controls, camera);
    objectsToUpdate.push(player);
    
    player.imgObj = imgMaker(["male-light","shirt-brown-longsleeve" , "leather-chest-male", "teal-pants-male", "dagger-male"]);
    camera.following = player;
    camera.world = world;
    objectsToUpdate.push(camera)

    // Enable collisions between player and scenery objects
    enableCollisions(player, {
        target: world.collideableSceneryCircles,
        type: 'circlevscircles',
        options: {
            resolution: true,
            killOnContact: false
        }
    });

    enableCollisions(player, {
        target: world.collideableSceneryRectangles,
        type: 'circlevsrectangles',
        options: {
            resolution: true,
            killOnContact: false
        },
    });

    enableCollisions(player, {
        target: Enemy.array,
        type: 'circlevsrectangles',
        options: {
            resolution: true,
            killOnContact: false
        },
    });





  


    
    
}


