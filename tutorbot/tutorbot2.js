
$('.panel-left').resizable({
   handleSelector: '.splitter',
   resizeHeight: false
 });
 $('.panel-top').resizable({
   handleSelector: '.splitter-horizontal',
   resizeWidth: false
 });

$(document).ready(function(){$('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 45});});

var botstart = document.getElementById('botstart');
botstart.volume = 0.3;
var botresponse = document.getElementById('botresponse');
botresponse.volume = 0.2;
var ding = document.getElementById('ding');
ding.volume = 0.2;

$('.ansBut').attr('disabled', true);
var errTotal = 1;
var botInx = -1;
var lastInpInx;

katex.render('\\mathtt{y=}', math1);
katex.render('\\mathtt{x}', math2);
katex.render('\\mathtt{y=}', math3);
katex.render('\\mathtt{x +}', math4);
katex.render('\\mathtt{\\frac{\\text{rise}}{\\text{run}}}', math5);
katex.render('\\mathtt{-\\frac{3}{1}}', math6);
katex.render('\\mathtt{y=mx}', math7);
katex.render('\\mathtt{m}', math8);
katex.render('\\mathtt{x}', math9);
katex.render('\\mathtt{y=}', math10);
katex.render('\\mathtt{-\\frac{3}{1}}', math11);
katex.render('\\mathtt{x}', math12);
katex.render('\\mathtt{y=mx+b}', math13);
katex.render('\\mathtt{m}', math14);
katex.render('\\mathtt{b}', math15);
katex.render('\\mathtt{x}', math16);
katex.render('\\mathtt{y=}', math17);
katex.render('\\mathtt{-\\frac{3}{1}}', math18);
katex.render('\\mathtt{x}', math19);
katex.render('\\mathtt{-5}', math20);
katex.render('\\mathtt{5}', math21);
katex.render('\\mathtt{\\frac{4}{3}}', math100);
katex.render('\\mathtt{y=\\frac{4}{3}x}', math101);
katex.render('\\mathtt{y=\\frac{4}{3}x+0}', math102);

var fullLines = ['M 275 550 L 50 -125'];
var xandyaxes = [{x : 225, y : 400}];
var linlabels = [{x : 78, y : 15, label : 'h'}, {x : 612, y : 413, label : 'x'}, {x : 215, y : 10, label : 'y'}, {x : 229, y : 414, label : '0'}, {x : 354, y : 414, label : '5'}, {x : 476, y : 414, label : '10'}, {x : 94, y : 414, label : '–5'}, {x : 210, y : 283, label : '5'}, {x : 204, y : 158, label : '10'}, {x : 204, y : 531, label : '–5'}];
var clickpnts = [{x : 100, y : 25, id : 0}, {x : 175, y : 250, id : 1}, {x : 150, y : 175, id : 2}, {x : 250, y : 475, id : 3}];

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
  var intcpt = String(clickpnts[pointIndex].x - ((d3.mouse(this)[1] - clickpnts[pointIndex].y) * (-1/3)));
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
     $('.speech_bubble').css({'height' : '250px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:50%;}";
   }
   var answer = slope1Ans.latex();
   $(this).css('border', 'none');
   if (answer === '-3' || answer === '-\\frac{3}{1}' || answer === '\\frac{-3}{1}' || answer === '\\frac{3}{-1}' ||
       answer === '-\\frac{6}{2}' || answer === '\\frac{-6}{2}' || answer === '\\frac{6}{-2}' ||
       answer === '-\\frac{9}{3}' || answer === '\\frac{-9}{3}' || answer === '\\frac{9}{-3}' ||
       answer === '-\\frac{18}{6}' || answer === '\\frac{-18}{6}' || answer === '\\frac{18}{-6}' ||
       answer === '-\\frac{12}{4}' || answer === '\\frac{-12}{4}' || answer === '\\frac{12}{-4}' ||
       answer === '-\\frac{21}{7}' || answer === '\\frac{-21}{7}' || answer === '\\frac{21}{-7}') {
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
   else {errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
});
$('#equation1').bind('keyup', function(evt) {
   if (evt.keyCode !== 13) return;
   if (botClick % 2 === 0) {
     $('.bot').trigger('click');
     $('.speech_bubble').css({'height' : '250px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:50%;}";
   }
   var answer = equation1Ans.latex();
   $(this).css('border', 'none');
   if (answer === '-3' || answer === '-\\frac{3}{1}' || answer === '\\frac{-3}{1}' || answer === '\\frac{3}{-1}' ||
       answer === '-\\frac{6}{2}' || answer === '\\frac{-6}{2}' || answer === '\\frac{6}{-2}' ||
       answer === '-\\frac{9}{3}' || answer === '\\frac{-9}{3}' || answer === '\\frac{9}{-3}' ||
       answer === '-\\frac{18}{6}' || answer === '\\frac{-18}{6}' || answer === '\\frac{18}{-6}' ||
       answer === '-\\frac{12}{4}' || answer === '\\frac{-12}{4}' || answer === '\\frac{12}{-4}' ||
       answer === '-\\frac{21}{7}' || answer === '\\frac{-21}{7}' || answer === '\\frac{21}{-7}') {
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
            .attr('transform', 'translate(0, 125)')
            .style('opacity', 1);
   var transTrngl = clone('#slope_triangle').style('opacity', 0);
   transTrngl.transition()
             .delay(500)
             .duration(500)
             .style('opacity', 1);
   transTrngl.transition()
             .delay(1000)
             .duration(1500)
             .attr('transform', 'translate(0, 125)')
             .style('fill', 'rgba(255, 165, 0, 0.3)');
   d3.select('#demo_grapher').select('svg').append('text')
     .attr('x', 30).attr('y', 15).style('fill', 'black').style('font-family', 'sans-serif').style('font-size', '14px')
     .style('opacity', 0)
     .text('w')
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
     $('.speech_bubble').css({'height' : '250px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:50%;}";
   }
   $('#equation2, #equation3').css('box-shadow', '0 0 3px #aaa');
   var answer = equation2Ans.latex();
   $(this).css('border', 'none');
   if (answer === '-3' || answer === '-\\frac{3}{1}' || answer === '\\frac{-3}{1}' || answer === '\\frac{3}{-1}' ||
       answer === '-\\frac{6}{2}' || answer === '\\frac{-6}{2}' || answer === '\\frac{6}{-2}' ||
       answer === '-\\frac{9}{3}' || answer === '\\frac{-9}{3}' || answer === '\\frac{9}{-3}' ||
       answer === '-\\frac{18}{6}' || answer === '\\frac{-18}{6}' || answer === '\\frac{18}{-6}' ||
       answer === '-\\frac{12}{4}' || answer === '\\frac{-12}{4}' || answer === '\\frac{12}{-4}' ||
       answer === '-\\frac{21}{7}' || answer === '\\frac{-21}{7}' || answer === '\\frac{21}{-7}') {
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
   else {errTotal += 1; hintRemind(); $(this).css('border', '2px solid red');}
});
$('#equation3').bind('keyup', function(evt) {
   if (evt.keyCode !== 13) return;
   if (botClick % 2 === 0) {
     $('.bot').trigger('click');
     $('.speech_bubble').css({'height' : '250px'});
     var styleElem = document.head.appendChild(document.createElement("style"));
     styleElem.innerHTML = ".speech_bubble:after {top:50%;}";
   }
   var answer = equation3Ans.latex();
   $(this).css('border', 'none');
   if (answer === '-5' || answer === '-5.0') {
   ding.play();
   equation3Ans.blur();
   $('.jitbox').fadeOut();
   $('#equation3').css({'border' : '2px solid green', 'pointer-events' : 'none', 'box-shadow' : 'none', 'font-weight' : 900, 'background-color' : '#fafafa'});
   d3.select('.bot').transition().duration(1000).style('opacity', 0);
   }
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

botClick = 1;
var MOUSEDOWN = false;
var hint1Count = 0;
var hint2Count = 0;
var hint3Count = 0;
var hint4Count = 0;
var hint5Count = 0;
var hint6Count = 0;

$(document).on('click', '.closeJit', function(evt){$('.jitbox').fadeOut();});
$('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 45});

$(document).on('click', '.bot', function(evt) {
   botClick += 1;
   botInx = -1;
   botUI.message.removeAll();
   $('.speech_bubble').css({'height' : '250px'});
   var styleElem = document.head.appendChild(document.createElement("style"));
   styleElem.innerHTML = ".speech_bubble:after {top:50%;}";
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
   d3.select('.bot')
     .transition()
     .duration(1000)
     .ease(d3.easeBackInOut)
     .style('left', '855px');
   d3.select('.speech_bubble')
     .style('visibility', 'visible')
     .transition()
     .duration(50)
     .style('left', '990px')
     .transition()
     .delay(800)
     .duration(800)
     .style('opacity', 1);
   }
   else {
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
      $('.speech_bubble').offset({left : 200, top : $('.bot').offset().top - 45});
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

$(document).on('click', '.botback', function(evt) {
   botInx += 1;
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
function hintGroup1() {
  botInx += 1;
  botUI.message.bot({content: 'I\'m here! Ask me a question, watch a video, or see an example.'})
               .then(function(){
                  if (hint1Count >= 1 && hint2Count >= 1) $('.ansBut').attr('disabled', false);
                  else $('.ansBut').attr('disabled', true);
                  if (hint1Count >= 1) var hint1Class = 'botButVisited';
                  else var hint1Class = 'botBut';
                  if (hint2Count >= 1) var hint2Class = 'botButVisited';
                  else var hint2Class = 'botBut';
                  return botUI.action.button({action: [{cssClass : hint1Class, text : 'What is slope?', value : 'bothint1'},
                                                       {cssClass : hint2Class, text : 'How do I calculate the slope?', value : 'bothint2'},
                                                       {cssClass : 'exampBut', text : 'Let\'s watch a video.', value : 'bothintVid'},
                                                       {cssClass : 'exampBut', text : 'Show me an example.', value : 'bothintExamp'},
                                                       {cssClass : 'exampBut', text : 'I need a calculator.', value : 'bothintMyQuestion'},
                                                       {cssClass : 'ansBut', text : 'Just give me the answer.', value : 'bothintA1'}
                                                      ]});
                  })
               .then(function(res){
                  if (res.value === 'bothint1') {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint1').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint1Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothint2') {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint2').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint2Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintVid') {
                  botInx += 1;
                  botUI.message.add({cssClass : 'vidEmbed', type : 'embed', delay: 2000, loading: true, content: 'slopes_of_lines.mp4'})
                       .then(function(){botInx += 1; botUI.message.human({cssClass : 'noStyle', type : 'html', content: $('#hintVid').html()})})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintExamp') {
                  botInx += 1;
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
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#answer1').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
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
  botUI.message.bot({content: 'I\'m here! Ask me a question, watch a video, or see an example.'})
               .then(function(){
                  if (hint3Count >= 1 && hint4Count >= 1) $('.ansBut').attr('disabled', false);
                  else $('.ansBut').attr('disabled', true);
                  if (hint3Count >= 1) var hint3Class = 'botButVisited';
                  else var hint3Class = 'botBut';
                  if (hint4Count >= 1) var hint4Class = 'botButVisited';
                  else var hint4Class = 'botBut';
                  return botUI.action.button({action: [{cssClass : hint3Class, text : 'What is the equation of a line?', value : 'bothint3'},
                                                       {cssClass : hint4Class, text : 'How do I complete this equation?', value : 'bothint4'},
                                                       {cssClass : 'exampBut', text : 'Show me an example.', value : 'bothintExamp'},
                                                       {cssClass : 'exampBut', text : 'Let\'s watch a video.', value : 'bothintVid'},
                                                       {cssClass : 'ansBut', text : 'Just give me the answer.', value : 'bothintA2'}
                                                      ]});
                  })
               .then(function(res){
                  if (res.value === 'bothint3') {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint3').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint3Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothint4') {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint4').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint4Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintVid') {
                  botUI.message.add({cssClass : 'vidEmbed', type : 'embed', delay: 2000, loading: true, content: 'slopes_of_lines.mp4'})
                       .then(function(){botUI.message.human({cssClass : 'noStyle', type : 'html', content: $('#hintVid').html()})})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintExamp') {
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hintExamp2').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintA2') {
                  botInx += 1;
                  if (hint3Count >= 1 && hint4Count >= 1) {
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#answer2').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
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
  botUI.message.bot({content: 'I\'m here! Ask me a question, watch a video, or see an example.'})
               .then(function(){
                  if (hint5Count >= 1 && hint6Count >= 1) $('.ansBut').attr('disabled', false);
                  else $('.ansBut').attr('disabled', true);
                  if (hint5Count >= 1) var hint5Class = 'botButVisited';
                  else var hint5Class = 'botBut';
                  if (hint6Count >= 1) var hint6Class = 'botButVisited';
                  else var hint6Class = 'botBut';
                  return botUI.action.button({action: [{cssClass : hint5Count, text : 'This line doesn\'t go through (0, 0)?', value : 'bothint5'},
                                                       {cssClass : hint6Count, text : 'What numbers go here?', value : 'bothint6'},
                                                       {cssClass : 'exampBut', text : 'Show me an example.', value : 'bothintExamp'},
                                                       {cssClass : 'exampBut', text : 'Let\'s watch a video.', value : 'bothintVid'},
                                                       {cssClass : 'ansBut', text : 'Just give me the answer.', value : 'bothintA3'}
                                                      ]});
                  })
               .then(function(res){
                  if (res.value === 'bothint5') {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint5').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint5Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothint6') {
                  botInx += 1;
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hint6').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){hint6Count += 1; botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintVid') {
                  botUI.message.add({cssClass : 'vidEmbed', type : 'embed', delay: 2000, loading: true, content: 'slopes_of_lines.mp4'})
                       .then(function(){botUI.message.human({cssClass : 'noStyle', type : 'html', content: $('#hintVid').html()})})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintExamp') {
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#hintExamp3').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
                       .then(function(){var d = new Date(); $('#botImage').attr('src', 'blinkbot.gif?' + d.getTime());});
                  }
                  else if (res.value === 'bothintA3') {
                  botInx += 1;
                  if (hint5Count >= 1 && hint6Count >= 1) {
                  botUI.message.bot({type : 'html', delay: 2000, loading: true, content: $('#answer3').html()})
                       .then(function(){$(".botui").animate({ scrollTop: $('.botui').prop("scrollHeight")}, 1000);})
                       .then(function(){botresponse.play();})
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
    // resize from all edges and corners
    edges: { left: false, right: false, bottom: true, top: true },
    modifiers: [
      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 350, height: 175 },
      }),
    ],
    inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    var styleElem = document.head.appendChild(document.createElement("style"));
    var hght = Number(target.style.height.slice(0, -2));
    var perc = String(100 - (125 / hght * 100)) + '%';
    styleElem.innerHTML = ".speech_bubble:after {top:" + perc + ";}";

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  });

var ININPUT = false;
$(document).on('mouseenter', '#myQuestionInput', function(){ININPUT = true;});
$(document).on('mouseleave', '#myQuestionInput', function(){ININPUT = false;});

interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
  });

  function dragMoveListener (event) {
    if (ININPUT) return;
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    console.log(target);
    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
