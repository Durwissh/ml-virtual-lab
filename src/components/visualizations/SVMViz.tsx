import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

const DATA_POINTS = [
  // Class 0 (Blue) - bottom left
  { x: 1, y: 3, class: 0 }, { x: 2, y: 2, class: 0 }, { x: 3, y: 4, class: 0 },
  { x: 2.5, y: 5, class: 0 }, { x: 1.5, y: 4.5, class: 0 },
  // Class 1 (Red) - top right
  { x: 6, y: 7, class: 1 }, { x: 7, y: 6, class: 1 }, { x: 8, y: 9, class: 1 },
  { x: 7.5, y: 8, class: 1 }, { x: 8.5, y: 7, class: 1 },
  // Support Vectors (on the margin)
  { x: 4, y: 5, class: 0, sv: true },
  { x: 5, y: 6, class: 1, sv: true }
];

export default function SVMViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Interactive variables
  const [angle, setAngle] = useState(45); // angle of normal vector
  const [marginWidth, setMarginWidth] = useState(1.5);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'd3-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .attr('class', 'd3-axis')
      .call(d3.axisLeft(yScale));

    // Decision boundary goes through (4.5, 5.5) mostly
    const midX = 4.5;
    const midY = 5.5;
    
    // Normal vector
    const rad = angle * (Math.PI / 180);
    const nx = Math.cos(rad);
    const ny = Math.sin(rad);
    
    // Boundary line perpendicular to normal
    // nx*(x - midX) + ny*(y - midY) = 0
    const drawLine = (offset: number, className: string, stroke: string) => {
      // nx*(x - midX) + ny*(y - midY) = offset
      // y = midY + (offset - nx*(x - midX)) / ny
      
      let x1 = 0;
      let y1 = midY + (offset - nx*(x1 - midX)) / ny;
      let x2 = 10;
      let y2 = midY + (offset - nx*(x2 - midX)) / ny;
      
      if (Math.abs(ny) < 0.01) { // vertical line
        x1 = midX + offset / nx;
        y1 = 0;
        x2 = midX + offset / nx;
        y2 = 10;
      }
      
      g.append('line')
        .attr('class', className)
        .attr('stroke', stroke)
        .attr('x1', xScale(x1))
        .attr('y1', yScale(y1))
        .attr('x2', xScale(x2))
        .attr('y2', yScale(y2));
    };

    // Draw Margins (offset = marginWidth and -marginWidth)
    drawLine(marginWidth, 'd3-boundary', '#94a3b8'); // positive margin
    drawLine(-marginWidth, 'd3-boundary', '#94a3b8'); // negative margin
    
    // Draw Hyperplane
    drawLine(0, 'd3-line', 'var(--text-primary)');

    // Support Vector Highlights
    g.selectAll('.sv-highlight')
      .data(DATA_POINTS.filter(d => d.sv))
      .join('circle')
      .attr('class', 'sv-highlight')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 10)
      .attr('fill', 'none')
      .attr('stroke', 'var(--accent-text)')
      .attr('stroke-width', 2);

    g.selectAll('.d3-point')
      .data(DATA_POINTS)
      .join('circle')
      .attr('class', d => `d3-point d3-point-class-${d.class}`)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5);

  }, [angle, marginWidth]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Support Vector Machine (SVM)</h3>
        <p className="viz-description">
          The solid line is the maximum-margin hyperplane. The dashed lines are the margins.
          Points highlighted with a circle are the <strong>Support Vectors</strong>, which are the closest points defining the margin.
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-control-group">
            <label>
              Hyperplane Angle
              <span>{angle}°</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="0" max="90" step="1" 
              value={angle} 
              onChange={(e) => setAngle(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-control-group">
            <label>
              Margin Width (Soft/Hard Margin)
              <span>{marginWidth.toFixed(1)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="0.5" max="3" step="0.1" 
              value={marginWidth} 
              onChange={(e) => setMarginWidth(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="viz-stats" style={{ marginTop: 'var(--space-4)' }}>
             <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
               In a real SVM, the margin width and angle are learned automatically to maximize the gap between classes while minimizing classification errors (controlled by hyperparameter C).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
