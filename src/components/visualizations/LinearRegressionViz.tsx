import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

const DATA_POINTS = [
  { x: 1, y: 2.1 },
  { x: 2, y: 2.8 },
  { x: 3, y: 3.6 },
  { x: 4, y: 4.5 },
  { x: 5, y: 5.1 },
  { x: 6, y: 5.8 },
  { x: 7, y: 6.9 },
  { x: 8, y: 8.2 },
  { x: 9, y: 8.8 }
];

export default function LinearRegressionViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Initial parameters
  const [slope, setSlope] = useState(0.5);
  const [intercept, setIntercept] = useState(1.0);
  const [mse, setMse] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Set up dimensions
    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous SVG contents on re-render
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis
    g.append('g')
      .attr('class', 'd3-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Add Y axis
    g.append('g')
      .attr('class', 'd3-axis')
      .call(d3.axisLeft(yScale));

    // Add Grid lines
    g.append('g')
      .attr('class', 'd3-grid')
      .selectAll('line.horizontal')
      .data(yScale.ticks())
      .join('line')
      .attr('class', 'horizontal')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d));

    g.append('g')
      .attr('class', 'd3-grid')
      .selectAll('line.vertical')
      .data(xScale.ticks())
      .join('line')
      .attr('class', 'vertical')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', innerHeight);

    // Calculate predictions and errors
    let totalErrorSq = 0;
    const pointsData = DATA_POINTS.map(p => {
      const predY = slope * p.x + intercept;
      const err = p.y - predY;
      totalErrorSq += err * err;
      return { ...p, predY };
    });
    
    setMse(totalErrorSq / DATA_POINTS.length);

    // Draw Residuals (Lines)
    g.selectAll('.d3-residual')
      .data(pointsData)
      .join('line')
      .attr('class', 'd3-residual')
      .attr('x1', d => xScale(d.x))
      .attr('x2', d => xScale(d.x))
      .attr('y1', d => yScale(d.y))
      .attr('y2', d => yScale(d.predY));

    // Draw Regression Line
    g.append('line')
      .attr('class', 'd3-line')
      .attr('x1', xScale(0))
      .attr('y1', yScale(intercept))
      .attr('x2', xScale(10))
      .attr('y2', yScale(slope * 10 + intercept));

    // Draw Data Points
    g.selectAll('.d3-point')
      .data(pointsData)
      .join('circle')
      .attr('class', 'd3-point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5);

  }, [slope, intercept]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Linear Regression</h3>
        <p className="viz-description">
          Adjust the slope (weight) and intercept (bias) to fit the line to the data points.
          The red dashed lines represent the residuals (errors). Notice how changing the line affects the Mean Squared Error (MSE).
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-control-group">
            <label>
              Slope (m)
              <span>{slope.toFixed(2)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="-2" 
              max="3" 
              step="0.05" 
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-control-group">
            <label>
              Intercept (c)
              <span>{intercept.toFixed(2)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="-5" 
              max="10" 
              step="0.1" 
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-stats" style={{ marginTop: 'var(--space-4)' }}>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Equation:</span>
              <span className="viz-stat-value">y = {slope.toFixed(2)}x + {intercept.toFixed(2)}</span>
            </div>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Mean Squared Error:</span>
              <span className="viz-stat-value">{mse.toFixed(3)}</span>
            </div>
            <div className="viz-stat-row">
              <span className="viz-stat-label">RMSE:</span>
              <span className="viz-stat-value">{Math.sqrt(mse).toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
