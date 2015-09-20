var game = 1;
var jugAmts = {1: {'A': [21, 0], 'B': [127, 0], 'C': [3, 0]}, 2: {'A': [14, 0], 'B': [163, 0], 'C': [25, 0]},
               3: {'A': [18, 0], 'B': [43, 0], 'C': [10, 0]}, 4: {'A': [9, 0], 'B': [42, 0], 'C': [6, 0]},
               5: {'A': [20, 0], 'B': [59, 0], 'C': [4, 0]}, 6: {'A': [23, 0], 'B': [49, 0], 'C': [3, 0]},
               7: {'A': [15, 0], 'B': [39, 0], 'C': [3, 0]}, 8: {'A': [28, 0], 'B': [76, 0], 'C': [3, 0]},
               9: {'A': [18, 0], 'B': [48, 0], 'C': [4, 0]}, 10: {'A': [14, 0], 'B': [36, 0], 'C': [8, 0]}};
function fillJug(jug) {
  var remainder = jugAmts[game][jug][0] - jugAmts[game][jug][1];
  $('#WL' + jug).animate({height:'+=' + (remainder / 1.1) + 'px'}, 1000);
  $('#amount' + jug).text(jugAmts[game][jug][0]);
  jugAmts[game][jug][1] = jugAmts[game][jug][0];
  checkGame();
}
function pourJug(_from, _to) {
  var start = jugAmts[game][_from][1];
  var end = jugAmts[game][_to][0] - jugAmts[game][_to][1];
  if (start < end) end = start;
  $('#amount' + _from).text(start - end);
  $('#amount' + _to).text(jugAmts[game][_to][1] + end);

  $('#WL' + _from).animate({height:'-=' + (end / 1.1) + 'px'}, 1000);
  $('#WL' + _to).animate({height:'+=' + (end / 1.1) + 'px'}, 1000);
  jugAmts[game][_from][1] -= end;
  jugAmts[game][_to][1] += end;
  checkGame();
}
function emptyJug(jug) {
  $('#WL' + jug).animate({height:'-=' + (jugAmts[game][jug][1] / 1.1) + 'px'}, 1000);
  jugAmts[game][jug][1] = 0;
  $('#amount' + jug).text(jugAmts[game][jug][1]);
}
function refresh() {
  game++;
  $('.amount').text('0');
  $('#a-label').text('A: ' + jugAmts[game]['A'][0]);
  $('#b-label').text('B: ' + jugAmts[game]['B'][0]);
  $('#c-label').text('C: ' + jugAmts[game]['C'][0]);
  $('.water-level').css({'height': '0px'});
  $('#fillA').css({'bottom': jugAmts[game]['A'][0] / 1.1 + 32});
  $('#fillB').css({'bottom': jugAmts[game]['B'][0] / 1.1 + 32});
  $('#fillC').css({'bottom': jugAmts[game]['C'][0] / 1.1 + 32});
}
function checkGame() {
  switch (game) {
    case 1:
    if ($('#amountA').text() === '100' || $('#amountB').text() === '100' || $('#amountC').text() === '100'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 99'); refresh();}, 2000);}
    break;

    case 2:
    if ($('#amountA').text() === '99' || $('#amountB').text() === '99' || $('#amountC').text() === '99'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 5'); refresh();}, 2000);}
    break;

    case 3:
    if ($('#amountA').text() === '5' || $('#amountB').text() === '5' || $('#amountC').text() === '5'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 21'); refresh();}, 2000);}
    break;

    case 4:
    if ($('#amountA').text() === '21' || $('#amountB').text() === '21' || $('#amountC').text() === '21'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 31'); refresh();}, 2000);}
    break;

    case 5:
    if ($('#amountA').text() === '31' || $('#amountB').text() === '31' || $('#amountC').text() === '31'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 20'); refresh();}, 2000);}
    break;

    case 6:
    if ($('#amountA').text() === '20' || $('#amountB').text() === '20' || $('#amountC').text() === '20'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 18'); refresh();}, 2000);}
    break;

    case 7:
    if ($('#amountA').text() === '18' || $('#amountB').text() === '18' || $('#amountC').text() === '18'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 25'); refresh();}, 2000);}
    break;

    case 8:
    if ($('#amountA').text() === '25' || $('#amountB').text() === '25' || $('#amountC').text() === '25'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 22'); refresh();}, 2000);}
    break;

    case 9:
    if ($('#amountA').text() === '22' || $('#amountB').text() === '22' || $('#amountC').text() === '22'){
      $('#ding')[0].play(); setTimeout(function(){$('#target-label').text('Target: 6'); refresh();}, 2000);}
    break;

    case 10:
    if ($('#amountA').text() === '6' || $('#amountB').text() === '6' || $('#amountC').text() === '6'){
      $('#ding')[0].play();
      $('button').prop('disabled', 'disabled');}
    break;
  }
}
