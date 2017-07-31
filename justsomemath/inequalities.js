var inequalities = {'1' : {exp : '2x + 4 < 8', zero : 20, constant : {loc : 308, num : '8'}, lort : 'lt', part : '2x + 4'},
                    '2' : {exp : '2x + 4 > 8', zero : 20, constant : {loc : 308, num : '8'}, lort : 'gt', part : '2x + 4'},
                    '3' : {exp : 'x – 3 > 5', zero : 20, constant : {loc : 200, num : '5'}, lort : 'gt', part : 'x – 3'},
                    '4' : {exp : '3x – 1 < 2', zero : 20, constant : {loc : 92, num : '2'}, lort : 'lt', part : '3x – 1'},
                    '5' : {exp : '0.5x > 3', zero : 20, constant : {loc : 128, num : '3'}, lort : 'gt', part : '0.5x'},
                    '6' : {exp : '2x – 5 < 5', zero : 20, constant : {loc : 200, num : '5'}, lort : 'lt', part : '2x – 5'},
                    '7' : {exp : 'x – 2 > 4', zero : 20, constant : {loc : 164, num : '4'}, lort : 'gt', part : 'x – 2'},
                    '8' : {exp : '3x – 3 > 6', zero : 20, constant : {loc : 236, num : '6'}, lort : 'gt', part : '3x – 3'},
                    '9' : {exp : 'x + 5 < 6', zero : 20, constant : {loc : 236, num : '6'}, lort : 'lt', part : 'x + 5'},
                    '10' : {exp : 'x – 6 > 1', zero : 20, constant : {loc : 56, num : '1'}, lort : 'gt', part : 'x – 6'}
                   };
                    
var ticks = {zero : 20, one : 56, two : 92, three : 128, four : 164, five : 200, six : 236, seven : 272,
             eight : 308, nine : 344, ten : 380};
var sliderR = 10;
var MOUSEDOWN = false;
var LT = false;
var GT = false;
var expressionCounter = 0;
var inEqualityscore = 0;

var topSlider = {x : 308,
                 y : 120,
                 draw : function() {
                    contxt9.strokeStyle = 'black';
                    contxt9.lineWidth = 2;
                    contxt9.beginPath();
                    contxt9.arc(this.x, this.y, sliderR, 0, Math.PI * 2);
                    contxt9.stroke();
                    
                    contxt9.beginPath();
                    contxt9.moveTo(this.x, this.y + 10);
                    contxt9.lineTo(this.x, botSlider.y - 10);
                    contxt9.stroke();
                 }
};
var botSlider = {x : 308,
                 y : 280,
                 draw : function() {
                    contxt9.strokeStyle = 'black';
                    contxt9.lineWidth = 2;
                    contxt9.beginPath();
                    contxt9.arc(this.x, this.y, sliderR, 0, Math.PI * 2);
                    contxt9.stroke();
                 }
};

var canvas9 = document.getElementById('canvas_inequality');
var contxt9 = canvas9.getContext('2d');

function windowToCanvas_mouse(canvas, x, y) {
var bbox = canvas.getBoundingClientRect();
return {x : (x - bbox.left) * (canvas.width / bbox.width), y : (y - bbox.top) * (canvas.height / bbox.height)};
}
function newExpression() {
   expressionCounter += 1;
   if (expressionCounter === 11) expressionCounter = 1;
   botSlider.x = inequalities[String(expressionCounter)].constant.loc;
   topSlider.x = inequalities[String(expressionCounter)].constant.loc;
   $('#inequalityInput').val('');
   $('#lt').css({'background-color' : 'lightgray'});
   $('#gt').css({'background-color' : 'lightgray'});
   LT = false;
   GT = false;
   setTimeout(function(){$('#check-button').css({'pointer-events' : 'all'});}, 2000);
   
   if (inequalities[String(expressionCounter)].lort === 'lt') {
   contxt9.fillStyle = 'rgba(255, 0, 0, 0.1)';
   contxt9.fillRect(-50, 262, botSlider.x - (-50), 36);
   }
   else {
   contxt9.fillStyle = 'rgba(0, 0, 255, 0.1)';
   contxt9.fillRect(botSlider.x, 262, 400 - botSlider.x, 36);
   }
}
function redraw() {
   contxt9.clearRect(0, 0, canvas9.width, canvas9.height);
   
//Number lines.
   contxt9.strokeStyle = 'black';
   contxt9.lineWidth = '1';
   contxt9.font = '22px Arial';
//Top number line.
   contxt9.beginPath();
   contxt9.moveTo(20, 120);
   contxt9.lineTo(380, 120);
   contxt9.stroke();
//Bottom number line.
   contxt9.beginPath();
   contxt9.moveTo(20, 280);
   contxt9.lineTo(380, 280);
   contxt9.stroke();
//Minor ticks.
   for (item in ticks) {
      contxt9.beginPath();
      contxt9.moveTo(ticks[item], 125);
      contxt9.lineTo(ticks[item], 130);
      contxt9.stroke();
      
      contxt9.beginPath();
      contxt9.moveTo(ticks[item], 285);
      contxt9.lineTo(ticks[item], 290);
      contxt9.stroke();
   }
//Sliders.
   botSlider.draw();
   topSlider.draw();
//Expression, zero, start.
   contxt9.fillStyle = 'black';
   contxt9.textAlign = 'left';
   contxt9.fillText(inequalities[String(expressionCounter)].exp, 20, 35);
   contxt9.textAlign = 'center';
   contxt9.fillText('0', inequalities[String(expressionCounter)].zero, 158);
   contxt9.fillText('0', inequalities[String(expressionCounter)].zero, 318);
   contxt9.fillText(inequalities[String(expressionCounter)].constant.num, inequalities[String(expressionCounter)].constant.loc, 100);
//Inequality bar.
   if (inequalities[String(expressionCounter)].lort === 'lt') {
   contxt9.fillStyle = 'rgba(255, 0, 0, 0.5)';
   contxt9.fillRect(-50, 262, botSlider.x - (-50), 36);
   }
   else {
   contxt9.fillStyle = 'rgba(0, 0, 255, 0.5)';
   contxt9.fillRect(botSlider.x, 262, 400 - botSlider.x, 36);
   }
}
function startMouse(evt) {
   var loc = windowToCanvas_mouse(canvas9, evt.clientX, evt.clientY);
   var nearXBottom = (loc.x >= botSlider.x - sliderR && loc.x <= botSlider.x + sliderR);
   var nearYBottom = (loc.y >= botSlider.y - sliderR && loc.y <= botSlider.y + sliderR);
   var nearXTop = (loc.x >= topSlider.x - sliderR && loc.x <= topSlider.x + sliderR);
   var nearYTop = (loc.y >= topSlider.y - sliderR && loc.y <= topSlider.y + sliderR);
   
   if ((nearXBottom && nearYBottom) || (nearXTop && nearYTop)) {MOUSEDOWN = true;}
   else return;
}
function dragSliders(evt) {
   if (!MOUSEDOWN) return;
   var loc = windowToCanvas_mouse(canvas9, evt.clientX, evt.clientY);
   botSlider.x = loc.x;
   topSlider.x = loc.x;
   for (item in ticks) {
   if (loc.x <= ticks[item] + 5 && loc.x >= ticks[item] - 5) {
   botSlider.x = ticks[item];
   topSlider.x = ticks[item];}
   }
   redraw();
}
function endDrag() {MOUSEDOWN = false;}
function wrongAnswer(message) {
   $('#wrong-message').text(message);
   $('#wrong-message').animate({top : '-=50px'}, 1000, 'easeOutCubic')
                      .queue(function(){$(this).animate({top : '-=0px'}, 1000).dequeue();})
                      .queue(function(){$(this).animate({top : '+=50px'}, 1000, 'easeInBack').dequeue();});
   setTimeout(function(){$('#check-button').css({'pointer-events' : 'all'});}, 3000);
}
function checkAnswer() {
   $('#check-button').css({'pointer-events' : 'none'});
   var answer = $('#inequalityInput').val();
   var message1 = 'Try again. Is the slider in the correct location?';
   var message2 = 'Try again. Is the slider in the correct location?';
   var message3 = 'Try again.';
   
   if (expressionCounter === 1) {
   if (botSlider.x === ticks.two && LT && answer === '2') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer(message1);
   }

   else if (expressionCounter === 2) {
   if (botSlider.x === ticks.two && GT && answer === '2') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer(message2);
   }
   else if (expressionCounter === 3) {
   if (botSlider.x === ticks.eight && GT && answer === '8') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Use the drawing canvas to draw on the diagram.');
   }
   else if (expressionCounter === 4) {
   if (botSlider.x === ticks.one && LT && answer === '1') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Try again.');
   }
   else if (expressionCounter === 5) {
   if (botSlider.x === ticks.three && GT && answer === '6') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Multiplying by 0.5 is the same as dividing by 2.');
   }
   else if (expressionCounter === 6) {
   if (botSlider.x === ticks.five && LT && answer === '5') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Try again. You can DO IT!');
   }
   else if (expressionCounter === 7) {
   if (botSlider.x === ticks.six && GT && answer === '6') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Try again.');
   }
   else if (expressionCounter === 8) {
   if (botSlider.x === ticks.three && GT && answer === '3') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Try again.');
   }
   else if (expressionCounter === 9) {
   if (botSlider.x === ticks.one && LT && answer === '1') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Oops. Subtract 5 from both sides of the inequality.');
   }
   else if (expressionCounter === 10) {
   if (botSlider.x === ticks.seven && GT && answer === '7') {
      setTimeout(function(){
      newExpression();
      redraw();}, 1000);
      var ding = document.getElementById('ding');
      ding.play();
      inEqualityscore += 1;
   }
   else wrongAnswer('Oops. Add 6 to both sides of the inequality.');
   }
}

$('.ineq-button').bind('click', function(evt) {
   if (evt.target.id === 'lt') {
   if (LT) {
      $('#lt').css({'background-color' : 'lightgray'});
      LT = false;
   }
   else if (!LT) {
      $('#lt').css({'background-color' : 'rgba(255, 0, 0, 0.5)'});
      $('#gt').css({'background-color' : 'lightgray'});
      GT = false;
      LT = true;
   }}

   if (evt.target.id === 'gt') {
   if (GT) {
      $('#gt').css({'background-color' : 'lightgray'});
      GT = false;
   }
   else if (!GT) {
      $('#gt').css({'background-color' : 'rgba(0, 0, 255, 0.5)'});
      $('#lt').css({'background-color' : 'lightgray'});
      LT = false;
      GT = true;
   }}
});

$('#check-button').bind('click', checkAnswer);
$('#wrong-message').css({top : $('#controlBox').offset().top, left : $('#controlBox').offset().left});

canvas9.addEventListener('mousedown', startMouse, true);
canvas9.addEventListener('mousemove', dragSliders, true);
canvas9.addEventListener('mouseup', endDrag, true);

newExpression();
redraw();