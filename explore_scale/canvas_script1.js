var canvas1 = document.getElementById("scale1");
var context1 = canvas1.getContext("2d");
var canvas2 = document.getElementById("scale2");
var context2 = canvas2.getContext("2d");
var mousedown1 = false;
var loc1 = {};

function windowToCanvas_mouse1(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {x: (x - bbox.left) * (canvas.width / bbox.width), y: (y - bbox.top) * (canvas.height / bbox.height)};
}
function drawStart1(evt) {
  evt.preventDefault();
  mousedown1 = true;
  var loc = windowToCanvas_mouse1(canvas1, evt.clientX, evt.clientY);
  loc1.x = loc.x;
  loc1.y = loc.y;
  context1.beginPath();
  context1.moveTo(loc1.x, loc1.y);
  context2.beginPath();
  context2.moveTo(loc1.x, loc1.y);
}
function drawStuff1(evt) {
  if (!mousedown1) return;
  context1.lineWidth = 2;
  context1.strokeStyle = 'blue';
  var loc = windowToCanvas_mouse1(canvas1, evt.clientX, evt.clientY);
  context1.lineTo(loc.x, loc.y);
  context1.stroke();
  
  context2.strokeStyle = 'brown';
  context2.lineTo(loc.x, loc.y);
  context2.stroke();
}
function drawEnd1(evt) {mousedown1 = false;}
canvas1.addEventListener('mousedown', drawStart1);
canvas1.addEventListener('mousemove', drawStuff1);
canvas1.addEventListener('mouseup', drawEnd1);
canvas1.addEventListener('mouseleave', drawEnd1);
