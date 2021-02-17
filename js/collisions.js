
// enable collisions for specific Sprites //
function enableCollisions(sprite, collisionData){

    // one and two are the 2 sprites colliding
    // 
    // type is for example:
    //   circlevscircles - one sprite vs an array of sprites 
    //   circlesvsselves - each member of an array vs all its friends
    //   circlevsrectangle
    // resolution is true if the circles can move each other as a result of the collision
    // callback function

    
    // Sprite is marked by having collisionData property.
    // the loop picks this up and handles it
    sprite.collisionData = sprite.collisionData || [];
    sprite.collisionData.push( collisionData );

}





// Circles Collision //

function circlesvscirclesCollision(one, two, resolution, callback){
    // find out which is big and which is little circle (needed in case of resolution)
    var big, little, bigHitcircle, littleHitcircle;
    var oneHitbox = one.hitcircle(),
        twoHitbox = two.hitcircle();
    if (oneHitbox.r > twoHitbox.resolutionWeight){
        big = one,
        bigHitcircle = oneHitbox,
        little = two,
        littleHitcircle = twoHitbox;
    } else {
        big = two,
        bigHitcircle = twoHitbox,
        little = one,
        littleHitcircle = oneHitbox;
    }

    // find distance between circles
    var sideX = bigHitcircle.x - littleHitcircle.x;
    var sideY = bigHitcircle.y - littleHitcircle.y;
    var distance = Math.sqrt(sideX*sideX + sideY*sideY) || 1;

    // if the distance is < sum of the radii, they're colliding
    var colliding = distance < bigHitcircle.r + littleHitcircle.r;

    // resolve collision by moving circle bigHitcircle away from circle 2
    // by getting a ratio of the x and y vectors (sides)
    if (colliding){

           if (callback){ callback(bigHitcircle, littleHitcircle, resolution) }

        if (resolution){
           little.x = bigHitcircle.x - ( bigHitcircle.r+littleHitcircle.r ) * sideX/distance;
           little.y = bigHitcircle.y - ( bigHitcircle.r+littleHitcircle.r ) * sideY/distance;
        }
        
    }
}






