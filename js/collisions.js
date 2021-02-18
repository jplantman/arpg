
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

function circlesvscirclesCollision(one, two, resolution, callback){ // callbackParams** passed but currently not used
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

// Circle vs Rectangle

function circlevsrectangleCollision(circle, rectangle, resolution, callback){
    // make a new rectangle padded by amount == circle's radius
    var hitcircle = circle.hitcircle();
    var hitbox = rectangle.hitbox();

    // make a new, padded hitbox, where padding == hitcircle radius
    var paddedHitbox = {
        x: hitbox.x - hitcircle.r,
        y: hitbox.y - hitcircle.r,
        w: hitbox.w + 2*hitcircle.r,
        h: hitbox.h + 2*hitcircle.r
    }

    // if circle's center is inside the padded rectangle, they're colliding
    // var colliding = hitcircle.x >= paddedHitbox.x && 
    //                 hitcircle.x <= paddedHitbox.x + paddedHitbox.w &&
    //                 hitcircle.y >= paddedHitbox.y && 
    //                 hitcircle.y <= paddedHitbox.y + paddedHitbox.h;


    // on the rectangle, find the point closest to the circle
    var nearestX = Math.max(hitbox.x, Math.min(hitcircle.x, hitbox.x + hitbox.w));
    var nearestY = Math.max(hitbox.y, Math.min(hitcircle.y, hitbox.y + hitbox.h));

    // calculate distance between nearest pint on the rectangle, and the circle's center
    var sideX = hitcircle.x - nearestX;
    var sideY = hitcircle.y - nearestY;
    var distance = Math.sqrt(sideX*sideX + sideY*sideY) || 1;

    // if distance <= distance, colliding
    var colliding = distance <= hitcircle.r;

    if (colliding){
        if (callback){ callback(circle, rectangle, resolution) }
        if (resolution){
            
            // this simple resolution just moves the guy back by as much as the sides calculated above.
            // perhaps I can make it smoother by implementing the code below explained in the stack over flow post linked. but fine for now
            circle.x += sideX;
            circle.y += sideY;

            ///// https://stackoverflow.com/questions/45370692/circle-rectangle-collision-response
            // var nearestX = Max(hitbox.x, Min(hitcircle.x, hitbox.x + hitbox.w));
            // var nearestY = Max(hitbox.y, Min(hitcircle.y, hitbox.y + hitbox.h));

            // var dist = {x: hitcircle.x - nearestX, y: hitcircle.y - nearestY};
            // var dnormal = {x:-dist.y, y: dist.x};

            // var normal_angle = atan2(dnormal.y, dnormal.x);
            // var incoming_angle = atan2(circle.vel.y, circle.vel.x);
            // var theta = normal_angle - incoming_angle;
            // circle.vel = circle.vel.rotate(2*theta);
        }
    }
                     
}



