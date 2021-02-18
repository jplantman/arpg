// create canvas, insert into document
var canvas = document.createElement('canvas');
canvas.width = 64*10;
canvas.height = 64*6;
document.body.insertBefore(canvas, document.body.childNodes[0]);
var ctx = canvas.getContext('2d');


