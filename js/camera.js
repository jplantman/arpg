var setupCamera = function(){
    var camera = {
        width: canvas.width,
        height: canvas.height,
        x: 0,
        y: 0,
        following: undefined,
        update: function(){
            this.x = this.following.x;
            this.y = this.following.y;
            this.world.bound(camera);
            
        },
        draw: function(){}
    }

    return camera;
}

