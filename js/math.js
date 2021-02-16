function circlesColliding(one, two){
	var x = one.x - two.x;
	var y = one.y - two.y;

	var dist = Math.sqrt(x*x+y*y);

	// circles are colliding if the distance between them is <= the sum of their radii

	return dist <= one.frameWidth/2 + two.frameWidth/2;
}








/*


function distanceTo(sprite, x, y){
	// get distance between a sprite and a point
    // dist^2 = x^2 + y^2
	var sideX = sprite.x - x; 
	var sideY = sprite.y - y;
	return Math.sqrt( sideX*sideX + sideY*sideY );
}

function distanceBetween(sprite, other){
	// get distance between a sprite and a point
	var x = other.x + other.w/2;
	var y = other.y + other.h/2;

	return distanceTo(sprite, x, y) - (other.w+other.h)/4;
}

function angleTo(sprite, x, y){
	// get angle between a sprite and a point

	var sideX = sprite.x - x;
	var sideY = sprite.y - y;

	return Math.atan2(sideY, sideX);
}

function getVelocities(sprite, x, y, speed){
	// get the x and y vectors for an item moving from a sprite towards a point

	var vectorX = x - sprite.x;
	var vectorY = y - sprite.y;

	var sideX = Math.abs(vectorX);
	var sideY = Math.abs(vectorY);

	var sum = sideX + sideY;

	var velocityX = vectorX / sum * speed;
	var velocityY = vectorY / sum * speed;

	var direction;
	if ( sideX > sideY ){
		if (vectorX > 0){ direction = 'right' }
		else { direction = 'left' }
	} else {
		if (vectorY > 0){ direction = 'down' }
		else { direction = 'up' }
	}

	return [ velocityX, velocityY, direction ];
}

function rand(n){
	return Math.round( Math.random()*n );
}

/**/ 
