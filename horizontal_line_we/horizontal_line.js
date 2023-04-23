
    // Constants
    const width = 440;
    const height = 440;
    const numLines = 21;
    const lineSpacing = width / (numLines + 1);
    const tickMarkIndices = [1, 11, 16, 21];
    const verTickMarkIndices = [1, 6, 16, 21];
    const tickMarkHeight = 10;
    const labels = ["−5", "5", "10", "15"];
    const verticalLabels = ["100", "50", "−50", "−100"];

    // Select the SVG element
    const svg = d3.select('#grid');

    // Draw the horizontal lines
    for (let i = 1; i <= numLines; i++) {
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', i * lineSpacing)
        .attr('x2', width)
        .attr('y2', i * lineSpacing)
        .attr('class', i === 11 ? 'highlightedLine' : 'gridLine');
    }

    // Draw the vertical lines
    for (let i = 1; i <= numLines; i++) {
      svg.append('line')
        .attr('x1', i * lineSpacing)
        .attr('y1', 0)
        .attr('x2', i * lineSpacing)
        .attr('y2', height)
        .attr('class', i === 6 ? 'highlightedLine' : 'gridLine');
    }
    // Draw the tick marks on the black horizontal line
    tickMarkIndices.forEach((index, i) => {
      svg.append('line')
        .attr('x1', index * lineSpacing)
        .attr('y1', 11 * lineSpacing - tickMarkHeight)
        .attr('x2', index * lineSpacing)
        .attr('y2', 11 * lineSpacing + tickMarkHeight)
        .attr('class', 'tickMark');
      svg.append('text')
        .attr('x', index * lineSpacing)
        .attr('y', 11 * lineSpacing + tickMarkHeight + 2)
        .attr('class', 'label')
        .text(labels[i]);
    });
    verTickMarkIndices.forEach((index, i) => {
      svg.append('line')
        .attr('x1', 6 * lineSpacing - tickMarkHeight)
        .attr('y1', index * lineSpacing)
        .attr('x2', 6 * lineSpacing + tickMarkHeight)
        .attr('y2', index * lineSpacing)
        .attr('class', 'tickMark');
      svg.append('text')
        .attr('x', 6 * lineSpacing - tickMarkHeight - 2)
        .attr('y', index * lineSpacing + 2)
        .attr('class', 'verLabel')
        .text(verticalLabels[i]);
    });
    // Set the text for the equations
    document.getElementById('equation1').innerHTML = "&#8201;h(t) &emsp;= &emsp;15t";
    document.getElementById('clickableEquation').innerHTML = "&#8202;100 &emsp;= &emsp;15t";

    document.getElementById('clickableEquation').addEventListener('click', () => {
      const secondGroup = document.getElementById('secondGroup');
      secondGroup.style.display = secondGroup.style.display === 'none' ? 'block' : 'none';

      // Create and animate the orange line
      setTimeout(() => {
      const animatedLine = svg.append('line')
        .attr('class', 'animated-line')
        .attr('x1', 0)
        .attr('y1', lineSpacing)
        .attr('x2', 0)
        .attr('y2', lineSpacing);

      animatedLine.transition()
        .duration(1000) // Animation duration in milliseconds
        .attr('x2', width);
      }, 3000);
      setTimeout(() => {
        const slope = 3;
        const startY = height - 2 * lineSpacing;
        const startX = 0;

        const blueAnimatedLine = svg.append('line')
          .attr('class', 'blue-animated-line')
          .attr('x1', startX)
          .attr('y1', startY)
          .attr('x2', startX)
          .attr('y2', startY);

        const endX = 14 * 20;

        blueAnimatedLine.transition()
          .duration(1000) // Animation duration in milliseconds
          .attr('x2', endX)
          .attr('y2', -20);
      }, 8000); // 5-second delay

      setTimeout(() => {
      // Create and fade in the black circle
      const blackCircle = svg.append('circle')
        .attr('class', 'black-circle')
        .attr('cx', 253.333333333)
        .attr('cy', 20)
        .attr('r', 8)
        .attr('opacity', 0);

      blackCircle.transition()
        .duration(1000) // Animation duration in milliseconds
        .attr('opacity', 1);
      }, 9000);

      // Create and fade in the label after the black circle fades in
      setTimeout(() => {
        const label = svg.append('text')
          .attr('class', 'coord-label')
          .attr('x', 253.333333333 + 15) // Adjust the x-coordinate to position the label to the right of the black circle
          .attr('y', 20 + 30) // Adjust the y-coordinate to position the label below the black circle
          .attr('opacity', 0)
          .text('(6.67, 100)');

        label.transition()
          .duration(1000) // Animation duration in milliseconds
          .attr('opacity', 1);
      }, 10000); // 1-second delay
    });
