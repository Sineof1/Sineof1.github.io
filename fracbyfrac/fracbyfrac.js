var numdata = [];
var denomdata = [];
var colors = ['rgba(255, 255, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(156, 0, 156, 0.2)', 'rgba(0, 255, 255, 0.2)',
              'rgba(255, 165, 0, 0.2)', 'rgba(255, 192, 203, 0.3)', 'rgba(165, 42, 42, 0.2)', 'rgba(255, 215, 0, 0.2)']

var randnums = [Math.floor(Math.random() * 8) + 1, Math.floor(Math.random() * 8) + 1, Math.floor(Math.random() * 8) + 1, Math.floor(Math.random() * 8) + 1];
$('#fracdividendnum').val(randnums[0]);
$('#fracdivisornum').val(randnums[3]);
$('#fracdividenddenom').val(randnums[2]);
$('#fracdivisordenom').val(randnums[1]);

var numerator = d3.select('#module4')
                  .append('svg')
                  .attr('id', 'numSVG')
                  .attr('width', 1200)
                  .attr('height', 200)
                  .style('position', 'absolute')
                  .style('top', '62px')
                  .style('left', '60px');

var denominator = d3.select('#module4')
                    .append('svg')
                    .attr('id', 'denomSVG')
                    .attr('width', 1200)
                    .attr('height', 200)
                    .style('position', 'absolute')
                    .style('top', '280px')
                    .style('left', '60px');

$('.fracInputNum, .fracInputDenom').bind('keyup', function(evt) {
   numdata = [];
   denomdata = [];

   d3.select('#numSVG').selectAll('rect').remove();
   d3.select('#denomSVG').selectAll('rect').remove();
   d3.select('#module4').selectAll('line').remove();

   var dividend_num = Number($('#fracdividendnum').val());
   var divisor_num = Number($('#fracdivisornum').val());
   var dividend_denom = Number($('#fracdividenddenom').val());
   var divisor_denom = Number($('#fracdivisordenom').val());

   var lt0 = dividend_num < 0 || divisor_num <= 0 || dividend_denom <= 0 || divisor_denom <= 0;
   var isnan = isNaN(dividend_num) || isNaN(divisor_num) || isNaN(dividend_denom) || isNaN(divisor_denom);
   var blank = dividend_num === '' || dividend_denom === '' || divisor_num === '' || divisor_denom === '';

   if (lt0 || isnan || blank) return;

   var divWholes = (dividend_num / dividend_denom === divisor_num / divisor_denom && divisor_num / divisor_denom > 1);
   var numWholes = Math.ceil(dividend_num / dividend_denom);
   var denomWholes = Math.ceil(divisor_num / divisor_denom);
   var commdenom = dividend_denom * divisor_denom;
   var numTotal = dividend_num * (commdenom / dividend_denom);
   var denomTotal = divisor_num * (commdenom / divisor_denom);
   if (numWholes === 1 && denomWholes === 1) var secWidth = 1200 / (commdenom);
   else {
      if (numTotal > denomTotal || divWholes) var secWidth = 1200 / numTotal;
      else if (denomTotal > numTotal) var secWidth = 1200 / denomTotal;
   }

   for (var p = 0; p < 1200; p += secWidth) {
   numdata.push(p);
   denomdata.push(p);
   }
   numerator.selectAll('rect')
            .data(numdata)
            .enter()
            .append('rect')
            .attr('x', function(d){return d;})
            .attr('y', 0)
            .attr('width', secWidth)
            .attr('height', 200)
            .style('stroke', 'gray')
            .style('fill', function(d, i){
               if (i < numTotal && i < commdenom) return 'rgba(0, 0, 255, 0.2)';
               else if (i < numTotal && i >= commdenom) return colors[Math.floor(i / commdenom) - 1];
               else return 'white';
            });

 denominator.selectAll('rect')
            .data(denomdata)
            .enter()
            .append('rect')
            .attr('x', function(d){return d;})
            .attr('y', 0)
            .attr('width', secWidth)
            .attr('height', 200)
            .style('stroke', 'gray')
            .style('fill', function(d, i){
               if (i < denomTotal && i < commdenom) return 'rgba(255, 0, 0, 0.2)';
               else if (i < denomTotal && i >= commdenom) return colors[Math.floor(i / commdenom) - 1];
               else return 'white';
            });

   d3.select('#module4')
     .append('svg')
     .attr('width', 5)
     .attr('height', 448)
     .style('position', 'fixed')
     .style('left', 60 + (commdenom * secWidth) - 2.5)
     .style('top', 52)
     .append('line')
     .attr('x1', 2.5)
     .attr('y1', 0)
     .attr('x2', 2.5)
     .attr('y2', 0)
     .style('stroke-dasharray', '5, 5')
     .style('stroke-width', 3)
     .style('stroke', 'black')
     .transition()
     .delay(100)
     .duration(500)
     .attr('y2', 448);
});

$('#fracdividendnum').trigger('keyup');
