import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

// Random 2D points with 2 classes (linearly separable mostly)
const DATA_POINTS = [
  // Class 0 (Blue)
  { x: 2, y: 3, class: 0 }, { x: 3, y: 2, class: 0 }, { x: 4, y: 4, class: 0 },
  { x: 3, y: 5, class: 0 }, { x: 1, y: 4, class: 0 }, { x: 5, y: 2, class: 0 },
  { x: 2.5, y: 4.5, class: 0 }, { x: 4.5, y: 1.5, class: 0 },
  
  // Class 1 (Red)
  { x: 6, y: 7, class: 1 }, { x: 7, y: 6, class: 1 }, { x: 8, y: 8, class: 1 },
  { x: 7, y: 9, class: 1 }, { x: 9, y: 6, class: 1 }, { x: 8, y: 5, class: 1 },
  { x: 6.5, y: 5.5, class: 1 }, { x: 5.5, y: 8.5, class: 1 },
  
  // A few borderline points
  { x: 5, y: 5, class: 1 }, { x: 4.5, y: 6, class: 0 }
];

export default function LogisticRegressionViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // We model w1*x + w2*y + b = 0
  // Or: y = -(w1/w2)x - (b/w2)
  const [w1, setW1] = useState(1);
  const [w2, setW2] = useState(1);
  const [b, setB] = useState(-10);

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

    // Compute probability color gradient
    // We will draw a background heatmap
    const defs = svg.append("defs");
    
    // Instead of a full heatmap which can be heavy, we can draw a linear gradient rotated based on weights
    // The vector (w1, w2) is the normal to the decision boundary.
    const angle = Math.atan2(w2, w1) * (180 / Math.PI);
    // atan2 gives standard angle. SVG gradient angle requires mapping.
    
    // A simpler approach for educational purposes is to draw multiple parallel lines or a gradient rect.
    // Let's create an off-screen canvas to render a true probability map (sigmoid)
    const canvas = document.createElement('canvas');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const imageData = ctx.createImageData(innerWidth, innerHeight);
      for (let y = 0; y < innerHeight; y += 4) { // step by 4 for performance
        for (let x = 0; x < innerWidth; x += 4) {
          const dx = xScale.invert(x);
          const dy = yScale.invert(y);
          const z = w1 * dx + w2 * dy + b;
          const p = 1 / (1 + Math.exp(-z));
          
          // Color based on p: 0 is blue, 1 is red
          const r = Math.floor(239 * p + 59 * (1 - p)); // 239,68,68 (red) to 59,130,246 (blue)
          const g = Math.floor(68 * p + 130 * (1 - p));
          const b_c = Math.floor(68 * p + 246 * (1 - p));
          const a = Math.floor(255 * 0.4 * Math.abs(p - 0.5)*2); // Alpha highest at 0 and 1, lowest at 0.5
          
          for (let dy_i = 0; dy_i < 4; dy_i++) {
            for (let dx_i = 0; dx_i < 4; dx_i++) {
              if (y+dy_i >= innerHeight || x+dx_i >= innerWidth) continue;
              const idx = ((y+dy_i) * innerWidth + (x+dx_i)) * 4;
              imageData.data[idx] = r;
              imageData.data[idx+1] = g;
              imageData.data[idx+2] = b_c;
              imageData.data[idx+3] = a;
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
    
    const dataUrl = canvas.toDataURL();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Background probability map
    g.append('image')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('href', dataUrl)
      .attr('preserveAspectRatio', 'none');

    // Axes
    g.append('g')
      .attr('class', 'd3-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .attr('class', 'd3-axis')
      .call(d3.axisLeft(yScale));

    // Decision boundary: w1*x + w2*y + b = 0 => y = -(w1/w2)x - b/w2
    // Find x points where line crosses y=0 and y=10
    // Find y points where line crosses x=0 and x=10
    const points = [];
    if (Math.abs(w2) > 0.01) {
      const yAtX0 = (-b) / w2;
      const yAtX10 = (-10 * w1 - b) / w2;
      if (yAtX0 >= -5 && yAtX0 <= 15) points.push([0, yAtX0]);
      if (yAtX10 >= -5 && yAtX10 <= 15) points.push([10, yAtX10]);
    }
    if (Math.abs(w1) > 0.01) {
      const xAtY0 = (-b) / w1;
      const xAtY10 = (-10 * w2 - b) / w1;
      if (xAtY0 >= 0 && xAtY0 <= 10) points.push([xAtY0, 0]);
      if (xAtY10 >= 0 && xAtY10 <= 10) points.push([xAtY10, 10]);
    }

    if (points.length >= 2) {
      g.append('line')
        .attr('class', 'd3-boundary')
        .attr('x1', xScale(points[0][0]))
        .attr('y1', yScale(points[0][1]))
        .attr('x2', xScale(points[1][0]))
        .attr('y2', yScale(points[1][1]));
    }

    // Data points
    g.selectAll('.d3-point')
      .data(DATA_POINTS)
      .join('circle')
      .attr('class', d => `d3-point d3-point-class-${d.class}`)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 6);

  }, [w1, w2, b]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Logistic Regression</h3>
        <p className="viz-description">
          Adjust the weights (w₁, w₂) and bias (b) to separate the two classes (blue and red).
          The dashed line is the decision boundary (probability = 0.5). 
          The background color intensity shows the confidence of the prediction (sigmoid probability).
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-control-group">
            <label>
              Weight 1 (X₁ axis)
              <span>{w1.toFixed(1)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="-5" max="5" step="0.1" 
              value={w1} onChange={(e) => setW1(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-control-group">
            <label>
              Weight 2 (X₂ axis)
              <span>{w2.toFixed(1)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="-5" max="5" step="0.1" 
              value={w2} onChange={(e) => setW2(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-control-group">
            <label>
              Bias (b)
              <span>{b.toFixed(1)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="-30" max="10" step="0.5" 
              value={b} onChange={(e) => setB(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-stats" style={{ marginTop: 'var(--space-4)' }}>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Equation (z):</span>
              <span className="viz-stat-value" style={{ fontSize: '12px' }}>
                {w1.toFixed(1)}x₁ + {w2.toFixed(1)}x₂ + {b.toFixed(1)} = 0
              </span>
            </div>
            <div className="viz-stat-row" style={{ marginTop: '8px' }}>
              <span className="viz-stat-label" style={{ fontSize: '11px', textAlign: 'center', width: '100%' }}>
                P(y=1) = σ(z) = 1 / (1 + e⁻ᶻ)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
