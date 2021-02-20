

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


// use this collision check every time. This will handle all the hitbox business and the resolution, keeping that login out of the collision functions themselves
// checks what shape thing is and makes the right collision check
function collisionCheck(shape, element, resolution, callback){
    if (shape.bodyShape == 'circle'){
        // if the shape is a circle, run it against the right shape from the array
        if (element.bodyShape == 'circle'){
            // Do circle vs circle collision
            // find out which is big and which is little circle (needed in case of resolution)
            var big, little, bigHitcircle, littleHitcircle;
            var shapeHitbox = shape.hitcircle(),
                elementHitbox = element.hitcircle();
            if (shapeHitbox.r > elementHitbox.resolutionWeight){
                big = shape,
                bigHitcircle = shapeHitbox,
                little = element,
                littleHitcircle = elementHitbox;
            } else {
                big = element,
                bigHitcircle = elementHitbox,
                little = shape,
                littleHitcircle = shapeHitbox;
            }

            var result = circlesvscirclesCollision(bigHitcircle, littleHitcircle, resolution, callback);
            if (result){
                if (resolution){
                    little.x += result[0]/8;
                    little.y += result[1]/8;
                }
                if (callback){
                    callback(element);
                }
            }
        } else if (element.bodyShape == 'rect'){
            // circle vs rectangle
            var hitcircle = shape.hitcircle();
            var hitbox = element.hitbox();
            var result = circlevsrectangleCollision(hitcircle, hitbox, resolution, callback);
            if (result){
                if (resolution){
                // this simple resolution just moves the guy back by as much as the sides calculated above.
                // perhaps I can make it smoother by implementing the code below explained in the stack over flow post linked. but fine for now
      

                ///// https://stackoverflow.com/questions/45370692/circle-rectangle-collision-response
                // var nearestX = Max(hitbox.x, Min(hitcircle.x, hitbox.x + hitbox.w));
                // var nearestY = Max(hitbox.y, Min(hitcircle.y, hitbox.y + hitbox.h));

                // var dist = {x: hitcircle.x - nearestX, y: hitcircle.y - nearestY};
                // var dnormal = {x:-dist.y, y: dist.x};

                // var normal_angle = atan2(dnormal.y, dnormal.x);
                // var incoming_angle = atan2(circle.vel.y, circle.vel.x);
                // var theta = normal_angle - incoming_angle;
                // circle.vel = circle.vel.rotate(2*theta);
                    shape.x += result[0]/3;
                    shape.y += result[1]/3;
                }
                if (callback){
                    callback(element);
                }
            }
        }
        else {
            var msg = "I don't know what this shape is: " + element.bodyShape;
            addError(msg);
            alert(msg);
        }
    } else
    if (shape.bodyShape == 'rectangle'){
        // If first shape is a rectangle
        if (element.bodyShape == 'rectangle'){
            // rect vs rect
            return rectangevsrectangleCollision(shape, element);

        } else if (element.bodyShape == 'circle'){
            // might not need this for a while
        }
    }
}

// checks what shape thing is and makes the right collision check vs array
// function collisionCheckArray(shape, array, resolution, callback){

//     if (shape.bodyShape == 'circle'){
//         // if the shape is a circle, run it against the right shape from the array
//         for (let i = 0; i < array.length; i++) {
//             const element = array[i];
//             collisionCheck(shape, element, resolution, callback)
//         }
//     }
// }


// Circles Collision //

function circlesvscirclesCollision(bigHitcircle, littleHitcircle, resolution, callback){ // callbackParams** passed but currently not used


    // find distance between circles
    var sideX = bigHitcircle.x - littleHitcircle.x;
    var sideY = bigHitcircle.y - littleHitcircle.y;
    var distance = Math.sqrt(sideX*sideX + sideY*sideY) || 1;

    // if the distance is < sum of the radii, they're colliding
    var colliding = distance < bigHitcircle.r + littleHitcircle.r;

    // resolve collision by moving circle bigHitcircle away from circle 2
    // by getting a ratio of the x and y vectors (sides)
    if (colliding){
        if (resolution){
            var x = - ( bigHitcircle.r+littleHitcircle.r ) * sideX/distance;
           var y = - ( bigHitcircle.r+littleHitcircle.r ) * sideY/distance;
           return [x, y];
        } else {
            return true;
        }
    }
    return false;
}

// Circle vs Rectangle

function circlevsrectangleCollision(circle, rectangle, resolution, callback){

    // on the rectangle, find the point closest to the circle
    var nearestX = Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.w));
    var nearestY = Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.h));

    // calculate distance between nearest point on the rectangle, and the circle's center
    var sideX = circle.x - nearestX;
    var sideY = circle.y - nearestY;
    var distance = Math.sqrt(sideX*sideX + sideY*sideY) || 1;

    // if distance <= radius, colliding
    var colliding = distance <= circle.r;

    if (colliding){
        if (resolution){
            var x = sideX
           var y = sideY
           return [x, y];
        } else {
            return true;
        }
    }
    return false;


    // if (colliding){
    //     if (callback){ callback(circle, rectangle, resolution) }
    //     if (resolution){
            
    //         // this simple resolution just moves the guy back by as much as the sides calculated above.
    //         // perhaps I can make it smoother by implementing the code below explained in the stack over flow post linked. but fine for now
    //         circle.x += sideX;
    //         circle.y += sideY;

    //         ///// https://stackoverflow.com/questions/45370692/circle-rectangle-collision-response
    //         // var nearestX = Max(hitbox.x, Min(hitcircle.x, hitbox.x + hitbox.w));
    //         // var nearestY = Max(hitbox.y, Min(hitcircle.y, hitbox.y + hitbox.h));

    //         // var dist = {x: hitcircle.x - nearestX, y: hitcircle.y - nearestY};
    //         // var dnormal = {x:-dist.y, y: dist.x};

    //         // var normal_angle = atan2(dnormal.y, dnormal.x);
    //         // var incoming_angle = atan2(circle.vel.y, circle.vel.x);
    //         // var theta = normal_angle - incoming_angle;
    //         // circle.vel = circle.vel.rotate(2*theta);
    //     }
    // }
                     
}

// Well that was easy //
var rectanglevscircleCollision = function(rectangle, circle, resolution, callback){
    return circlevsrectangleCollision(circle, rectangle, resolution, callback);
}

var rectangevsrectangleCollision = function(rect1, rect2, resolution, callback){
    return  rect1.x + rect1.w > rect2.x && rect1.x < rect2.x+rect2.w &&
    rect1.y + rect1.w > rect2.y && rect1.y < rect2.y+rect2.h
}

var isPointInCircle = function(point, circle){
    
    // find distance between point and circle center
    var sideX = point.x - circle.x;
    var sideY = point.y - circle.y;

    var distance = Math.sqrt(sideX*sideX + sideY*sideY);

    var result = circle.r >= distance;
    return result;
}

var isPointInRectangle = function(point, rect){
    return point.x >= rect.x && point.x <= rect.x+rect.w &&
    point.y >= rect.y && point.y <= rect.y+rect.h;
}


