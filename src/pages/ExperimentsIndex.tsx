// src/pages/ExperimentsIndex.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { experiments } from '../data/experiments';
import { useProgress } from '../context/ProgressContext';
import './Home.css';

const categories = ['All', 'Foundations', 'Regression', 'Classification', 'Dimensionality Reduction', 'Clustering', 'Neural Networks', 'Ensemble Learning'] as const;

export default function ExperimentsIndex() {
  const { getCompletionPercent } = useProgress();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredExperiments = useMemo(() => {
    return experiments.filter(exp => {
      const matchesCat = selectedCategory === 'All' ||
        (selectedCategory === 'Classification' && (exp.category === 'Classification' || exp.category === 'Tree Models' || exp.category === 'Ensemble Learning')) ||
        (selectedCategory === 'Regression' && (exp.category === 'Regression' || exp.category === 'Model Evaluation')) ||
        exp.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesDiff = selectedDifficulty === 'All' || exp.difficulty === selectedDifficulty;

      const q = search.toLowerCase().trim();
      const matchesSearch = !q ||
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        String(exp.number).includes(q);

      return matchesCat && matchesDiff && matchesSearch;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  return (
    <div className="page-layout">
      <main className="page-main">
        <div style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div className="section-label">Curriculum Directory</div>
            <h1 className="section-title">Experiment Explorer</h1>
            <p className="section-description">
              10 structured interactive experiments covering the complete machine learning curriculum.
            </p>

            {/* Filter Toolbar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)',
              background: 'var(--bg-secondary)',
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search by experiment title, concept, or keyword…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search experiments"
                    style={{ paddingLeft: '36px' }}
                  />
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontSize: '14px' }}>
                    🔍
                  </span>
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <select
                    className="form-input"
                    value={selectedDifficulty}
                    onChange={e => setSelectedDifficulty(e.target.value)}
                    style={{ width: 'auto', paddingRight: '28px' }}
                    aria-label="Filter by difficulty"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`glossary-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              <span>Showing {filteredExperiments.length} of 10 experiments</span>
              {(search || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
                <button
                  onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--primary, #2563eb)', cursor: 'pointer', fontWeight: 600 }}
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Grid of Experiments */}
          {filteredExperiments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-12) var(--space-4)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>No experiments match your criteria</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Try broadening your search or resetting category filters.</p>
              <button
                className="btn btn-secondary"
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
                style={{ marginTop: 'var(--space-4)' }}
              >
                Show All 10 Experiments
              </button>
            </div>
          ) : (
            <div className="home-experiments-grid">
              {filteredExperiments.map(exp => {
                const percent = getCompletionPercent(exp.id);
                return (
                  <Link
                    key={exp.id}
                    to={`/experiment/${exp.id}`}
                    className="home-exp-card"
                    style={{ '--exp-accent': exp.accentColor } as React.CSSProperties}
                  >
                    <div className="home-exp-header">
                      <span className="home-exp-number">
                        {String(exp.number).padStart(2, '0')}
                      </span>
                      <div className="home-exp-meta">
                        <span className="badge badge-navy">{exp.category}</span>
                      </div>
                    </div>
                    <h3 className="home-exp-title">{exp.title}</h3>
                    <p className="home-exp-desc">{exp.description}</p>
                    <div className="home-exp-footer">
                      <span className="home-exp-time">⏱ {exp.estimatedTime}</span>
                      <span className="badge badge-navy">{exp.difficulty}</span>
                      {percent > 0 && (
                        <div className="home-exp-progress">
                          <div className="home-exp-progress-fill" style={{ width: `${percent}%` }} />
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
