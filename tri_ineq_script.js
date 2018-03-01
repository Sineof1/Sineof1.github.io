function animateSVG() {
$('#svgAnimInsert').empty();

var svgTriIneq = d3.select('#svgAnimInsert')
                   .append('svg')
                   .attr('width', 300)
                   .attr('height', 200)
                   .attr('transform', 'translate(50%, 50%) scale(2, 2)');

svgTriIneq.append('line')
          .attr('x1', 40)
          .attr('y1', 100)
          .attr('x2', 40)
          .attr('y2', 100)
          .style('stroke', 'blue').style('stroke-width', 1.5)
          .transition()
          .delay(1000)
          .duration(2000)
          .ease(d3.easeExpInOut)
          .attr('x2', 240);

svgTriIneq.append('line')
          .attr('x1', 40)
          .attr('y1', 100)
          .attr('x2', 40)
          .attr('y2', 100)
          .style('stroke', 'green').style('stroke-width', 1.5).style('stroke-dasharray', '5,5').style('stroke-linejoin', 'round')
          .transition()
          .delay(3500)
          .duration(1500)
          .ease(d3.easeExpInOut)
          .attr('x2', 65)
          .attr('y2', 45);

svgTriIneq.append('line')
          .attr('x1', 65)
          .attr('y1', 45)
          .attr('x2', 65)
          .attr('y2', 45)
          .style('stroke', 'green').style('stroke-width', 1.5).style('stroke-dasharray', '5,5').style('stroke-linejoin', 'round')
          .transition()
          .delay(5000)
          .duration(1500)
          .ease(d3.easeExpInOut)
          .attr('x2', 240)
          .attr('y2', 100);

svgTriIneq.append('line')
          .attr('x1', 40)
          .attr('y1', 100)
          .attr('x2', 40)
          .attr('y2', 100)
          .style('stroke', 'brown').style('stroke-width', 1.5).style('stroke-dasharray', '5,5').style('stroke-linejoin', 'round')
          .transition()
          .delay(6500)
          .duration(1500)
          .ease(d3.easeExpInOut)
          .attr('x2', 165)
          .attr('y2', 125);

svgTriIneq.append('line')
          .attr('x1', 165)
          .attr('y1', 125)
          .attr('x2', 165)
          .attr('y2', 125)
          .style('stroke', 'brown').style('stroke-width', 1.5).style('stroke-dasharray', '5,5').style('stroke-linejoin', 'round')
          .transition()
          .delay(8000)
          .duration(1500)
          .ease(d3.easeExpInOut)
          .attr('x2', 240)
          .attr('y2', 100);

svgTriIneq.append('line')
          .attr('x1', 40)
          .attr('y1', 100)
          .attr('x2', 40)
          .attr('y2', 100)
          .style('stroke', 'purple').style('stroke-width', 1.5).style('stroke-dasharray', '5,5').style('stroke-linejoin', 'round')
          .transition()
          .delay(9500)
          .duration(1500)
          .ease(d3.easeExpInOut)
          .attr('x2', 240)
          .attr('y2', 55);

svgTriIneq.append('line')
          .attr('x1', 240)
          .attr('y1', 55)
          .attr('x2', 240)
          .attr('y2', 55)
          .style('stroke', 'purple').style('stroke-width', 1.5).style('stroke-dasharray', '5,5').style('stroke-linejoin', 'round')
          .transition()
          .delay(11000)
          .duration(1500)
          .ease(d3.easeExpInOut)
          .attr('x2', 240)
          .attr('y2', 100);

svgTriIneq.append('circle')
          .attr('cx', 40)
          .attr('cy', 100)
          .attr('r', 3)
          .style('fill', 'black').style('stroke', 'none');

svgTriIneq.append('circle')
          .attr('cx', 240)
          .attr('cy', 100)
          .attr('r', 0)
          .style('fill', 'black').style('stroke', 'none')
          .transition()
          .delay(2800)
          .duration(500)
          .attr('r', 3);
}

animateSVG();
setInterval(function(){animateSVG();}, 13000);
