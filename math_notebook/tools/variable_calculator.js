calcKeys = {'a': 0, 'b': 0, 'c': 0, 'd': 0,
            'e': 0, 'f': 0, 'g': 0, 'h': 0,
            'k': 0, 'm': 0, 'n': 0, 'p': 0,
            'q': 0, 'r': 0, 's': 0, 't': 0,
            'w': 0, 'x': 0, 'y': 0, 'z': 0,
            '*': '*', '+': '+', '-': '-', '/': '/'};
curStringResult = '';

$(document).ready(function() {
  for (var key in calcKeys) {
  if (key !== '*' && key !== '+'
  && key !== '-' && key !== '/') calcKeys[key] = Math.floor(Math.random() * 20);
  }
  $('.op-button').css({'pointer-events':'none'});

  $('.calc-button').bind('click', function(evt) {
  $('.calc-button').css({'pointer-events':'none'});
  $('.op-button').not('.checked').css({'pointer-events':'all'});
  $('div[name="' + $(evt.target).attr('name') + '"]').addClass('checked');
  $('#result_window').append($(evt.target).html() + '&nbsp;');
  curStringResult += calcKeys[$(evt.target).attr('name')];});

  $('.op-button').bind('click', function(evt) {
  $('.op-button').css({'pointer-events':'none'});
  $('.calc-button').not('.checked').css({'pointer-events':'all'});
  $('div[name="' + $(evt.target).attr('name') + '"]').addClass('checked');
  $('#result_window').append($(evt.target).html() + '&nbsp;');
  curStringResult += calcKeys[$(evt.target).attr('name')];});

  $('#eq-button').bind('click', function(evt) {
  if (curStringResult.indexOf('*') === -1 && curStringResult.indexOf('+') === -1
  && curStringResult.indexOf('-') === -1 && curStringResult.indexOf('/') === -1) return;
  var result = eval(curStringResult);
  if (result === Number.POSITIVE_INFINITY) result = 'undefined';
  $('#result_window').empty();
  $('#result_window').text(result);
  $('.op-button').css({'pointer-events':'none'});
  $('.calc-button').css({'pointer-events':'none'});
  if ($(this).text() === '=') $(this).text('C');
  else {
    $(this).text('=');
    $('#result_window').empty();
    curStringResult = '';
    $('.op-button').css({'pointer-events':'none'});
    $('.op-button').removeClass('checked');
    $('.calc-button').css({'pointer-events':'all'});
    $('.calc-button').removeClass('checked');
  }});
  $('#answer_window').focus();
});
