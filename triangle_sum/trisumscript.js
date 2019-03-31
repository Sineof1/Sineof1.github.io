var lines = [{x1 : 100, y1 : 230, x2 : 100, y2 : 230, glx2 : 400, gly2 : 230}, {x1 : 400, y1 : 230, x2 : 400, y2 : 230, glx2 : 200, gly2 : 50},
             {x1 : 200, y1 : 50, x2 : 200, y2 : 50, glx2 : 100, gly2 : 230}];
             
var lines2 = [{x1 : 400, y1 : 230, glx2 : 550, gly2 : 230}];
var lines3 = [{x1 : 527.78, y1 : 0, glx2 : 361.11, gly2 : 300}, {x1 : 227.78, y1 : 0, glx2 : 0, gly2 : 410}];
var pnts  = [{label : 'A', x : 200, y : 50, txps : 40}, {label : 'B', x : 100, y : 230, txps : 250}, {label : 'C', x : 400, y : 230, txps : 250}];

function animateStep1() {
   $('#workspace').empty();
   $('#step1').css({'pointer-events' : 'none'});
   $('#1step').css({'background-color' : 'white'});

   d3.select('#workspace')
     .append('svg')
     .attr("preserveAspectRatio", "xMinYMin meet")
     .classed("svg-content-responsive", true)
     .attr('viewBox', '0 0 600 300')
     .attr('width', '90%').attr('height', '90%')
     .selectAll('circle')
     .data(pnts)
     .enter()
     .append('circle')
     .attr('cx', 0).attr('cy', 0).attr('r', 0).style('fill', 'black')
     .transition()
     .duration(1000)
     .attr('cx', function(d){return d.x;}).attr('cy', function(d){return d.y;}).attr('r', 4);
     
   d3.select('svg')
     .selectAll('line')
     .data(lines)
     .enter()
     .append('line')
     .attr('x1', function(d){return d.x1;})
     .attr('y1', function(d){return d.y1;})
     .attr('x2', function(d){return d.x2;})
     .attr('y2', function(d){return d.y2;})
     .style('stroke', 'black')
     .transition()
     .delay(1200)
     .duration(500)
     .attr('x2', function(d){return d.glx2;}).attr('y2', function(d){return d.gly2;});

   d3.select('svg')
     .selectAll('.firstPoints')
     .data(pnts)
     .enter()
     .append('text')
     .classed('firstPoints', true)
     .attr('x', 0).attr('y', 0)
     .style('font-family', 'Arimo').style('font-size', '14px')
     .text(function(d){return d.label;})
     .transition()
     .delay(1700)
     .duration(1000)
     .attr('x', function(d){return d.x - 5;})
     .attr('y', function(d, i){return d.txps;});
     
   d3.select('svg')
     .selectAll('.secondLines')
     .data(lines2)
     .enter()
     .append('line')
     .classed('secondLines', true)
     .attr('x1', function(d){return d.x1;})
     .attr('y1', function(d){return d.y1;})
     .attr('x2', function(d){return d.x1;})
     .attr('y2', function(d){return d.y1;})
     .style('stroke', 'black')
     .transition()
     .delay(3000)
     .duration(1000)
     .attr('x2', function(d){return d.glx2;}).attr('y2', function(d){return d.gly2;});

   d3.select('svg')
     .append('circle')
     .attr('cx', 550).attr('cy', 230).attr('r', 4)
     .style('fill-opacity', 0)
     .transition()
     .delay(4300)
     .duration(800)
     .style('fill-opacity', 1);

   d3.select('svg')
     .append('text')
     .attr('x', 545).attr('y', 250)
     .style('font-family', 'Arimo').style('font-size', '14px').style('fill-opacity', 0)
     .text('D')
     .transition()
     .delay(4300)
     .duration(800)
     .style('fill-opacity', 1);

   setTimeout(function(){$('#step2').css({'pointer-events' : 'all'});}, 5500);
}
function animateStep2() {
   $('#step2').css({'pointer-events' : 'none'});
   $('#2step').css({'background-color' : 'white'});

   d3.select('svg')
     .append('circle')
     .attr('cx', 450).attr('cy', 140).attr('r', 4)
     .style('fill-opacity', 0)
     .transition()
     .duration(800)
     .style('fill-opacity', 1);
     
   d3.select('svg')
     .append('text')
     .attr('x', 463).attr('y', 145)
     .style('font-family', 'Arimo').style('font-size', '14px').style('fill-opacity', 0)
     .text('E')
     .transition()
     .duration(800)
     .style('fill-opacity', 1);
     
   d3.select('svg')
     .selectAll('.thirdLines')
     .data(lines3)
     .enter()
     .append('line')
     .classed('thirdLines', true)
     .attr('x1', function(d){return d.x1;})
     .attr('y1', function(d){return d.y1;})
     .attr('x2', function(d){return d.x1;})
     .attr('y2', function(d){return d.y1;})
     .style('stroke', 'gray').style('stroke-width', 2).style('stroke-dasharray', '5, 5')
     .transition()
     .delay(800)
     .duration(1500)
     .attr('x2', function(d){return d.glx2;}).attr('y2', function(d){return d.gly2;});

   d3.select('svg')
     .append('line')
     .attr('x1', 0).attr('y1', -130).attr('x2', 0).attr('y2', -130)
     .style('stroke', 'gray').style('stroke-dasharray', '5, 5')
     .transition()
     .delay(3000)
     .duration(1000)
     .attr('x2', 600).attr('y2', 410);

   setTimeout(function(){$('#step3').css({'pointer-events' : 'all'});}, 4000);
}
function animateStep3() {
   $('#step3').css({'pointer-events' : 'none'});
   $('#3step').css({'background-color' : 'white'});
   
   d3.select('svg')
     .append('path')
     .style('fill', 'green')
     .style('fill-opacity', 0)
     .attr('d', 'M 400 230 L 450 230 A 50 50 1 0 0 424.282 186.292 Z')
     .transition()
     .delay(1000)
     .duration(1000)
     .style('fill-opacity', 0.3);

   d3.select('svg')
     .append('path')
     .style('fill', 'green')
     .style('fill-opacity', 0)
     .attr('d', 'M 100 230 L 150 230 A 50 50 1 0 0 124.282 186.292 Z')
     .transition()
     .delay(1000)
     .duration(1000)
     .style('fill-opacity', 0.3);

   setTimeout(function(){$('#step4').css({'pointer-events' : 'all'});}, 2500);
}
function animateStep4() {
   $('#step4').css({'pointer-events' : 'none'});
   $('#4step').css({'background-color' : 'white'});
   
   d3.select('svg')
     .append('path')
     .style('fill', 'orange')
     .style('fill-opacity', 0)
     .attr('d', 'M 400 230 L 424.282 186.292 A 50 50 1 0 0 362.835 196.552 Z')
     .transition()
     .delay(1000)
     .duration(1000)
     .style('fill-opacity', 0.3);

   d3.select('svg')
     .append('path')
     .style('fill', 'orange')
     .style('fill-opacity', 0)
     .attr('d', 'M 200 50 L 237.165 83.448 A 50 50 1 0 1 175.718 93.708 Z')
     .transition()
     .delay(1000)
     .duration(1000)
     .style('fill-opacity', 0.3);

   setTimeout(function(){$('#step5').css({'pointer-events' : 'all'});}, 3000);
}
function animateStep5() {
   $('#step5').css({'pointer-events' : 'none'});
   $('#5step').css({'background-color' : 'white'});
   
   d3.select('svg')
     .append('path')
     .style('fill', 'slateblue')
     .style('fill-opacity', 0)
     .attr('d', 'M 400 230 L 362.835 196.552 A 50 50 1 0 0 350 230 Z')
     .transition()
     .delay(500)
     .duration(1000)
     .style('fill-opacity', 0.3);

   d3.select('svg')
     .append('line')
     .attr('x1', 100).attr('y1', 230).attr('x2', 550).attr('y2', 230)
     .style('stroke', 'blue').style('stroke-width', 3).style('stroke-opacity', 0)
     .transition()
     .delay(1500)
     .duration(1000)
     .style('stroke-opacity', 1)
     .transition()
     .delay(500)
     .duration(1000)
     .style('stroke-opacity', 0);
}

$('#step1').bind('click', function(){animateStep1();});
$('#step2').bind('click', function(){animateStep2();});
$('#step3').bind('click', function(){animateStep3();});
$('#step4').bind('click', function(){animateStep4();});
$('#step5').bind('click', function(){animateStep5();});
$('#startover').bind('click', function(){
   $('.step').css({'background-color' : '#eaeaea'});
   $('#1step').css({'background-color' : 'white'});
   animateStep1();
});