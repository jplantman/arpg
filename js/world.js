
// set up world //
var setupWorld = function(data, camera, tiledData){


    // Scenery objects data //
    // holds options parameter for each type of scenery object
    var sceneryObjectsData = {
        "trunk": {
            class: Tree,
            modifiedHitbox: { // having a modifiedHitbox over-rides hit circle and makes the object a rectange instead of a circle
                w: 16,
                h: 48,
                dx: -8,
                dy: -32
            }
        }
    }

    // world object is exported into create function
    var world = {
        tiledData: tiledData, // 

        processObjectsFromTiledData: function(Sprite){
            // find all the "object group" layers from the Tiled data
            for (let l = 0; l < tiledData.layers.length; l++) {
                const layer = tiledData.layers[l];
                if (layer.type == 'objectgroup'){

                    // create all the objects in the layer
                    for (let i = 0; i < layer.objects.length; i++) {
                        const object = layer.objects[i];
                        
                        // if the object is the player, set player's coordinates to this starting position
                        if (object.type == "player"){
                            this.playerStart = [object.x, object.y];
                            continue;
                        }

                        // Tiled is weird and sometimes adds an 'e' to the beginning of the imgName (type in Tiled)
                        // we check to see if the type is missing, and try it again with the first letter removed
                        if (!data.images[object.type]){
                            addError("can't find image for object type: "+object.type+". Will try again with our in-house attempted fix");
                            // shave off first letter and try again
                            object.type = object.type.substr(1);
                            if (!data.images[object.type]){
                                addError("tried again and failed. Are you sure '"+object.type+"' is a valid image name / object type?");
                            }
                        }
                        // so before giving an error, we try one more time with the attempted fix
                        // imgName = imgName.substring(1);
                        // imgData = data.images[ imgName ];


                        // get the correct options data for the element being made
                        var options = sceneryObjectsData[object.type] || {};
                    
                        // check for custom properties in the Tiled data. If any, add them as bonusOptions
                        var bonusOptions = {};
                        if (object.properties){
                            for (let p = 0; p < object.properties.length; p++) {
                                const property = object.properties[p];
                                bonusOptions[property.name] = property.value
                                
                            }
                        }


                        // figure out which class function should be run. default is Sprite class
                        var correctClassFunction = options.class || Sprite
                        
                        

                        var sceneryObj = new correctClassFunction( object.type, object.x, object.y, options, bonusOptions );
                        objectsToUpdate.push(sceneryObj);

                        // certain scenery but not others should be collide enabled
                        if (object.type == 'rock'){
                            this.collideableSceneryCircles.push(sceneryObj);
                        }
                        if (object.type == 'trunk'){
                            this.collideableSceneryRectangles.push(sceneryObj);
                            // options.modifiedHitbox
                        }
                    }
                }
                
            }
        },
        

        // holds all scenery elements that will collide with the characters
        collideableSceneryCircles: [],
        collideableSceneryRectangles: [],

       
        tilesheetWidth: {
            dirt: 3, // to help calculate x and y positions of tiles
            grass: 3
        },
        draw: function(){
            
            //tiled
            
            // for each layer in the tilemap
            for (let l = 0; l < tiledData.layers.length; l++) {
                const layer = tiledData.layers[l];

                // check to see if it's a tile layer
                if (layer.type == "tilelayer"){

                    // layer.name == tilesheet name ('dirt', 'grass', etc)
                    var w = this.tilesheetWidth[layer.name];
                    
                    for (let t = 0; t < layer.data.length; t++) {

                        if (!layer.firstgid){
                            throw "You have to manually copy/paste the firstgid property into each layer in the Tiled data! Remember each tile layer should only use one spritesheet."
                        }
                        const n = layer.data[t] // number of tile passed by Tiled  
                                - (layer.firstgid-1); // this modification accounts for Tiled starting the number count at a different spot for each tilesheet.

                        // after exporting a Tiled map, make sure to add the firstgid property to each layer
                        // cus we are assuming each layer uses only 1 tilesheet

                        if (n == 0){ continue } // Tiled passes 0 for empty tiles

                        // calc the x and y position of the tile within its tilesheet
                        var x = (n-1) % w;
                        var y = Math.floor( (n-1)/w );
                        
                        // calc the col (x) and row (y) of the tile in the map
                        var col = (t % tiledData.width);
                        var row = Math.floor( t/tiledData.width );
                        
                        ctx.drawImage(data.images[layer.name][0], 
                            32*x, 32*y, 32, 32,
                            Math.round(32*col-camera.x+camera.width/2), Math.round(32*row-camera.y+camera.height/2), 32, 32 
                        )
                    }
                }
                
            }

        },
        update: function(){},

        // calculate world bounds //
        width: tiledData.width*32,
        height: tiledData.height*32,


        // the thing passed is bound to the world bounds
        bound(thing){
            
            if (thing.x - thing.width/2 < 0){
                thing.x = thing.width/2;
            } else if (thing.x + thing.width/2 > this.width){
                thing.x = this.width-thing.width/2;
            }

            if (thing.y - thing.height/2 < 0){
                thing.y = thing.height/2;
            } else if (thing.y + thing.height/2 > this.height){
                thing.y = this.height-thing.height/2;
            }

        }
        
    };



   
    return world;


    
}