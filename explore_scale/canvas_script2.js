var canvas2 = document.getElementById("scale2");
var context2 = canvas2.getContext("2d");
var mousedown2 = false;
var loc2 = {};

function windowToCanvas_mouse2(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {x: (x - bbox.left) * (canvas.width / bbox.width), y: (y - bbox.top) * (canvas.height / bbox.height)};
}
function drawStart2(evt) {
  evt.preventDefault();
  mousedown2 = true;
  var loc = windowToCanvas_mouse2(canvas2, evt.clientX, evt.clientY);
  loc2.x = loc.x;
  loc2.y = loc.y;
  context2.beginPath();
  context2.moveTo(loc2.x, loc2.y);
  context1.beginPath();
  context1.moveTo(loc2.x, loc2.y);
}
function drawStuff2(evt) {
  if (!mousedown2) return;
  context2.lineWidth = 2;
  context2.strokeStyle = 'brown';
  var loc = windowToCanvas_mouse2(canvas2, evt.clientX, evt.clientY);
  context2.lineTo(loc.x, loc.y);
  context2.stroke();
  
  context1.strokeStyle = 'blue';
  context1.lineTo(loc.x, loc.y);
  context1.stroke();
}
function drawEnd2(evt) {mousedown2 = false;}
canvas2.addEventListener('mousedown', drawStart2);
canvas2.addEventListener('mousemove', drawStuff2);
canvas2.addEventListener('mouseup', drawEnd2);
canvas2.addEventListener('mouseleave', drawEnd2);