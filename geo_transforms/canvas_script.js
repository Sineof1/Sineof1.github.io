var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");
var mousedown = false;
var loc = {};

function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();
   return {x: (x - bbox.left) * (canvas.width / bbox.width), y: (y - bbox.top) * (canvas.height / bbox.height)};
}

function clearCanvas(evt) {
  evt.preventDefault();
  context.clearRect(0, 0, canvas.width, canvas.height);
}
function drawStart(evt) {
  evt.preventDefault();
  mousedown = true;
  var loc = windowToCanvas(canvas, evt.clientX, evt.clientY);
  context.beginPath();
  context.moveTo(loc.x, loc.y);
}
function drawStuff(evt) {
  if (!mousedown) return;
  var loc = windowToCanvas(canvas, evt.clientX, evt.clientY);
  context.lineWidth = 2;
  context.lineTo(loc.x, loc.y);
  context.stroke();
}
function drawEnd(evt) {
  mousedown = false;
}

canvas.addEventListener('mousedown', drawStart, true);
canvas.addEventListener('mousemove', drawStuff, true);
canvas.addEventListener('mouseup', drawEnd, true);
canvas.addEventListener('dblclick', clearCanvas, true);
