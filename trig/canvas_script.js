var canvas1 = document.getElementById("canvas1");
var context = canvas1.getContext("2d");
var mousedown = false;
var canvasData = [];
var loc = {};

function winToCan(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {x: (x - bbox.left) * (canvas.width / bbox.width), y: (y - bbox.top) * (canvas.height / bbox.height)};
}
function changeColor(col) {
  context.strokeStyle = col;
}
function clearCanvas() {
  context.clearRect(0, 0, canvas1.width, canvas1.height);
  canvasData = [];
}
function drawStart(evt) {
  evt.preventDefault();
  mousedown = true;
  loc = winToCan(canvas1, evt.clientX, evt.clientY);
  context.beginPath();
  context.moveTo(loc.x, loc.y);
}
function drawStuff(evt) {
  if (!mousedown) return;
  loc = winToCan(canvas1, evt.clientX, evt.clientY);
  context.strokeStyle = 'brown';
  context.lineWidth = 2;
  context.lineTo(loc.x, loc.y);
  context.stroke();
}
function drawEnd(evt) {
  mousedown = false;
  canvasData.push(context.getImageData(0, 0, canvas1.width, canvas1.height));
}
function restoreCanvas(evt) {
  context.clearRect(0, 0, canvas1.width, canvas1.height);
  canvasData.pop();
  for (var a = 0; a < canvasData.length; a++) context.putImageData(canvasData[a], 0, 0);
}

canvas1.addEventListener('mousedown', drawStart, true);
canvas1.addEventListener('mousemove', drawStuff, true);
canvas1.addEventListener('mouseup', drawEnd, true);
