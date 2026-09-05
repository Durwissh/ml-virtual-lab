// src/pages/VisualLab.tsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VisualLab.css';

/* ─── Ambient Animated Particle Canvas ─── */
function VisualLabBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    }

    function initParticles() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 10000), 70);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = '#4a90e2';
            ctx!.globalAlpha = 0.12 * (1 - dist / 130);
            ctx!.lineWidth = 1;
            ctx!.stroke();
            ctx!.globalAlpha = 1;
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = '#805ad5';
        ctx!.globalAlpha = 0.35;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="vlab-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

const simulationModules = [
  {
    icon: '📈',
    title: 'Gradient Descent & Loss Optimization',
    desc: 'Live 3D surface contour plots with real-time learning rate, momentum, and convex loss landscape stepping.',
    category: 'Optimization & Regression',
    status: 'In Development',
  },
  {
    icon: '⚖️',
    title: 'SVM Maximum-Margin Hyperplanes',
    desc: 'Interactive 2D/3D decision boundaries with dynamic support vector highlighting and Linear/RBF kernel transitions.',
    category: 'Classification',
    status: 'In Calibration',
  },
  {
    icon: '🔮',
    title: 'PCA High-Dimensional Variance Space',
    desc: 'Orthogonal eigenvector rotation, scree plot projections, and dimensionality compression visualizations.',
    category: 'Dimensionality Reduction',
    status: 'In Development',
  },
  {
    icon: '🎯',
    title: 'K-Means Centroid Physics & Clustering',
    desc: 'Step-by-step Voronoi tessellation, inertia tracking, and elbow curve simulations with custom cluster counts.',
    category: 'Unsupervised Learning',
    status: 'In Calibration',
  },
  {
    icon: '🌳',
    title: 'Decision Tree Orthogonal Space Partitioning',
    desc: 'Recursive axis-aligned decision rule splitting, depth thresholds, and real-time Gini impurity color mapping.',
    category: 'Tree-Based Models',
    status: 'In Development',
  },
  {
    icon: '🧠',
    title: 'Single-Layer Perceptron Decision Space',
    desc: 'Synaptic weight updates, activation thresholds, and linear separability demonstrations (AND/OR vs XOR).',
    category: 'Neural Networks',
    status: 'In Calibration',
  },
];

export default function VisualLab() {
  return (
    <div className="vlab-page-wrapper animate-fade-in">
      {/* Animated Mesh Canvas Background */}
      <VisualLabBackground />

      <div className="vlab-container">
        {/* ─── Hero Section with Ambient Glow ─── */}
        <header className="vlab-hero">
          <div className="vlab-pulse-pill">
            <span className="vlab-pulse-dot"></span>
            <span className="vlab-pulse-text">LABORATORY CALIBRATION IN PROGRESS</span>
          </div>

          <h1 className="vlab-hero-title">
            Interactive Visual Laboratory <br />
            <span className="vlab-title-gradient">Simulation & Sandbox Suite</span>
          </h1>

          <p className="vlab-hero-subtitle">
            A state-of-the-art visual laboratory currently undergoing active engineering.
            Explore mathematical mechanics through dynamic D3 graphics, loss surfaces, and real-time algorithm simulations.
          </p>

          <div className="vlab-actions">
            <Link to="/experiments" className="btn btn-primary btn-lg">
              Explore 10 Guided Experiments →
            </Link>
            <Link to="/learning-path" className="btn btn-secondary btn-lg">
              View Learning Roadmap
            </Link>
            <Link to="/glossary" className="btn btn-secondary btn-lg">
              Master Glossary (102 Terms)
            </Link>
          </div>
        </header>

        {/* ─── Information Box with Distinct Contrast Background ─── */}
        <section className="vlab-info-banner" aria-label="Visual Lab Information">
          <div className="vlab-info-header">
            <div className="vlab-info-icon-badge">💡</div>
            <div>
              <span className="vlab-info-tag">ABOUT THIS MODULE</span>
              <h2 className="vlab-info-title">Why Visual Learning in Machine Learning?</h2>
            </div>
          </div>

          <p className="vlab-info-lead">
            Machine Learning algorithms often operate in abstract, multi-dimensional mathematical spaces.
            Traditional static equations can obscure how decision boundaries shift, how loss converges, and how data partitions evolve.
          </p>

          <div className="vlab-info-grid">
            <div className="vlab-info-card">
              <div className="vlab-info-card-num">01</div>
              <h3 className="vlab-info-card-title">Geometric Intuition</h3>
              <p className="vlab-info-card-desc">
                Transform complex algebraic formulas (like Ordinary Least Squares, Sigmoids, and SVM Kernels) into interactive geometric shapes you can manipulate.
              </p>
            </div>

            <div className="vlab-info-card">
              <div className="vlab-info-card-num">02</div>
              <h3 className="vlab-info-card-title">Real-Time Parameter Feedback</h3>
              <p className="vlab-info-card-desc">
                Observe the immediate effects of adjusting learning rates, regularization parameters (C), tree depths, and cluster counts (K) with zero lag.
              </p>
            </div>

            <div className="vlab-info-card">
              <div className="vlab-info-card-num">03</div>
              <h3 className="vlab-info-card-title">Curriculum-Aligned Experiments</h3>
              <p className="vlab-info-card-desc">
                Every visual simulation maps directly to our 10 laboratory manual experiments—from data pre-processing and regression to neural perceptrons.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Upcoming Modules Grid with Distinctive Cards ─── */}
        <section className="vlab-modules-section" aria-label="Upcoming Simulations">
          <div className="vlab-section-header">
            <span className="vlab-section-tag">ENGINEERING PIPELINE</span>
            <h2 className="vlab-section-title">Upcoming Interactive Sandboxes</h2>
            <p className="vlab-section-desc">
              Here is the suite of dynamic simulations currently being compiled for the ML Virtual Lab.
            </p>
          </div>

          <div className="vlab-modules-grid">
            {simulationModules.map((item, idx) => (
              <div key={idx} className="vlab-module-card">
                <div className="vlab-module-top">
                  <span className="vlab-module-icon">{item.icon}</span>
                  <span className="vlab-module-category">{item.category}</span>
                </div>
                <h3 className="vlab-module-title">{item.title}</h3>
                <p className="vlab-module-desc">{item.desc}</p>
                <div className="vlab-module-footer">
                  <span className="vlab-status-dot"></span>
                  <span className="vlab-status-text">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
