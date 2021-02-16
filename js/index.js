

/////////////////////////////////////////////////////////////////////////////////
// create code
var create = function(data) // data contains an obj with all the data from the preload phase and any other previous step
{
    // image maker creates new spritesheets of characters with various items
    var imgMaker = setupImageMaker(data);

    // camera
    var camera = setupCamera();

    // create and draw world
    world = setupWorld(data, camera);
    objectsToUpdate.push(world)

    // create sprite class and animations
    Sprite = setupSpriteClass(data, camera);
    Character = setupCharacterClass(data);
    Player = setupPlayerClass(data);

    // controls
    var controls = initPlayerControls();

    //////////////////////////////////////////
    
    var testEnemy = new Character("skeleton", 768-32, 992-32);
    objectsToUpdate.push(testEnemy);

    var rock = new Sprite("rock", 16, 16, 0, 0, 16);
    objectsToUpdate.push(rock);
    rock.frame = [1, 0]

    var player = new Player("male-light", 20, 50, controls, camera);
    objectsToUpdate.push(player);
    
    player.imgObj = imgMaker(["male-light","shirt-brown-longsleeve" , "leather-chest-male", "teal-pants-male", "spear-male"]);
    camera.following = player;
    camera.world = world;
    objectsToUpdate.push(camera)
}


