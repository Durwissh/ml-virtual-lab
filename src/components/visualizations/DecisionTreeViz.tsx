import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Visualizations.css';

// Simple Decision Tree Logic for an Iris-like dataset
// Features: x1 (petal length), x2 (petal width)
// Classes: Red, Blue

export default function DecisionTreeViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // A small sample point to classify
  const [x1, setX1] = useState(2.5);
  const [x2, setX2] = useState(1.0);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = 500;
    const height = 400;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const g = svg.append('g').attr('transform', 'translate(0, 20)');

    // Manual tree layout
    const nodes = [
      { id: 1, label: "x1 <= 3.0", x: 250, y: 30, isLeaf: false, condition: (x1: number, x2: number) => x1 <= 3.0 },
      { id: 2, label: "Class: Blue", x: 150, y: 150, isLeaf: true, class: 'Blue', parent: 1 },
      { id: 3, label: "x2 <= 1.5", x: 350, y: 150, isLeaf: false, condition: (x1: number, x2: number) => x2 <= 1.5, parent: 1 },
      { id: 4, label: "Class: Blue", x: 250, y: 270, isLeaf: true, class: 'Blue', parent: 3 },
      { id: 5, label: "Class: Red", x: 450, y: 270, isLeaf: true, class: 'Red', parent: 3 },
    ];
    
    const links = [
      { source: nodes[0], target: nodes[1], label: "True" },
      { source: nodes[0], target: nodes[2], label: "False" },
      { source: nodes[2], target: nodes[3], label: "True" },
      { source: nodes[2], target: nodes[4], label: "False" },
    ];

    // Determine active path based on current x1, x2
    let activeNodes = [1];
    let activeLinks = [];
    if (nodes[0].condition && nodes[0].condition(x1, x2)) {
      activeNodes.push(2);
      activeLinks.push("1-2");
    } else {
      activeNodes.push(3);
      activeLinks.push("1-3");
      if (nodes[2].condition && nodes[2].condition(x1, x2)) {
        activeNodes.push(4);
        activeLinks.push("3-4");
      } else {
        activeNodes.push(5);
        activeLinks.push("3-5");
      }
    }

    // Draw Links
    g.selectAll('line.link')
      .data(links)
      .join('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y + 20)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y - 20)
      .attr('stroke', d => activeLinks.includes(`${d.source.id}-${d.target.id}`) ? 'var(--accent-text)' : 'var(--border-secondary)')
      .attr('stroke-width', d => activeLinks.includes(`${d.source.id}-${d.target.id}`) ? 3 : 2)
      .attr('stroke-dasharray', d => activeLinks.includes(`${d.source.id}-${d.target.id}`) ? '0' : '4');
      
    // Draw Link Labels
    g.selectAll('text.link-label')
      .data(links)
      .join('text')
      .attr('class', 'link-label')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .attr('dy', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', '12px')
      .text(d => d.label);

    // Draw Nodes
    const nodeGroups = g.selectAll('g.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeGroups.append('rect')
      .attr('x', -60)
      .attr('y', -20)
      .attr('width', 120)
      .attr('height', 40)
      .attr('rx', d => d.isLeaf ? 20 : 5)
      .attr('fill', d => {
        if (!activeNodes.includes(d.id)) return 'var(--bg-secondary)';
        if (d.isLeaf) return d.class === 'Blue' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        return 'var(--accent-subtle)';
      })
      .attr('stroke', d => {
        if (!activeNodes.includes(d.id)) return 'var(--border-primary)';
        if (d.isLeaf) return d.class === 'Blue' ? '#3b82f6' : '#ef4444';
        return 'var(--accent-text)';
      })
      .attr('stroke-width', 2);

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', d => activeNodes.includes(d.id) ? 'var(--text-primary)' : 'var(--text-muted)')
      .attr('font-size', '14px')
      .attr('font-weight', d => activeNodes.includes(d.id) ? 'bold' : 'normal')
      .text(d => d.label);

  }, [x1, x2]);

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Decision Tree</h3>
        <p className="viz-description">
          Adjust the feature values below to see how a new data point propagates through the tree logic. 
          At each internal node, the data point is evaluated against a threshold rule, leading it down to a final classification leaf.
        </p>
      </div>

      <div className="viz-layout">
        <div className="viz-svg-container">
          <svg ref={svgRef} width="100%" height="400" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="viz-controls">
          <div className="viz-control-group">
            <label>
              Feature 1 (x₁)
              <span>{x1.toFixed(1)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="0" max="6" step="0.1" 
              value={x1} 
              onChange={(e) => setX1(parseFloat(e.target.value))}
            />
          </div>

          <div className="viz-control-group">
            <label>
              Feature 2 (x₂)
              <span>{x2.toFixed(1)}</span>
            </label>
            <input 
              type="range" 
              className="viz-slider" 
              min="0" max="3" step="0.1" 
              value={x2} 
              onChange={(e) => setX2(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="viz-stats" style={{ marginTop: 'var(--space-4)' }}>
             <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
               <strong>Test Point:</strong> [x₁={x1.toFixed(1)}, x₂={x2.toFixed(1)}]
             </p>
             <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
               Follow the highlighted path to see the predicted class.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
