
$('.panel-left').resizable({
   handleSelector: '.splitter',
   resizeHeight: false
 });
 $('.panel-top').resizable({
   handleSelector: '.splitter-horizontal',
   resizeWidth: false
 });

$(document).ready(function(){$('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 258.5});});

var botstart = document.getElementById('botstart');
botstart.volume = 0.02;
var botresponse = document.getElementById('botresponse');
botresponse.volume = 0.2;
var ding = document.getElementById('ding');
ding.volume = 0.2;

var errTotal = 1;
var botInx = -1;
var lastInpInx;
var distTemp, numTemp, denomTemp;

katex.render('\\mathtt{y=}', math1);
katex.render('\\mathtt{x}', math2);
katex.render('\\mathtt{y=}', math3);
katex.render('\\mathtt{x +}', math4);
katex.render('\\mathtt{\\frac{\\text{rise}}{\\text{run}}}', math5);
katex.render('\\mathtt{y=mx}', math7);
katex.render('\\mathtt{m}', math8);
katex.render('\\mathtt{x}', math9);
katex.render('\\mathtt{y=}', math10);
katex.render('\\mathtt{x}', math12);
katex.render('\\mathtt{y=mx+b}', math13);
katex.render('\\mathtt{m}', math14);
katex.render('\\mathtt{b}', math15);
katex.render('\\mathtt{x}', math16);
katex.render('\\mathtt{y=}', math17);
katex.render('\\mathtt{x}', math19);
katex.render('\\mathtt{4}', math20);
katex.render('\\mathtt{4}', math21);
katex.render('\\mathtt{\\frac{4}{3}}', math100);
katex.render('\\mathtt{y=\\frac{4}{3}x}', math101);
katex.render('\\mathtt{y=\\frac{4}{3}x+0}', math102);

var fullLines = ['M -75 625 L 725 25'];
var xandyaxes = [{x : 225, y : 400}];
var linlabels = [{x : 610, y : 95, label : 'g'}, {x : 612, y : 413, label : 'x'}, {x : 215, y : 10, label : 'y'}, {x : 229, y : 414, label : '0'}, {x : 354, y : 414, label : '5'}, {x : 476, y : 414, label : '10'}, {x : 94, y : 414, label : '–5'}, {x : 210, y : 283, label : '5'}, {x : 204, y : 158, label : '10'}, {x : 204, y : 531, label : '–5'}];
var clickpnts = [{x : 325, y : 325, id : 0}, {x : 425, y : 250, id : 1}, {x : 525, y : 175, id : 2}, {x : 125, y : 475, id : 3}];

var DRAWTRI = false;
var startID;
var pointIndex;
var slope1Input = document.getElementById('slope1');
var slope1Ans = MQ.MathField(slope1Input);
var equation1Input = document.getElementById('equation1');
var equation1Ans = MQ.MathField(equation1Input);
var equation2Input = document.getElementById('equation2');
var equation2Ans = MQ.MathField(equation2Input);
var equation3Input = document.getElementById('equation3');
var equation3Ans = MQ.MathField(equation3Input);

var curFocus = 'disclose1';

var svg = d3.select('#demo_grapher')
            .append('svg')
            .attr('width', '100%').attr('height', '100%');
function newGraph() {
   d3.select('#demo_grapher').selectAll('svg').remove();
   var svg = d3.select('#demo_grapher')
               .append('svg')
               .attr('width', '100%').attr('height', '100%')
               .on('mousemove', drawTriangle);
   for (var a = 25; a < 625; a += 25) {
      svg.append('line')
         .attr('x1', a).attr('y1', 0).attr('x2', a).attr('y2', 600).attr('class', 'gridLine')
         .style('stroke', 'gray').style('stroke-width', 0.5).style('opacity', 1);
      svg.append('line')
         .attr('x1', 0).attr('y1', a).attr('x2', 625).attr('y2', a).attr('class', 'gridLine')
         .style('stroke', 'gray').style('stroke-width', 0.5).style('opacity', 1);
   }
   svg.selectAll('.fullLine')
      .data(fullLines)
      .enter()
      .append('path')
      .attr('class', 'fullLine')
      .attr('id', 'startLine')
      .attr('d', function(d){return d;})
      .style('stroke', 'aqua').style('stroke-width', 5).style('opacity', 1);
   svg.selectAll('.axes')
      .data(xandyaxes)
      .enter()
      .append('line')
      .attr('class', 'axis').attr('id', 'yaxis')
      .attr('x1', function(d){return d.x;}).attr('x2', function(d){return d.x;})
      .attr('y1', 0).attr('y2', 625)
      .style('stroke', 'black').style('stroke-width', 3).style('opacity', 1);
   svg.selectAll('.axes')
      .data(xandyaxes)
      .enter()
      .append('line')
      .attr('class', 'axis').attr('id', 'xaxis')
      .attr('y1', function(d){return d.y;}).attr('y2', function(d){return d.y;})
      .attr('x1', 0).attr('x2', 625)
      .style('stroke', 'black').style('stroke-width', 3).style('opacity', 1);
   svg.selectAll('.lintext')
      .data(linlabels)
      .enter()
      .append('text')
      .attr('class', 'lintext')
      .attr('x', function(d){return d.x;})
      .attr('y', function(d){return d.y;})
      .text(function(d){return d.label;})
      .style('font-size', '14px').style('font-family', 'sans-serif')
      .style('fill', 'black').style('stroke', 'none').style('opacity', 1);
   svg.selectAll('.clickpnt')
      .data(clickpnts)
      .enter()
      .append('circle')
      .attr('class', 'clickpnt')
      .attr('id', function(d){return d.id;})
      .attr('cx', function(d){return d.x;})
      .attr('cy', function(d){return d.y;})
      .attr('r', 6)
      .style('stroke', 'black').style('fill', 'blue')
      .style('cursor', 'pointer')
      .on('click', startTriangle);
}
function startTriangle() {
   if (DRAWTRI === false) {
   DRAWTRI = true;
   startID = d3.event.target.id;
   pointIndex = Number(startID);
   }
   else endTriangle(Number(d3.event.target.id));
}
function endTriangle(butID) {
  if (butID !== startID) {
  var butTemp = false;
  var startTemp = false;
  if (butID === 3) {butTemp = -2; distTemp = Math.abs(Number(startID) - butTemp);}
  else if (Number(startID) === 3) {startTemp = -2; distTemp = Math.abs(startTemp - butID);}
  else distTemp = Math.abs(Number(startID) - butID);
  numTemp = distTemp * 3;
  denomTemp = distTemp * 4;
  katex.render('\\mathtt{-\\frac{' + String(denomTemp) + '}{' + String(numTemp) + '}}', math103);
  katex.render('\\mathtt{\\frac{' + String(numTemp) + '}{' + String(denomTemp) + '}}', math104);
  katex.render('\\mathtt{\\frac{' + String(denomTemp) + '}{' + String(numTemp) + '}}', math105);
  katex.render('\\mathtt{\\frac{' + String(numTemp) + '}{' + String(denomTemp) + '}}', math6);
  katex.render('\\mathtt{\\frac{' + String(numTemp) + '}{' + String(denomTemp) + '}}', math11);
  katex.render('\\mathtt{\\frac{' + String(numTemp) + '}{' + String(denomTemp) + '}}', math18);
  DRAWTRI = false;
  $('#disclose2').animate({'opacity' : '+=1'}, 1000);
  slope1Ans.focus();
  curFocus = 'slope1';
  $('.bot').animate({'opacity' : '+=1'}, 1000);
  }
}
function drawTriangle() {
  if (!DRAWTRI) return;
  d3.select('#demo_grapher').select('svg').selectAll('.tripath').remove();
  d3.select('#demo_grapher').select('svg').selectAll('.clickpnt').remove();
  var intcpt = String(clickpnts[pointIndex].x - ((d3.mouse(this)[1] - clickpnts[pointIndex].y) * (4 / 3)));
  d3.select('#demo_grapher').select('svg').append('path')
    .attr('class', 'tripath')
    .attr('id', 'slope_triangle')
    .attr('d', 'M ' +String(clickpnts[pointIndex].x)+' '+String(clickpnts[pointIndex].y)+' L '+ String(clickpnts[pointIndex].x)+' '+String(d3.mouse(this)[1])+' L '+ intcpt+' '+String(d3.mouse(this)[1])+' Z')
    .style('stroke', 'none').style('stroke-width', 2).style('fill', 'rgba(255, 165, 0, 0.5)');
  d3.select('#demo_grapher').select('svg').selectAll('.clickpnt')
    .data(clickpnts)
    .enter()
    .append('circle')
    .attr('class', 'clickpnt')
    .attr('id', function(d){return d.id;})
    .attr('cx', function(d){return d.x;})
    .attr('cy', function(d){return d.y;})
    .attr('r', 6)
    .style('stroke', 'black').style('fill', 'blue')
    .style('cursor', 'pointer')
    .on('click', startTriangle);
}
$('#slope1').bind('keyup', function(evt) {
   if (evt.keyCode !== 13) return;
   if (botClick % 2 === 0) {
     $('.bot').trigger('click');
     $('.speech_bubble').css({'height' : '462px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:72.94%;}";
     $('.speech_bubble').offset({top : $('.bot').offset().top - 258.5});
   }
   var answer = slope1Ans.latex();
   $(this).css('border', 'none');
   if (answer === '0.75' || answer === '\\frac{3}{4}' || answer === '\\frac{9}{12}' || answer === '\\frac{12}{16}' || answer === '\\frac{6}{8}' || answer === '.75') {
   ding.play();
   $('.jitbox').fadeOut();
   $('#slope1').css({'border' : '2px solid green', 'pointer-events' : 'none', 'box-shadow' : 'none', 'font-weight' : 900, 'background-color' : '#fafafa'});
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
   $('#disclose3').animate({'opacity' : '+=1'}, 1000);
   equation1Ans.focus();
   curFocus = 'equation1';
   botUI.message.removeAll();
   if (curFocus === 'slope1') hintGroup1();
   else if (curFocus === 'equation1') hintGroup2();
   else if (curFocus === 'equation2' || curFocus === 'equation3') hintGroup3();
   }
   else if (answer === '\\frac{4}{3}' || answer === '1.33' || answer === '1.3' || answer === '1.333') {$('#jit1').fadeIn(1000); errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
   else if (answer <= 0) {$('#jit2').fadeIn(1000); errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
   else {errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
});
$('#equation1').bind('keyup', function(evt) {
   if (evt.keyCode !== 13) return;
   if (botClick % 2 === 0) {
     $('.bot').trigger('click');
     $('.speech_bubble').css({'height' : '375px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:66.67%;}";
     $('.speech_bubble').offset({top : $('.bot').offset().top - 166.5});
   }
   var answer = equation1Ans.latex();
   $(this).css('border', 'none');
   if (answer === '0.75' || answer === '\\frac{3}{4}' || answer === '\\frac{9}{12}' || answer === '\\frac{12}{16}' || answer === '\\frac{6}{8}' || answer === '.75') {
   ding.play();
   $('.jitbox').fadeOut();
   $('#equation1').css({'border' : '2px solid green', 'pointer-events' : 'none', 'box-shadow' : 'none', 'font-weight' : 900, 'background-color' : '#fafafa'});
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
   $('#disclose4').animate({'opacity' : '+=1'}, 1000);
   $('#second_text').animate({'opacity' : '+=1'}, 1000);
   equation2Ans.focus();
   curFocus = 'equation2';
   botUI.message.removeAll();
   if (curFocus === 'slope1') hintGroup1();
   else if (curFocus === 'equation1') hintGroup2();
   else if (curFocus === 'equation2' || curFocus === 'equation3') hintGroup3();
   var transLine = clone('#startLine').style('opacity', 0);
   transLine.transition()
            .delay(1000)
            .duration(1500)
            .attr('transform', 'translate(0, -100)')
            .style('opacity', 1);
   var transTrngl = clone('#slope_triangle').style('opacity', 0);
   transTrngl.transition()
             .delay(500)
             .duration(500)
             .style('opacity', 1);
   transTrngl.transition()
             .delay(1000)
             .duration(1500)
             .attr('transform', 'translate(0, -100)')
             .style('fill', 'rgba(255, 165, 0, 0.3)');
   d3.select('#demo_grapher').select('svg').append('text')
     .attr('x', 610).attr('y', 32).style('fill', 'black').style('font-family', 'sans-serif').style('font-size', '14px')
     .style('opacity', 0)
     .text('v')
     .transition()
     .delay(1000)
     .duration(1000)
     .style('opacity', 1);
   }
   else {errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
});
$('#equation2').bind('keyup', function(evt) {
   if (evt.keyCode !== 13) return;
   if (botClick % 2 === 0) {
     $('.bot').trigger('click');
     $('.speech_bubble').css({'height' : '375px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:66.67%;}";
     $('.speech_bubble').offset({top : $('.bot').offset().top - 166.5});
   }
   $('#equation2, #equation3').css('box-shadow', '0 0 3px #aaa');
   var answer = equation2Ans.latex();
   $(this).css('border', 'none');
   if (answer === '0.75' || answer === '\\frac{3}{4}' || answer === '\\frac{9}{12}' || answer === '\\frac{12}{16}' || answer === '\\frac{6}{8}' || answer === '.75') {
   ding.play();
   $('.jitbox').fadeOut();
   $('#equation2').css({'border' : '2px solid green', 'pointer-events' : 'none', 'box-shadow' : 'none', 'font-weight' : 900, 'background-color' : '#fafafa'});
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
   equation3Ans.focus();
   curFocus = 'equation3';
   botUI.message.removeAll();
   if (curFocus === 'slope1') hintGroup1();
   else if (curFocus === 'equation1') hintGroup2();
   else if (curFocus === 'equation2' || curFocus === 'equation3') hintGroup3();
   }
   else {$('#jit3').fadeIn(1000); errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
});
$('#equation3').bind('keyup', function(evt) {
   if (evt.keyCode !== 13) return;
   if (botClick % 2 === 0) {
     $('.bot').trigger('click');
     $('.speech_bubble').css({'height' : '375px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:66.67%;}";
     $('.speech_bubble').offset({top : $('.bot').offset().top - 166.5});
   }
   var answer = equation3Ans.latex();
   $(this).css('border', 'none');
   if (answer === '4' || answer === '4.0') {
   ding.play();
   equation3Ans.blur();
   $('.jitbox').fadeOut();
   $('#equation3').css({'border' : '2px solid green', 'pointer-events' : 'none', 'box-shadow' : 'none', 'font-weight' : 900, 'background-color' : '#fafafa'});
   d3.select('.bot').transition().duration(1000).style('opacity', 0);
   }
   else if (answer === '-4') {$('#jit4').fadeIn(1000); errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
   else {errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
});
$('input').bind('keyup', function(evt) {
   if (evt.keyCode !== 39) return;
   var elem = evt.target.id;
   if (elem === 'slope1') $('#hint1').fadeIn(1000);
   else if (elem === 'equation1') $('#hint2').fadeIn(1000);
   else if (elem === 'equation2' || elem === 'equation3') $('#hint3').fadeIn(1000);
   botstart.pause();
   botstart.currentTime = 0;
});
$('input').bind('keyup', function(evt) {
   if (evt.keyCode !== 37) return;
   var elem = evt.target.id;
   if (elem === 'slope1') {$('#hint1').fadeOut(1000); $('#jit1').fadeOut(1000); $('#jit2').fadeOut(1000);}
   else if (elem === 'equation1') $('#hint2').fadeOut(1000);
   else if (elem === 'equation2' || elem === 'equation3') {$('#hint3').fadeOut(1000); $('#jit3').fadeOut(1000); $('#jit4').fadeOut(1000);}
});

newGraph();

function clone(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
}
function hintRemind() {
    if (errTotal > botClick) {
    d3.select('.bot').transition().duration(2000).style('transform', 'rotateZ(15deg)').style('left', '20px');
    d3.select('.bot').transition().delay(2000).duration(1500).ease(d3.easeBackInOut).style('transform', 'rotateZ(0deg)').style('left', '-50px');
    }
}
$('#closevid1').click(function(){
   var vid = document.getElementById('tbvid1');
   vid.pause();
   $('#vid-container1').fadeOut();
   $('.bot').css('pointer-events', 'all');
   $('#lowerlights').fadeOut(1000);
   vid.currentTime = 0;
});
$('#closevid2').click(function(){
   var vid = document.getElementById('tbvid2');
   vid.pause();
   $('#vid-container2').fadeOut();
   $('.bot').css('pointer-events', 'all');
   $('#lowerlights').fadeOut(1000);
   vid.currentTime = 0;
});

$('#tbvid1').click(function(evt){evt.preventDefault();});
$('#tbvid2').click(function(evt){evt.preventDefault();});

botClick = 1;
var MOUSEDOWN = false;
var hint1Count = 0;
var hint2Count = 0;
var hint3Count = 0;
var hint4Count = 0;
var hint5Count = 0;
var hint6Count = 0;

$(document).on('click', '.closeJit', function(evt){$('.jitbox').fadeOut();});
$('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 258.5});
$('#jit1').offset({'left' : $('#demo_grapher').offset().left - 125, 'top' : $('#demo_grapher').offset().top + 100});
$('#jit2').offset({'left' : $('#demo_grapher').offset().left - 125, 'top' : $('#demo_grapher').offset().top + 100});
$('#jit3').offset({'left' : $('#equation3').offset().left, 'top' : $('#equation3').offset().top + 85});
$('#jit4').offset({'left' : $('#equation3').offset().left, 'top' : $('#equation3').offset().top + 85});

$(document).on('click', '.bot', function(evt) {
   botClick += 1;
   botInx = -1;
   botUI.message.removeAll();
   FROMBOTBACK = false;
   if (curFocus === 'slope1') {
      $('.speech_bubble').css({'height' : '462px'});
      var styleElem = document.head.appendChild(document.createElement("style"));
      styleElem.innerHTML = ".speech_bubble:after {top:72.94%;}";
      $('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 258.5});
   }
   else {
      $('.speech_bubble').css({'height' : '375px'});
      var styleElem = document.head.appendChild(document.createElement("style"));
      styleElem.innerHTML = ".speech_bubble:after {top:66.67%;}";
      $('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 166.5});
   }
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
   if (curFocus === 'slope1') hintGroup1();
   else if (curFocus === 'equation1') hintGroup2();
   else if (curFocus === 'equation2' || curFocus === 'equation3') hintGroup3();
   if (botClick % 2 === 0 && curFocus !== 'equation2' && curFocus !== 'equation3') {
   botstart.play();
   d3.select('.bot')
     .transition()
     .duration(1000)
     .ease(d3.easeBackInOut)
     .style('left', '65px');
   d3.select('.speech_bubble')
     .style('visibility', 'visible')
     .transition()
     .delay(800)
     .duration(800)
     .style('opacity', 1);
   }
   else if (botClick % 2 === 0 && (curFocus === 'equation2' || curFocus === 'equation3')) {
   botstart.play();
   $('.speech_bubble').offset({'left' : '975'});
   d3.select('.bot')
     .transition()
     .duration(1000)
     .ease(d3.easeBackInOut)
     .style('left', '840px');
   d3.select('.speech_bubble')
     .style('visibility', 'visible')
     .transition()
     .delay(800)
     .duration(800)
     .style('opacity', 1);
   }
   else {
   window.speechSynthesis.cancel();
   if (curFocus === 'slope1') slope1Ans.focus();
   else if (curFocus === 'equation1') equation1Ans.focus();
   else if (curFocus === 'equation2') equation2Ans.focus();
   else if (curFocus === 'equation3') equation3Ans.focus();
   d3.select('.speech_bubble')
     .transition()
     .duration(50)
     .style('opacity', 0).style('visibility', 'hidden');
   d3.select('.bot')
     .transition()
     .duration(1000)
     .ease(d3.easeBackInOut)
     .style('left', '-50px');
   setTimeout(function(){
      if (curFocus === 'equation2' || curFocus === 'equation3') {
      $('.speech_bubble').offset({left : 975, top : $('.bot').offset().top - 258.5});
      }
      else $('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 258.5});
      $('#equation2, #equation3').css('box-shadow', '0 0 3px #aaa');
   }, 100);
   botstart.pause();
   botstart.currentTime = 0;
   }
   if (curFocus === 'slope1' && botClick % 2 === 0) {
      $('#slope1').css('box-shadow', '0 0 25px #cf9893');
   }
   else if (curFocus === 'equation1' && botClick % 2 === 0) {
      $('#equation1').css('box-shadow', '0 0 25px #cf9893');
   }
   else if (curFocus === 'equation2' || curFocus === 'equation3' && botClick % 2 === 0) {
      $('#equation2, #equation3').css('box-shadow', '0 0 25px #cf9893');
   }
   else if (curFocus === 'slope1' && botClick % 2 !== 0) {
      $('#slope1').css('box-shadow', '0 0 3px #aaa');
   }
   else if (curFocus === 'equation1' && botClick % 2 !== 0) {
      $('#equation1').css('box-shadow', '0 0 3px #aaa');
   }
   else if (curFocus === 'equation2' && botClick % 2 !== 0) {
      $('#equation2, #equation3').css('box-shadow', '0 0 3px #aaa');
   }
   else if (curFocus === 'equation3' && botClick % 2 !== 0) {
      $('#equation2, #equation3').css('box-shadow', '0 0 3px #aaa');
   }
});

$(document).on('click', '.botBut', function(evt) {
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
});

var FROMBOTBACK = false;

$(document).on('click', '.botback', function(evt) {
   botInx += 1;
   FROMBOTBACK = true;
   $(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);
   if (curFocus === 'slope1') hintGroup1();
   else if (curFocus === 'equation1') hintGroup2();
   else if (curFocus === 'equation2' || curFocus === 'equation3') hintGroup3();
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
});

$(document).on('click', '.tryBut', function(){
   $('.bot').trigger('click');
   if (curFocus === 'slope1') slope1Ans.focus();
   else if (curFocus === 'equation1') equation1Ans.focus();
   else if (curFocus === 'equation2') equation2Ans.focus();
   else if (curFocus === 'equation3') equation3Ans.focus();
   var d = new Date();
   $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());
});

var botUI = new BotUI('speech1');
function startVid1() {
   setTimeout(function(){
   $('#vid-container1').fadeIn(1500);
   var vid = document.getElementById('tbvid1');
   vid.play();
   $('#lowerlights').fadeIn(5000);
   }, 2500);
}
function startVid2() {
   setTimeout(function(){
   $('#vid-container2').fadeIn(1500);
   var vid = document.getElementById('tbvid2');
   vid.play();
   $('#lowerlights').fadeIn(5000);
   }, 2500);
}
function hintGroup1() {
  botInx += 1;
  if (botClick % 2 === 0 && FROMBOTBACK == false) {
  setTimeout(function(){
  window.speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance('Okay, so you want to determine the <emphasis level="strong">slope</emphasis> of line <say-as interpret-as="characters">g</say-as>. How can I help?');
  msg.pitch = 2;
  window.speechSynthesis.speak(msg);
  }, 1000);}
  setTimeout(function(){$('.botui').prop('scrollTop', 0);}, 500);
  botUI.message.bot({type : 'html', content: 'Okay, so you want to determine the <strong>slope</strong> of <strong>line g</strong>.<br /><br />How can I help?  😃'})
               .then(function(){
                  if (hint1Count >= 1 && hint2Count >= 1) var ansButReady = 'ansButReady';
                  else var ansButReady = 'ansBut';
                  if (hint1Count >= 1) var hint1Class = 'botButVisited';
                  else var hint1Class = 'botBut';
                  if (hint2Count >= 1) var hint2Class = 'botButVisited';
                  else var hint2Class = 'botBut';
                  return botUI.action.button({action: [
                     {cssClass : hint1Class, text : 'Can you teach me about this?', value : 'bothint1'},
                     {cssClass : hint2Class, text : 'What do I do here?', value : 'bothint2'},
                     {cssClass : 'botBut', text : 'Can I get multiple choice?', value : 'mltChHint'},
                     {cssClass : 'exampBut', text : 'Show me a video.', value : 'bothintVid'},
                     {cssClass : 'exampBut', text : 'Show me an example.', value : 'bothintExamp'},
                     {cssClass : 'exampBut', text : 'I need a calculator.', value : 'bothintMyQuestion'},
                     {cssClass : ansButReady, text : 'Just give me the answer.', value : 'bothintA1'}
                  ]});
                  })
               .then(function(res){
                  if (res.value === 'bothint1') {
                  botInx += 2;
                  $('.bot').css('pointer-events', 'none');
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('The slope of a line segment or line <silence msec="300" /> is the ratio of the rise to the run.');
                  msg.pitch = 2;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint1').html()})
                       .then(function(){botresponse.play();})
                       .then(function(){botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint1a').html()});})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){
                          hint1Count += 1; setTimeout(function(){botresponse.play();$('.bot').css('pointer-events', 'all');}, 2000);
                       })
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothint2') {
                  botInx += 3;
                  $('.bot').css('pointer-events', 'none');
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('Count the units of rise for the triangle <silence msec="300" /> Count the units of run for the triangle <silence msec="300" /> The slope is the ratio <silence msec="200" /> rise over run.');
                  msg.rate = 1.5;
                  msg.pitch = 2;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint2').html()})
                       .then(function(){botresponse.play();})
                       .then(function(){
                           return botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint2a').html()});
                       })
                       .then(function(){botresponse.play();})
                       .then(function(){botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint2b').html()});})
                       .then(function(){
                           hint2Count += 1; setTimeout(function(){botresponse.play();$('.bot').css('pointer-events', 'all');}, 2000);
                       })
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'mltChHint') {
                  botInx += 4;
                  $('.bot').css('pointer-events', 'none');
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('Okay <silence msec="100" /> the slope is one of these ratios.');
                  msg.pitch = 2;
                  msg.rate = 1.5;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint7').html()})
                       .then(function(){botresponse.play();})
                       .then(function(){
                           return botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint7a').html()});
                       })
                       .then(function(){botresponse.play();})
                       .then(function(){
                           return botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint7b').html()});
                       })
                       .then(function(){botresponse.play();})
                       .then(function(){botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint7c').html()});})
                       .then(function(){setTimeout(function(){botresponse.play();$('.bot').css('pointer-events', 'all');}, 2000);})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintVid') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: 'Okay. Let\'s watch.'})
                       .then(function(){botresponse.play();})
                       .then(function(){setTimeout(function(){$('.bot').trigger('click'); }, 1200)})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  startVid1();
                  }
                  else if (res.value === 'bothintExamp') {
                  botInx += 1;
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('The slope of this line is four thirds.');
                  msg.pitch = 2;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hintExamp').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintMyQuestion') {
                  botInx += 1;
                  lastInpInx = botInx;
                  botUI.message.human({type : 'html', delay: 1000, content: $('#myQuestion').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);});
                  }
                  else if (res.value === 'bothintA1') {
                  if (hint1Count >= 1 && hint2Count >= 1) {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#answer1').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play(); $('.bot').css('pointer-events', 'all');})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#ansNo').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  }
               });
}
function hintGroup2() {
  botInx += 1;
  if (botClick % 2 === 0 && FROMBOTBACK == false) {
  setTimeout(function(){
  window.speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance('<emphasis level="strong">Now</emphasis> you want to complete the <emphasis level="strong">equation</emphasis> for line <say-as interpret-as="characters">g</say-as>. How can I help?');
  msg.pitch = 2;
  window.speechSynthesis.speak(msg);
  }, 1000);}
  setTimeout(function(){$('.botui').prop('scrollTop', 0);}, 500);
  botUI.message.bot({type : 'html', content: 'Now you want to complete the <strong>equation</strong> for <strong>line g</strong>.<br /><br />How can I help?  😊'})
               .then(function(){
                  if (hint3Count >= 1 && hint4Count >= 1) var ansButReady = 'ansButReady';
                  else var ansButReady = 'ansBut';
                  if (hint3Count >= 1) var hint3Class = 'botButVisited';
                  else var hint3Class = 'botBut';
                  if (hint4Count >= 1) var hint4Class = 'botButVisited';
                  else var hint4Class = 'botBut';
                  return botUI.action.button({action: [
                                               {cssClass : hint3Class, text : 'Can you teach me about this?', value : 'bothint3'},
                                               {cssClass : hint4Class, text : 'What do I do here?', value : 'bothint4'},
                                               {cssClass : 'exampBut', text : 'Show me an example.', value : 'bothintExamp'},
                                               {cssClass : 'exampBut', text : 'Show me a video.', value : 'bothintVid'},
                                               {cssClass : ansButReady, text : 'Just give me the answer.', value : 'bothintA2'}
                                                      ]});
                  })
               .then(function(res){
                  if (res.value === 'bothint3') {
                  botInx += 3;
                  $('.bot').css('pointer-events', 'none');
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('A straight line that goes through the origin <silence msec="100" /> zero, zero <silence msec="100" /> has the equation <say-as interpret-as="characters">y</say-as> equals <say-as interpret-as="characters">m</say-as> <say-as interpret-as="characters">x</say-as> <silence msec="500" /> where <say-as interpret-as="characters">m</say-as> represents the slope.');
                  msg.pitch = 2;
                  msg.rate = 1.5;
                  window.speechSynthesis.speak(msg);
                  }, 1000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint3').html()})
                       .then(function(){botresponse.play();})
                       .then(function(){
                           return botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint3a').html()});
                       })
                       .then(function(){botresponse.play();})
                       .then(function(){botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint3b').html()});})
                       .then(function(){
                           hint3Count += 1; setTimeout(function(){botresponse.play();$('.bot').css('pointer-events', 'all');}, 2000);
                       })
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothint4') {
                  botInx += 1;
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('Enter the slope of line <say-as interpret-as="characters">g</say-as> as the coefficient of <say-as interpret-as="characters">x</say-as>.');
                  msg.pitch = 2;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint4').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint4Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintVid') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: 'Okay. Let\'s watch.'})
                       .then(function(){botresponse.play();})
                       .then(function(){setTimeout(function(){$('.bot').trigger('click'); }, 1200)})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  startVid2();
                  }
                  else if (res.value === 'bothintExamp') {
                  botInx += 1;
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('The equation of this line is <say-as interpret-as="characters">y</say-as> equals four thirds <say-as interpret-as="characters">x</say-as>.');
                  msg.pitch = 2;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hintExamp2').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintA2') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  if (hint3Count >= 1 && hint4Count >= 1) {
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#answer2').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();$('.bot').css('pointer-events', 'all');})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#ansNo').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  }
               });
}
function hintGroup3() {
  botInx += 1;
  if (botClick % 2 === 0 && FROMBOTBACK == false) {
  setTimeout(function(){
  window.speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance('Now you want to complete the equation for line <say-as interpret-as="characters">v</say-as>. How can I help?');
  msg.pitch = 2;
  window.speechSynthesis.speak(msg);
  }, 1000);}
  setTimeout(function(){$('.botui').prop('scrollTop', 0);}, 500);
  botUI.message.bot({type : 'html', content: 'Now you want to complete the equation for <strong>line v</strong>.<br /><br />How can I help?  🤔'})
               .then(function(){
                  if (hint5Count >= 1 && hint6Count >= 1) var ansButReady = 'ansButReady';
                  else var ansButReady = 'ansBut';
                  if (hint5Count >= 1) var hint5Class = 'botButVisited';
                  else var hint5Class = 'botBut';
                  if (hint6Count >= 1) var hint6Class = 'botButVisited';
                  else var hint6Class = 'botBut';
                  return botUI.action.button({action: [
                     {cssClass : hint5Class, text : 'Can you teach me about this?', value : 'bothint5'},
                     {cssClass : hint6Class, text : 'What do I do here?', value : 'bothint6'},
                     {cssClass : 'exampBut', text : 'Show me an example.', value : 'bothintExamp'},
                     {cssClass : 'exampBut', text : 'Show me a video.', value : 'bothintVid'},
                     {cssClass : ansButReady, text : 'Just give me the answer.', value : 'bothintA3'}
                  ]});
                  })
               .then(function(res){
                  if (res.value === 'bothint5') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('A line that does not pass through the origin has the equation <say-as interpret-as="characters">y</say-as> equals <say-as interpret-as="characters">m</say-as> <say-as interpret-as="characters">x</say-as> plus <say-as interpret-as="characters">b</say-as>, where <say-as interpret-as="characters">m</say-as> is the slope, and <say-as interpret-as="characters">b</say-as> is the translation of the line up or down.');
                  msg.pitch = 2;
                  msg.rate = 1.4;
                  window.speechSynthesis.speak(msg);
                  }, 1000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint5').html()})
                       .then(function(){botresponse.play();})
                       .then(function(){
                           return botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint5a').html()});
                       })
                       .then(function(){botresponse.play();})
                       .then(function(){botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint5b').html()});})
                       .then(function(){
                           hint5Count += 1; setTimeout(function(){botresponse.play();$('.bot').css('pointer-events', 'all');}, 2000);
                       })
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothint6') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('Enter the slope of line v as the coefficient of <say-as interpret-as="characters">x</say-as>. How much is the line translated up or down from the origin? Add this amount to the equation.');
                  msg.pitch = 2;
                  msg.rate = 1.4;
                  window.speechSynthesis.speak(msg);
                  }, 1000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint6').html()})
                       .then(function(){botresponse.play();})
                       .then(function(){
                           return botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint6a').html()});
                       })
                       .then(function(){botresponse.play();})
                       .then(function(){botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint6b').html()});})
                       .then(function(){
                           hint6Count += 1; setTimeout(function(){botresponse.play();$('.bot').css('pointer-events', 'all');}, 2000);
                       })
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintVid') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: 'Okay. Let\'s watch.'})
                       .then(function(){botresponse.play();})
                       .then(function(){setTimeout(function(){$('.bot').trigger('click'); }, 1200)})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  startVid2();
                  }
                  else if (res.value === 'bothintExamp') {
                  botInx += 1;
                  setTimeout(function(){
                  window.speechSynthesis.cancel();
                  var msg = new SpeechSynthesisUtterance('The equation of this line is <say-as interpret-as="characters">y</say-as> equals four thirds <say-as interpret-as="characters">x</say-as> plus zero.');
                  msg.pitch = 2;
                  window.speechSynthesis.speak(msg);
                  }, 2000);
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hintExamp3').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintA3') {
                  botInx += 1;
                  $('.bot').css('pointer-events', 'none');
                  if (hint5Count >= 1 && hint6Count >= 1) {
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#answer3').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();$('.bot').css('pointer-events', 'all');})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#ansNo').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  }
               });
}

interact('.resize-drag')
  .resizable({
    edges: {left: false, right: false, bottom: true, top: true},
    modifiers: [interact.modifiers.restrictSize({min: {width: 350, height: 175}})],
    inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0),
    y = (parseFloat(target.getAttribute('data-y')) || 0);

    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    var styleElem = document.head.appendChild(document.createElement("style"));
    var hght = Number(target.style.height.slice(0, -2));
    var perc = String(100 - (125 / hght * 100)) + '%';
    styleElem.innerHTML = ".speech_bubble:after {top:" + perc + ";}";

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

var ININPUT = false;
$(document).on('mouseenter', '#myQuestionInput', function(){ININPUT = true;});
$(document).on('mouseleave', '#myQuestionInput', function(){ININPUT = false;});
$(document).on('mouseenter', '.botui-actions-text-input', function(){ININPUT = true;});
$(document).on('mouseleave', '.botui-actions-text-input', function(){ININPUT = false;});

interact('.draggable').draggable({inertia: true, autoScroll: false, onmove: dragMoveListener});

  function dragMoveListener (event) {
    if (ININPUT) return;
    var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
window.dragMoveListener = dragMoveListener;
