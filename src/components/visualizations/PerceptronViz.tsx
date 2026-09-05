import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

// Logical OR dataset
const DATA_POINTS = [
  { x: 0, y: 0, class: 0 },
  { x: 0, y: 1, class: 1 },
  { x: 1, y: 0, class: 1 },
  { x: 1, y: 1, class: 1 }
];

export default function PerceptronViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Weights: w1*x + w2*y + b = 0
  const [w1, setW1] = useState(0.2);
  const [w2, setW2] = useState(-0.5);
  const [b, setB] = useState(-0.1);
  const [learningRate] = useState(0.1);
  const [iteration, setIteration] = useState(0);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [statusMsg, setStatusMsg] = useState("Click 'Step Learning' to process the first point.");

  const handleStep = useCallback(() => {
    const p = DATA_POINTS[currentPointIndex];
    
    // Prediction calculation
    const z = w1 * p.x + w2 * p.y + b;
    const yHat = z >= 0 ? 1 : 0;
    const error = p.class - yHat;

    if (error !== 0) {
      // Weight update rule: w = w + lr * error * x
      const newW1 = w1 + learningRate * error * p.x;
      const newW2 = w2 + learningRate * error * p.y;
      const newB = b + learningRate * error;
      setW1(newW1);
      setW2(newW2);
      setB(newB);
      setStatusMsg(`Point (${p.x}, ${p.y}) misclassified! Error = ${error}. Weights updated.`);
    } else {
      setStatusMsg(`Point (${p.x}, ${p.y}) classified correctly. No update.`);
    }

    // Move to next point
    setCurrentPointIndex((prev) => (prev + 1) % DATA_POINTS.length);
    if (currentPointIndex === DATA_POINTS.length - 1) {
      setIteration((prev) => prev + 1);
    }
  }, [currentPointIndex, w1, w2, b, learningRate]);

  const handleReset = () => {
    setW1(0.2);
    setW2(-0.5);
    setB(-0.1);
    setIteration(0);
    setCurrentPointIndex(0);
    setStatusMsg("Simulation reset. Initial random weights set.");
  };

  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3.scaleLinear().domain([-0.5, 1.5]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([-0.5, 1.5]).range([innerHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'd3-axis')
      .attr('transform', `translate(0,${yScale(0)})`) // put x axis at y=0
      .call(d3.axisBottom(xScale).ticks(5));

    g.append('g')
      .attr('class', 'd3-axis')
      .attr('transform', `translate(${xScale(0)},0)`) // put y axis at x=0
      .call(d3.axisLeft(yScale).ticks(5));

    // Decision boundary: w1*x + w2*y + b = 0  => y = -(w1/w2)x - (b/w2)
    const points = [];
    if (Math.abs(w2) > 0.001) {
      const yAtX_neg = -(w1 * -1 + b) / w2;
      const yAtX_pos = -(w1 * 2 + b) / w2;
      points.push([-1, yAtX_neg]);
      points.push([2, yAtX_pos]);
    } else if (Math.abs(w1) > 0.001) {
      // vertical line
      const xVal = -b / w1;
      points.push([xVal, -1]);
      points.push([xVal, 2]);
    }

    if (points.length >= 2) {
      g.append('line')
        .attr('class', 'd3-boundary')
        .attr('x1', xScale(points[0][0]))
        .attr('y1', yScale(points[0][1]))
        .attr('x2', xScale(points[1][0]))
        .attr('y2', yScale(points[1][1]))
        .style('transition', 'all 0.3s');
      
      // Shade the positive region (z >= 0)
      // Since it's a line, we can just draw a large polygon if needed, but for simplicity, we'll just show the line.
    }

    // Highlight current point
    g.append('circle')
      .attr('cx', xScale(DATA_POINTS[currentPointIndex].x))
      .attr('cy', yScale(DATA_POINTS[currentPointIndex].y))
      .attr('r', 12)
      .attr('fill', 'none')
      .attr('stroke', 'var(--accent-text)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4')
      .style('transition', 'all 0.3s');

    // Data points
    g.selectAll('.d3-point')
      .data(DATA_POINTS)
      .join('circle')
      .attr('class', d => `d3-point d3-point-class-${d.class}`)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 6);

  }, [w1, w2, b, currentPointIndex]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Perceptron Learning (Logical OR)</h3>
        <p className="viz-description">
          The Perceptron is iterating through the data points (highlighted). If a point is misclassified, the weights update to rotate/shift the boundary.
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-stats" style={{ marginBottom: 'var(--space-4)' }}>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Epoch:</span>
              <span className="viz-stat-value">{iteration}</span>
            </div>
            <div className="viz-stat-row">
              <span className="viz-stat-label">w₁:</span>
              <span className="viz-stat-value">{w1.toFixed(3)}</span>
            </div>
            <div className="viz-stat-row">
              <span className="viz-stat-label">w₂:</span>
              <span className="viz-stat-value">{w2.toFixed(3)}</span>
            </div>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Bias (b):</span>
              <span className="viz-stat-value">{b.toFixed(3)}</span>
            </div>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)', minHeight: '40px' }}>
            {statusMsg}
          </p>

          <button className="viz-btn" onClick={handleStep}>
            Step Learning
          </button>
          
          <button className="viz-btn" onClick={handleReset} style={{ marginTop: 'var(--space-2)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-secondary)' }}>
            Reset Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
