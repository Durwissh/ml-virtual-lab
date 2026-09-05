// src/pages/Home.tsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { experiments } from '../data/experiments';
import { useProgress } from '../context/ProgressContext';
import './Home.css';

/* ─── Animated Background: subtle dot grid with connections ─── */
function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dots: { x: number; y: number; vx: number; vy: number }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
      initDots();
    }

    function initDots() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const count = Math.floor((w * h) / 8000);
      dots = Array.from({ length: Math.min(count, 80) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue('--text-primary').trim() || '#1a1d21';

      // Move dots
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(dots[i].x, dots[i].y);
            ctx!.lineTo(dots[j].x, dots[j].y);
            ctx!.strokeStyle = color;
            ctx!.globalAlpha = 0.08 * (1 - dist / 120);
            ctx!.lineWidth = 1;
            ctx!.stroke();
            ctx!.globalAlpha = 1;
          }
        }
      }

      // Draw dots
      for (const d of dots) {
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = 0.15;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    }

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    if (!prefersReduced) {
      draw();
    } else {
      // Draw once, static
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue('--text-primary').trim() || '#1a1d21';
      for (const d of dots) {
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = 0.12;
        ctx!.fill();
      }
    }

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="home-hero-bg">
      <canvas ref={canvasRef} />
    </div>
  );
}

const pipelineSteps = [
  { icon: '📊', label: 'Data' },
  { icon: '⚙', label: 'Model' },
  { icon: '📐', label: 'Predict' },
  { icon: '💡', label: 'Insight' },
];

const pillars = [
  { icon: '📖', title: 'Learn', desc: 'Study theory with interactive content, formulas, and code examples.' },
  { icon: '🧪', title: 'Experiment', desc: 'Follow guided procedures with real ML algorithms and datasets.' },
  { icon: '✍', title: 'Test', desc: 'Check understanding with pretests and application-oriented posttests.' },
  { icon: '🏆', title: 'Master', desc: 'Track progress, review results, and build lasting understanding.' },
];

export default function Home() {
  const { getCompletionPercent, progress } = useProgress();

  return (
    <div className="home">
      {/* ─── Hero ─── */}
      <section className="home-hero">
        <HeroBackground />
        <div className="home-hero-content">
          <div className="home-hero-badge">SRM Virtual Laboratory</div>
          <h1 className="home-hero-title">
            Learn Machine Learning by<br />
            Understanding, Experimenting,<br />
            and Visualizing
          </h1>
          <p className="home-hero-subtitle">
            A comprehensive interactive laboratory with 10 experiments covering
            data preprocessing, regression, classification, clustering, and neural networks.
          </p>
          <div className="home-hero-actions">
            <Link to="/experiment/1" className="btn btn-primary btn-lg">
              Start Learning
            </Link>
            <Link to="/experiments" className="btn btn-secondary btn-lg">
              Explore Experiments
            </Link>
          </div>

          <div className="home-pipeline">
            {pipelineSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && <span className="home-pipeline-arrow">→</span>}
                <div className="home-pipeline-step">
                  <div className="home-pipeline-icon">{step.icon}</div>
                  <span className="home-pipeline-label">{step.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Learning Path ─── */}
      <section className="home-section">
        <div className="home-section-inner">
          <div className="home-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div className="home-section-label">Your ML Learning Path</div>
              <h2 className="home-section-title">10 Experiments. One Journey.</h2>
              <p className="home-section-desc">
                Progress from data foundations through advanced ensemble methods and neural networks.
              </p>
            </div>
            <Link to="/learning-path" className="btn btn-secondary" style={{ marginBottom: 'var(--space-2)' }}>
              View 6-Level Curriculum Path →
            </Link>
          </div>

          <div className="home-experiments-grid stagger">
            {experiments.map(exp => {
              const percent = getCompletionPercent(exp.id);
              return (
                <Link
                  key={exp.id}
                  to={`/experiment/${exp.id}`}
                  className="home-exp-card animate-fade-in-up"
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
                  <h3 className="home-exp-title">{exp.shortTitle}</h3>
                  <p className="home-exp-desc">{exp.description}</p>
                  <div className="home-exp-footer">
                    <span className="home-exp-time">
                      ⏱ {exp.estimatedTime}
                    </span>
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
        </div>
      </section>

      {/* ─── Pillars ─── */}
      <section className="home-section">
        <div className="home-section-inner">
          <div className="home-section-header">
            <div className="home-section-label">How It Works</div>
            <h2 className="home-section-title">Learn → Experiment → Test → Master</h2>
            <p className="home-section-desc">
              Each experiment follows a structured learning cycle designed for deep understanding.
            </p>
          </div>

          <div className="home-pillars">
            {pillars.map((p, i) => (
              <div key={p.title} className="home-pillar-card">
                <div className="home-pillar-header">
                  <div className="home-pillar-icon">{p.icon}</div>
                  <span className="home-pillar-step-badge">STEP 0{i + 1}</span>
                </div>
                <h3 className="home-pillar-title">{p.title}</h3>
                <p className="home-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Continue Learning ─── */}
      {progress.lastVisited && (
        <section className="home-section">
          <div className="home-section-inner">
            <div className="home-section-header">
              <div className="home-section-label">Continue Where You Left Off</div>
            </div>
            <div className="home-continue">
              <div className="home-continue-info">
                <div className="home-continue-label">Currently Learning</div>
                <div className="home-continue-title">
                  Experiment {String(progress.lastVisited.experimentId).padStart(2, '0')} –{' '}
                  {experiments.find(e => e.id === progress.lastVisited!.experimentId)?.shortTitle}
                </div>
                <div className="home-continue-section">
                  Section: {progress.lastVisited.section}
                </div>
              </div>
              <Link to={`/experiment/${progress.lastVisited.experimentId}`} className="btn btn-primary">
                Continue
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <footer className="home-footer">
        <p className="home-footer-text">
          SRM Machine Learning Virtual Laboratory · Department of Computer Science · Built for Learning
        </p>
      </footer>
    </div>
  );
}
