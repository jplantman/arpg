var setupImageMaker = function(data){

    var imgMaker = function(arrayOfImgs){
        // stack the images in an off-screen canvas, and return the usable img data
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = 64*13;
        tempCanvas.height = 64*21;
        var tempCtx = tempCanvas.getContext('2d');
        for (let i = 0; i < arrayOfImgs.length; i++) {
            const imgData = data.images[arrayOfImgs[i]][0];
            tempCtx.drawImage(imgData, 0, 0);
        }
        
        var newImg = new Image();
        newImg.src = tempCanvas.toDataURL();
        return newImg;
    }


    return imgMaker;
}


