// src/pages/ExperimentPage.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { experiments, getExperiment } from '../data/experiments';
import { getExperimentContent } from '../data';
import { useProgress } from '../context/ProgressContext';
import PythonBlock from '../components/PythonBlock';
import FormulaCard from '../components/FormulaCard';
import Quiz from '../components/Quiz';
import ExperimentUtilities from '../components/ExperimentUtilities';

// Visualizations
import LinearRegressionViz from '../components/visualizations/LinearRegressionViz';
import LogisticRegressionViz from '../components/visualizations/LogisticRegressionViz';
import PCAViz from '../components/visualizations/PCAViz';
import SVMViz from '../components/visualizations/SVMViz';
import KMeansViz from '../components/visualizations/KMeansViz';
import DecisionTreeViz from '../components/visualizations/DecisionTreeViz';
import RandomForestViz from '../components/visualizations/RandomForestViz';
import PerceptronViz from '../components/visualizations/PerceptronViz';

import './ExperimentPage.css';

type SectionKey = 'aim' | 'theory' | 'pretest' | 'procedure' | 'results' | 'posttest';

const sections: { key: SectionKey; label: string; number: string }[] = [
  { key: 'aim', label: 'Aim', number: '01' },
  { key: 'theory', label: 'Theory', number: '02' },
  { key: 'pretest', label: 'Pre-Test', number: '03' },
  { key: 'procedure', label: 'Procedure', number: '04' },
  { key: 'results', label: 'Results & Analysis', number: '05' },
  { key: 'posttest', label: 'Post-Test', number: '06' },
];

const renderVisualization = (vizId: string) => {
  switch (vizId) {
    case 'linear-regression': return <LinearRegressionViz />;
    case 'logistic-regression': return <LogisticRegressionViz />;
    case 'pca': return <PCAViz />;
    case 'svm': return <SVMViz />;
    case 'kmeans': return <KMeansViz />;
    case 'decision-tree': return <DecisionTreeViz />;
    case 'random-forest': return <RandomForestViz />;
    case 'perceptron': return <PerceptronViz />;
    default: return null;
  }
};

export default function ExperimentPage() {
  const { id } = useParams<{ id: string }>();
  const expMeta = getExperiment(id || '');
  const content = getExperimentContent(id || '');
  const {
    getExperimentProgress,
    markSectionComplete,
    setLastVisited,
    saveProcedureStep,
    getProcedureSteps,
    getCompletionPercent,
  } = useProgress();

  const [activeSection, setActiveSection] = useState<SectionKey>('aim');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const progress = getExperimentProgress(id || '1');
  const currentNum = expMeta?.number || 0;
  const prevExp = experiments.find(e => e.number === currentNum - 1);
  const nextExp = experiments.find(e => e.number === currentNum + 1);
  const completionPct = getCompletionPercent(id || '1');

  useEffect(() => {
    if (id && expMeta) {
      setLastVisited(id, activeSection);
    }
    window.scrollTo(0, 0);
  }, [id, activeSection, setLastVisited, expMeta]);

  const scrollToSection = useCallback((key: SectionKey) => {
    setActiveSection(key);
    const el = sectionRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleMarkComplete = useCallback((section: SectionKey) => {
    markSectionComplete(id || '1', section);
  }, [id, markSectionComplete]);

  // If experiment ID is invalid or content is not found
  if (!expMeta || !content) {
    return (
      <div className="page-layout">
        <main className="page-main" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            maxWidth: '540px',
            width: '100%',
            textAlign: 'center',
            padding: 'var(--space-8)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              color: 'var(--primary, #1e3a8a)',
              marginBottom: 'var(--space-2)',
            }}>
              Experiment Not Found
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              Experiment "{id}" is not a valid curriculum module. The SRM Machine Learning laboratory includes Experiments 01 through 10.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
              <Link to="/experiments" className="btn btn-primary">
                View All 10 Experiments
              </Link>
              <Link to="/" className="btn btn-secondary">
                Return Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const procedureSteps = getProcedureSteps(id || '1', content.procedure.steps.length);

  return (
    <div className="exp-layout">
      {/* ─── Sidebar ─── */}
      <aside className="exp-sidebar" aria-label="Experiment sections">
        <div className="exp-sidebar-header">
          <div className="exp-sidebar-number">{String(expMeta.number).padStart(2, '0')}</div>
          <div>
            <div className="exp-sidebar-title">{expMeta.shortTitle}</div>
            <div className="exp-sidebar-badge-row">
              <span className="badge badge-navy">{completionPct}% Complete</span>
            </div>
          </div>
        </div>
        <ul className="exp-sidebar-nav">
          {sections.map(s => {
            const isActive = activeSection === s.key;
            const isComplete = progress[s.key];
            return (
              <li key={s.key} className="exp-sidebar-item">
                <button
                  className={`exp-sidebar-link${isActive ? ' exp-sidebar-link--active' : ''}${isComplete ? ' exp-sidebar-link--completed' : ''}`}
                  onClick={() => scrollToSection(s.key)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="exp-sidebar-step-num">
                    {isComplete ? '✓' : s.number}
                  </span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Sidebar Previous/Next Quick Nav */}
        <div className="exp-sidebar-nav-footer">
          {prevExp ? (
            <Link to={`/experiment/${prevExp.id}`} className="exp-sidebar-footer-link" title={`Exp ${prevExp.number}: ${prevExp.shortTitle}`}>
              ← Exp {String(prevExp.number).padStart(2, '0')}
            </Link>
          ) : (
            <span className="exp-sidebar-footer-disabled">First Exp</span>
          )}
          {nextExp ? (
            <Link to={`/experiment/${nextExp.id}`} className="exp-sidebar-footer-link" title={`Exp ${nextExp.number}: ${nextExp.shortTitle}`}>
              Exp {String(nextExp.number).padStart(2, '0')} →
            </Link>
          ) : (
            <span className="exp-sidebar-footer-disabled">Last Exp</span>
          )}
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="exp-main">
        <div className="exp-content">
          {/* Breadcrumb & Utilities Toolbar */}
          <div className="exp-top-toolbar">
            <nav className="exp-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="exp-breadcrumb-sep">/</span>
              <Link to="/experiments">Experiments</Link>
              <span className="exp-breadcrumb-sep">/</span>
              <span>Experiment {String(expMeta.number).padStart(2, '0')}</span>
            </nav>
            <ExperimentUtilities
              experimentId={id || '1'}
              experimentTitle={expMeta.title}
            />
          </div>

          <h1 className="exp-main-title">
            {String(expMeta.number).padStart(2, '0')}. {expMeta.title}
          </h1>

          {/* Compact Mobile Section Tabs */}
          <div className="exp-mobile-section-tabs" role="tablist" aria-label="Experiment Sections">
            {sections.map(s => {
              const isActive = activeSection === s.key;
              const isComplete = progress[s.key];
              return (
                <button
                  key={s.key}
                  className={`exp-mobile-tab ${isActive ? 'active' : ''} ${isComplete ? 'done' : ''}`}
                  onClick={() => scrollToSection(s.key)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {isComplete ? '✓ ' : ''}{s.label}
                </button>
              );
            })}
          </div>

          {/* ═══ AIM ═══ */}
          <section
            className="exp-section"
            ref={el => { sectionRefs.current.aim = el; }}
            id="aim"
          >
            <div className="exp-section-header">
              <div>
                <div className="exp-section-label">Section 01</div>
                <h2 className="exp-section-title">Aim</h2>
              </div>
              {!progress.aim ? (
                <button className="btn btn-ghost btn-sm exp-mark-complete" onClick={() => handleMarkComplete('aim')}>
                  Mark Complete
                </button>
              ) : (
                <span className="badge badge-navy">✓ Completed</span>
              )}
            </div>
            <div className="exp-aim-card">
              <p className="exp-aim-text">{content.aim}</p>
              <div className="exp-aim-objectives">
                <h4>Learning Objectives</h4>
                <ul>
                  {content.learningObjectives.map((obj: string, i: number) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
              <div className="exp-aim-meta">
                <span className="exp-aim-meta-item">⏱ {expMeta.estimatedTime}</span>
                <span className="exp-aim-meta-item">📊 {expMeta.difficulty}</span>
                <span className="exp-aim-meta-item">📁 {expMeta.category}</span>
              </div>
            </div>
          </section>

          {/* ═══ THEORY ═══ */}
          <section
            className="exp-section"
            ref={el => { sectionRefs.current.theory = el; }}
            id="theory"
          >
            <div className="exp-section-header">
              <div>
                <div className="exp-section-label">Section 02</div>
                <h2 className="exp-section-title">Theory</h2>
              </div>
              {!progress.theory ? (
                <button className="btn btn-ghost btn-sm exp-mark-complete" onClick={() => handleMarkComplete('theory')}>
                  Mark Complete
                </button>
              ) : (
                <span className="badge badge-navy">✓ Completed</span>
              )}
            </div>

            {content.theory.map((section: any) => (
              <div key={section.id} className="exp-theory-item">
                <h3 className="exp-theory-item-title">{section.title}</h3>

                {section.type === 'text' && (
                  <div className="exp-theory-text" style={{ whiteSpace: 'pre-line' }}>
                    {section.content}
                  </div>
                )}

                {section.type === 'list' && (
                  <ul className="exp-theory-list">
                    {section.items?.map((item: any, i: number) => (
                      <li key={i}>
                        {item.term && <strong>{item.term}: </strong>}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="exp-theory-table-wrap">
                    <table className="exp-theory-table">
                      <thead>
                        <tr>
                          {section.table.headers.map((h: string, i: number) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row: string[], i: number) => (
                          <tr key={i}>
                            {row.map((cell: string, j: number) => (
                              <td key={j}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.formulas && (
                  <div className="exp-theory-formulas">
                    {section.formulas.map((f: any, i: number) => (
                      <FormulaCard key={i} {...f} />
                    ))}
                  </div>
                )}

                {section.codeExample && (
                  <div className="exp-theory-code">
                    <PythonBlock {...section.codeExample} />
                  </div>
                )}

                {section.visualizationId && (
                  <div className="exp-visualization-card animate-fade-in" style={{ marginTop: 'var(--space-6)' }}>
                    <div id={`viz-${section.visualizationId}`}>
                      {renderVisualization(section.visualizationId)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* ═══ PRETEST ═══ */}
          <section
            className="exp-section"
            ref={el => { sectionRefs.current.pretest = el; }}
            id="pretest"
          >
            <div className="exp-section-header">
              <div>
                <div className="exp-section-label">Section 03</div>
                <h2 className="exp-section-title">Pre-Test</h2>
              </div>
            </div>
            <Quiz
              quizId={`exp-${id}-pretest`}
              title={content.pretest.title}
              description={content.pretest.description}
              questions={content.pretest.questions}
              variant="pretest"
              onComplete={() => handleMarkComplete('pretest')}
            />
          </section>

          {/* ═══ PROCEDURE ═══ */}
          <section
            className="exp-section"
            ref={el => { sectionRefs.current.procedure = el; }}
            id="procedure"
          >
            <div className="exp-section-header">
              <div>
                <div className="exp-section-label">Section 04</div>
                <h2 className="exp-section-title">Procedure</h2>
              </div>
              {!progress.procedure ? (
                <button className="btn btn-ghost btn-sm exp-mark-complete" onClick={() => handleMarkComplete('procedure')}>
                  Mark Complete
                </button>
              ) : (
                <span className="badge badge-navy">✓ Completed</span>
              )}
            </div>

            {/* IPO Summary */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div className="exp-procedure-ipo">
                <div className="exp-procedure-ipo-item">
                  <div className="exp-procedure-ipo-label">Input</div>
                  <div className="exp-procedure-ipo-text">{content.procedure.inputProcessOutput.input}</div>
                </div>
                <div className="exp-procedure-ipo-item">
                  <div className="exp-procedure-ipo-label">Process</div>
                  <div className="exp-procedure-ipo-text">{content.procedure.inputProcessOutput.process}</div>
                </div>
                <div className="exp-procedure-ipo-item">
                  <div className="exp-procedure-ipo-label">Output</div>
                  <div className="exp-procedure-ipo-text">{content.procedure.inputProcessOutput.output}</div>
                </div>
              </div>
            </div>

            <div className="exp-procedure-steps">
              {content.procedure.steps.map((step: any, i: number) => {
                const isComplete = procedureSteps[i];
                return (
                  <div key={i} className={`exp-procedure-step${isComplete ? ' exp-procedure-step--complete' : ''}`}>
                    <button
                      className={`exp-procedure-check${isComplete ? ' exp-procedure-check--done' : ''}`}
                      onClick={() => {
                        saveProcedureStep(id || '1', i, !isComplete);
                        if (!isComplete && procedureSteps.filter(Boolean).length + 1 === content.procedure.steps.length) {
                          handleMarkComplete('procedure');
                        }
                      }}
                      aria-label={isComplete ? `Step ${i + 1} completed` : `Mark step ${i + 1} complete`}
                    >
                      {isComplete ? '✓' : i + 1}
                    </button>
                    <div className="exp-procedure-info">
                      <div className="exp-procedure-title">Step {i + 1}: {step.title}</div>
                      <div className="exp-procedure-action">{step.action}</div>
                      <div className="exp-procedure-ipo">
                        <div className="exp-procedure-ipo-item">
                          <div className="exp-procedure-ipo-label">Input</div>
                          <div className="exp-procedure-ipo-text">{step.input}</div>
                        </div>
                        <div className="exp-procedure-ipo-item">
                          <div className="exp-procedure-ipo-label">Process</div>
                          <div className="exp-procedure-ipo-text">{step.process}</div>
                        </div>
                        <div className="exp-procedure-ipo-item">
                          <div className="exp-procedure-ipo-label">Output</div>
                          <div className="exp-procedure-ipo-text">{step.output}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══ RESULTS & ANALYSIS ═══ */}
          <section
            className="exp-section"
            ref={el => { sectionRefs.current.results = el; }}
            id="results"
          >
            <div className="exp-section-header">
              <div>
                <div className="exp-section-label">Section 05</div>
                <h2 className="exp-section-title">Results & Analysis</h2>
              </div>
              {!progress.results ? (
                <button className="btn btn-ghost btn-sm exp-mark-complete" onClick={() => handleMarkComplete('results')}>
                  Mark Complete
                </button>
              ) : (
                <span className="badge badge-navy">✓ Completed</span>
              )}
            </div>

            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              After completing the experiment, students should observe and interpret the following verified experimental findings:
            </p>

            <ul className="exp-results-observations">
              {content.results.observations.map((obs: string, i: number) => (
                <li key={i}>{obs}</li>
              ))}
            </ul>

            <div className="exp-results-insight">
              <div className="exp-results-insight-label">Verified Academic Insight</div>
              <p>{content.results.keyInsight}</p>
            </div>
          </section>

          {/* ═══ POSTTEST ═══ */}
          <section
            className="exp-section"
            ref={el => { sectionRefs.current.posttest = el; }}
            id="posttest"
          >
            <div className="exp-section-header">
              <div>
                <div className="exp-section-label">Section 06</div>
                <h2 className="exp-section-title">Post-Test</h2>
              </div>
            </div>
            <Quiz
              quizId={`exp-${id}-posttest`}
              title={content.posttest.title}
              description={content.posttest.description}
              questions={content.posttest.questions}
              variant="posttest"
              onComplete={() => handleMarkComplete('posttest')}
            />
          </section>

          {/* ─── Bottom Navigation: Previous and Next Experiments ─── */}
          <div className="exp-bottom-nav">
            {prevExp ? (
              <Link to={`/experiment/${prevExp.id}`} className="exp-nav-btn exp-nav-prev">
                <span className="exp-nav-arrow">←</span>
                <div className="exp-nav-text">
                  <div className="exp-nav-sub">Previous Experiment</div>
                  <div className="exp-nav-title">{String(prevExp.number).padStart(2, '0')}. {prevExp.shortTitle}</div>
                </div>
              </Link>
            ) : (
              <Link to="/experiments" className="exp-nav-btn exp-nav-prev">
                <span className="exp-nav-arrow">←</span>
                <div className="exp-nav-text">
                  <div className="exp-nav-sub">Curriculum Explorer</div>
                  <div className="exp-nav-title">All Experiments</div>
                </div>
              </Link>
            )}

            {nextExp ? (
              <Link to={`/experiment/${nextExp.id}`} className="exp-nav-btn exp-nav-next">
                <div className="exp-nav-text">
                  <div className="exp-nav-sub">Next Experiment</div>
                  <div className="exp-nav-title">{String(nextExp.number).padStart(2, '0')}. {nextExp.shortTitle}</div>
                </div>
                <span className="exp-nav-arrow">→</span>
              </Link>
            ) : (
              <Link to="/dashboard" className="exp-nav-btn exp-nav-next">
                <div className="exp-nav-text">
                  <div className="exp-nav-sub">Laboratory Completed</div>
                  <div className="exp-nav-title">View Dashboard</div>
                </div>
                <span className="exp-nav-arrow">✓</span>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
