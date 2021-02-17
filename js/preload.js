///////////////////////////////////////////////////////////////////////////////////////
// preload code
var images;
(function(){
    var imagesToPreload = {
        // "name": ["url=>imgObj", frameWidth, frameHeight]
        "male-dark": ["imgs/males/dark.png", 64, 64],
        "male-dark2": ["imgs/males/dark2.png", 64, 64],
        "male-darkelf": ["imgs/males/darkelf.png", 64, 64],
        "male-darkelf2": ["imgs/males/darkelf2.png", 64, 64],
        "male-light": ["imgs/males/light.png", 64, 64],
        "male-orc": ["imgs/males/orc.png", 64, 64],
        "male-orc-red": ["imgs/males/red_orc.png", 64, 64],
        "skeleton": ["imgs/males/skeleton.png", 64, 64],
        "male-tanned": ["imgs/males/tanned.png", 64, 64],
        "male-tanned2": ["imgs/males/tanned2.png", 64, 64],

        "female-dark": ["imgs/females/dark.png", 64, 64],
        "female-dark2": ["imgs/females/dark2.png", 64, 64],
        "female-darkelf": ["imgs/females/darkelf.png", 64, 64],
        "female-darkelf2": ["imgs/females/darkelf2.png", 64, 64],
        "female-light": ["imgs/females/light.png", 64, 64],
        "female-orc": ["imgs/females/orc.png", 64, 64],
        "female-orc-red": ["imgs/females/red_orc.png", 64, 64],
        "female-tanned": ["imgs/females/tanned.png", 64, 64],
        "female-tanned2": ["imgs/females/tanned2.png", 64, 64],
        
        "leather-chest-female": ["imgs/leather/chest_female.png", 64, 64],
        "leather-chest-male": ["imgs/leather/chest_male.png", 64, 64],
        "leather-shoulders-female": ["imgs/leather/shoulders_female.png", 64, 64],
        "leather-shoulders-male": ["imgs/leather/shoulders_male.png", 64, 64],

        "shirt-brown-longsleeve": ["imgs/shirts/longsleeve/male/brown_longsleeve.png", 64, 64],
        "shirt-maroon-longsleeve": ["imgs/shirts/longsleeve/male/maroon_longsleeve.png", 64, 64],
        "shirt-teal-longsleeve": ["imgs/shirts/longsleeve/male/teal_longsleeve.png", 64, 64],
        "shirt-white-longsleeve": ["imgs/shirts/longsleeve/male/white_longsleeve.png", 64, 64],

        "shirt-brown-pirate": ["imgs/shirts/sleeveless/female/brown_pirate.png", 64, 64],
        "shirt-brown-sleeveless": ["imgs/shirts/sleeveless/female/brown_sleeveless.png", 64, 64],
        "shirt-maroon-pirate": ["imgs/shirts/sleeveless/female/maroon_pirate.png", 64, 64],
        "shirt-maroon-sleeveless": ["imgs/shirts/sleeveless/female/maroon_sleeveless.png", 64, 64],
        "shirt-teal-pirate": ["imgs/shirts/sleeveless/female/teal_pirate.png", 64, 64],
        "shirt-teal-sleeveless": ["imgs/shirts/sleeveless/female/teal_sleeveless.png", 64, 64],
        "shirt-white-pirate": ["imgs/shirts/sleeveless/female/white_pirate.png", 64, 64],
        "shirt-white-sleeveless": ["imgs/shirts/sleeveless/female/white_sleeveless.png", 64, 64],

        "magenta-pants-female": ["imgs/pants/female/magenta_pants_female.png", 64, 64],
        "red-pants-female": ["imgs/pants/female/red_pants_female.png", 64, 64],
        "teal-pants-female": ["imgs/pants/female/teal_pants_female.png", 64, 64],
        "white-pants-female": ["imgs/pants/female/white_pants_female.png", 64, 64],

        "magenta-pants-male": ["imgs/pants/male/magenta_pants_male.png", 64, 64],
        "red-pants-male": ["imgs/pants/male/red_pants_male.png", 64, 64],
        "teal-pants-male": ["imgs/pants/male/teal_pants_male.png", 64, 64],
        "white-pants-male": ["imgs/pants/male/white_pants_male.png", 64, 64],

        "spear-2h": ["imgs/weapons/spear-2h.png", 64, 64],
        "spear-male": ["imgs/weapons/spear_male.png", 64, 64],
        "dagger-male": ["imgs/weapons/dagger_male.png", 64, 64],
        "woodwand-male": ["imgs/weapons/woodwand_male.png", 64, 64],

        "rock": ["imgs/scenery/rock.png", 32, 32],
        "trunk": ["imgs/scenery/trunk.png", 96, 96],
        "treetop": ["imgs/scenery/treetop.png", 32, 32],
        "dirt": ["imgs/scenery/dirt.png", 32, 32],
        "dirt2": ["imgs/scenery/dirt2.png", 32, 32],
        "grass": ["imgs/scenery/grass.png", 32, 32],
        "grass2": ["imgs/scenery/grassalt.png", 32, 32],
        "water": ["imgs/scenery/water.png", 32, 32],
        "watergrass": ["imgs/scenery/watergrass.png", 32, 32],
        

    };
    var imagesPreloadedCount = 0;
    var imagesNeededToPreload = Object.keys(imagesToPreload).length;


    var imageOnloadFunc = function(){

        imagesPreloadedCount ++; // another img is loaded!
        // console.log("images loaded: "+imagesPreloadedCount+" / "+imagesNeededToPreload);
        if ( imagesNeededToPreload == imagesPreloadedCount ){
            // all images are loaded! export imagesToPreload 
            timeWhenLoadingEnded = Date.now();
            var totalLoadingTime = timeWhenLoadingEnded - timeWhenLoadingStarted;
            console.log("Total loading time in milliseconds is: " + totalLoadingTime);
            create({
                images: imagesToPreload
            });
        }
        
    }
    
    var timeWhenLoadingStarted = Date.now();
    var timeWhenLoadingEnded;
    // iterate and preload all the images here
    for (const key in imagesToPreload) {
        if (Object.hasOwnProperty.call(imagesToPreload, key)) {
            // replaces "url" with actual img object
            var newImg = new Image();
            newImg.src = imagesToPreload[key][0];
            imagesToPreload[key][0] = newImg; // this is where exactly the url gets replaced with the img obj
            newImg.onload = imageOnloadFunc;
        }
    }
})();