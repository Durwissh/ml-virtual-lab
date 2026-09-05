import React, { useState, useEffect } from 'react';
import './Visualizations.css';

export default function RandomForestViz() {
  const [phase, setPhase] = useState<'input' | 'predicting' | 'voting' | 'result'>('input');
  const [predictions, setPredictions] = useState<string[]>([]);
  
  // Dummy data for a new point
  const newPoint = { x1: 4.2, x2: 1.8 };

  const handlePredict = () => {
    if (phase === 'input') {
      setPhase('predicting');
      setTimeout(() => {
        setPredictions(['Red', 'Blue', 'Red']);
        setPhase('voting');
        setTimeout(() => {
          setPhase('result');
        }, 1500);
      }, 1500);
    }
  };

  const handleReset = () => {
    setPhase('input');
    setPredictions([]);
  };

  return (
    <div className="viz-container">
      <div className="viz-header">
        <h3 className="viz-title">Interactive Random Forest Classification</h3>
        <p className="viz-description">
          A Random Forest builds multiple decision trees on random subsets of the data. 
          When classifying a new data point, it feeds the point into <em>all</em> trees simultaneously. 
          Each tree makes an individual prediction, and the forest outputs the class with the <strong>majority vote</strong>.
        </p>
      </div>

      <div className="viz-layout" style={{ flexDirection: 'column', alignItems: 'center', background: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
        
        {/* INPUT STAGE */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'inline-block', padding: 'var(--space-3) var(--space-6)', background: 'var(--card-bg)', border: '2px solid var(--border-primary)', borderRadius: 'var(--radius-full)', fontWeight: 'bold' }}>
            New Data Point: [x₁=4.2, x₂=1.8]
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <button 
              className="viz-btn" 
              onClick={handlePredict} 
              disabled={phase !== 'input'}
              style={{ opacity: phase !== 'input' ? 0.5 : 1 }}
            >
              Feed into Forest ↓
            </button>
            {phase === 'result' && (
              <button className="viz-btn" onClick={handleReset} style={{ marginLeft: 'var(--space-2)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-secondary)' }}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* TREES STAGE */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', width: '100%', marginBottom: 'var(--space-8)' }}>
          {[1, 2, 3].map((treeNum) => (
            <div key={treeNum} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: phase === 'input' ? 0.5 : 1, transition: 'opacity 0.5s' }}>
              <div style={{ fontSize: '24px', marginBottom: 'var(--space-2)' }}>🌳</div>
              <div style={{ fontWeight: '600', marginBottom: 'var(--space-4)' }}>Tree {treeNum}</div>
              
              {/* Prediction Output */}
              <div style={{ 
                height: '40px', 
                width: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: phase === 'input' || phase === 'predicting' ? 'var(--bg-tertiary)' : (predictions[treeNum-1] === 'Red' ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)'),
                border: `2px solid ${phase === 'input' || phase === 'predicting' ? 'var(--border-primary)' : (predictions[treeNum-1] === 'Red' ? '#ef4444' : '#3b82f6')}`,
                borderRadius: 'var(--radius-md)',
                fontWeight: 'bold',
                color: phase === 'input' || phase === 'predicting' ? 'var(--text-muted)' : (predictions[treeNum-1] === 'Red' ? '#ef4444' : '#3b82f6'),
                opacity: phase === 'input' || phase === 'predicting' ? 0 : 1,
                transform: phase === 'input' || phase === 'predicting' ? 'translateY(-10px)' : 'translateY(0)',
                transition: 'all 0.5s ease'
              }}>
                {phase === 'input' || phase === 'predicting' ? '...' : predictions[treeNum-1]}
              </div>
            </div>
          ))}
        </div>

        {/* MAJORITY VOTE & FINAL OUTPUT */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          opacity: phase === 'result' ? 1 : 0,
          transform: phase === 'result' ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.8s ease',
          background: 'var(--card-bg)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--accent-text)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
            Majority Vote
          </div>
          <div style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
            2 Red vs 1 Blue
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontWeight: 'bold' }}>Final Prediction:</span>
            <span style={{ 
              padding: 'var(--space-2) var(--space-4)', 
              background: '#ef4444', 
              color: 'white', 
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold'
            }}>
              RED
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
