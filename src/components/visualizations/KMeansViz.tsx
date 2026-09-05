import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

// Random points grouped roughly into 3 clusters
const INITIAL_POINTS = [
  // Cluster 1
  { id: 1, x: 2, y: 2 }, { id: 2, x: 2.5, y: 2.5 }, { id: 3, x: 1.5, y: 3 },
  { id: 4, x: 3, y: 2 }, { id: 5, x: 2, y: 1.5 },
  // Cluster 2
  { id: 6, x: 7, y: 8 }, { id: 7, x: 8, y: 7.5 }, { id: 8, x: 7.5, y: 9 },
  { id: 9, x: 8.5, y: 8 }, { id: 10, x: 6.5, y: 8.5 },
  // Cluster 3
  { id: 11, x: 8, y: 2 }, { id: 12, x: 7.5, y: 3 }, { id: 13, x: 8.5, y: 2.5 },
  { id: 14, x: 9, y: 3.5 }, { id: 15, x: 7, y: 2.5 }
];

const COLORS = ['#ef4444', '#3b82f6', '#10b981']; // Red, Blue, Green

export default function KMeansViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const [points, setPoints] = useState(INITIAL_POINTS.map(p => ({ ...p, cluster: -1 })));
  const [centroids, setCentroids] = useState([
    { id: 0, x: 5, y: 5 }, // Red
    { id: 1, x: 6, y: 6 }, // Blue
    { id: 2, x: 4, y: 6 }  // Green
  ]);
  const [iteration, setIteration] = useState(0);
  const [phase, setPhase] = useState<'assign' | 'update'>('assign');

  const handleStep = useCallback(() => {
    if (phase === 'assign') {
      // Step 1: Assign points to nearest centroid
      const newPoints = points.map(p => {
        let minDist = Infinity;
        let cluster = -1;
        centroids.forEach((c, idx) => {
          const dist = Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
          if (dist < minDist) {
            minDist = dist;
            cluster = idx;
          }
        });
        return { ...p, cluster };
      });
      setPoints(newPoints);
      setPhase('update');
    } else {
      // Step 2: Update centroids to mean of assigned points
      const newCentroids = centroids.map((c, idx) => {
        const clusterPoints = points.filter(p => p.cluster === idx);
        if (clusterPoints.length === 0) return c; // no points assigned, don't move
        const sumX = clusterPoints.reduce((acc, p) => acc + p.x, 0);
        const sumY = clusterPoints.reduce((acc, p) => acc + p.y, 0);
        return { ...c, x: sumX / clusterPoints.length, y: sumY / clusterPoints.length };
      });
      setCentroids(newCentroids);
      setIteration(i => i + 1);
      setPhase('assign');
    }
  }, [phase, points, centroids]);

  const handleReset = () => {
    setPoints(INITIAL_POINTS.map(p => ({ ...p, cluster: -1 })));
    setCentroids([
      { id: 0, x: 5, y: 5 },
      { id: 1, x: 6, y: 6 },
      { id: 2, x: 4, y: 6 }
    ]);
    setIteration(0);
    setPhase('assign');
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

    // Draw lines from points to assigned centroid if phase is 'update' (meaning points were just assigned)
    if (phase === 'update') {
      g.selectAll('.assignment-line')
        .data(points.filter(p => p.cluster !== -1))
        .join('line')
        .attr('class', 'assignment-line d3-residual')
        .attr('stroke', d => COLORS[d.cluster])
        .attr('stroke-opacity', 0.5)
        .attr('x1', d => xScale(d.x))
        .attr('y1', d => yScale(d.y))
        .attr('x2', d => xScale(centroids[d.cluster].x))
        .attr('y2', d => yScale(centroids[d.cluster].y));
    }

    // Draw Data Points
    g.selectAll('.d3-point')
      .data(points)
      .join('circle')
      .attr('class', 'd3-point')
      .attr('fill', d => d.cluster === -1 ? '#94a3b8' : COLORS[d.cluster])
      .attr('stroke', '#fff')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 6);

    // Draw Centroids (stars/crosses)
    g.selectAll('.d3-centroid')
      .data(centroids)
      .join('rect')
      .attr('class', 'd3-centroid')
      .attr('fill', (d, i) => COLORS[i])
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('x', d => xScale(d.x) - 8)
      .attr('y', d => yScale(d.y) - 8)
      .attr('width', 16)
      .attr('height', 16)
      .style('transition', 'all 0.5s ease');

  }, [points, centroids, phase]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive K-Means Clustering</h3>
        <p className="viz-description">
          Step through the K-Means algorithm manually. First, points are <strong>assigned</strong> to the nearest centroid. 
          Then, centroids <strong>move</strong> to the mean (center of mass) of their assigned points. Notice how it converges.
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-stats" style={{ marginBottom: 'var(--space-4)' }}>
            <div className="viz-stat-row">
              <span className="viz-stat-label">Iteration:</span>
              <span className="viz-stat-value">{iteration}</span>
            </div>
            <div className="viz-stat-row" style={{ marginTop: '8px' }}>
              <span className="viz-stat-label">Next Step:</span>
              <span className="viz-stat-value" style={{ color: 'var(--text-primary)' }}>
                {phase === 'assign' ? '1. Assign Points' : '2. Move Centroids'}
              </span>
            </div>
          </div>

          <button className="viz-btn" onClick={handleStep}>
            {phase === 'assign' ? 'Assign Points' : 'Update Centroids'}
          </button>
          
          <button className="viz-btn" onClick={handleReset} style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-secondary)' }}>
            Reset Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
