import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

// 2D data with high covariance
const DATA_POINTS = [
  { x: 2, y: 1.5 }, { x: 3, y: 2.2 }, { x: 3.5, y: 3.8 },
  { x: 4, y: 4.1 }, { x: 5, y: 4.9 }, { x: 5.5, y: 5.2 },
  { x: 6, y: 7.1 }, { x: 7, y: 6.8 }, { x: 8, y: 8.5 }
];

// Precomputed PCA (simplified)
const meanX = 4.88;
const meanY = 4.9;
// Principal component vector (normalized)
const pc1 = { dx: 0.707, dy: 0.707 }; // rough 45 degree line

export default function PCAViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [projectionState, setProjectionState] = useState(0); // 0 = original, 1 = projected onto PC1

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

    // PC1 Line (passing through mean)
    // equation: (x - meanX)/pc1.dx = (y - meanY)/pc1.dy
    // since pc1.dx == pc1.dy == 0.707, y - meanY = x - meanX => y = x - meanX + meanY
    g.append('line')
      .attr('class', 'd3-boundary') // reuse dashed line style
      .attr('stroke', '#10b981') // Green for PC1
      .attr('x1', xScale(0))
      .attr('y1', yScale(0 - meanX + meanY))
      .attr('x2', xScale(10))
      .attr('y2', yScale(10 - meanX + meanY));
      
    // Calculate projections
    const projectedPoints = DATA_POINTS.map(p => {
      // Dot product to project (p.x - meanX, p.y - meanY) onto pc1
      const dot = (p.x - meanX) * pc1.dx + (p.y - meanY) * pc1.dy;
      const projX = meanX + dot * pc1.dx;
      const projY = meanY + dot * pc1.dy;
      return {
        ...p,
        currX: p.x + (projX - p.x) * projectionState,
        currY: p.y + (projY - p.y) * projectionState,
        projX, projY
      };
    });

    // Draw projection paths
    if (projectionState > 0 && projectionState < 1) {
      g.selectAll('.d3-residual')
        .data(projectedPoints)
        .join('line')
        .attr('class', 'd3-residual')
        .attr('stroke', '#94a3b8')
        .attr('x1', d => xScale(d.x))
        .attr('y1', d => yScale(d.y))
        .attr('x2', d => xScale(d.currX))
        .attr('y2', d => yScale(d.currY));
    }

    g.selectAll('.d3-point')
      .data(projectedPoints)
      .join('circle')
      .attr('class', 'd3-point')
      .attr('fill', '#3b82f6')
      .attr('cx', d => xScale(d.currX))
      .attr('cy', d => yScale(d.currY))
      .attr('r', 5);

  }, [projectionState]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Principal Component Analysis (PCA)</h3>
        <p className="viz-description">
          The green dashed line represents the First Principal Component (PC1), which captures the maximum variance in the data.
          Use the slider to project the 2D points onto this 1D line, demonstrating dimensionality reduction.
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-control-group">
            <label>
              Projection Level
              <span>{Math.round(projectionState * 100)}%</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="0" max="1" step="0.01" 
              value={projectionState} 
              onChange={(e) => setProjectionState(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-stats" style={{ marginTop: 'var(--space-4)' }}>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Explained Variance (PC1):</span>
              <span className="viz-stat-value">~98.5%</span>
            </div>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Dimensions:</span>
              <span className="viz-stat-value">
                {projectionState === 1 ? '1D (Projected)' : '2D (Original)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
