// src/components/FormulaCard.tsx
import React, { useEffect, useRef } from 'react';
import './FormulaCard.css';

declare const katex: any;

interface FormulaCardProps {
  name: string;
  latex: string;
  description?: string;
}

export default function FormulaCard({ name, latex, description }: FormulaCardProps) {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current && typeof katex !== 'undefined') {
      try {
        katex.render(latex, mathRef.current, {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
      } catch {
        mathRef.current.textContent = latex;
      }
    }
  }, [latex]);

  return (
    <div className="formula-card">
      <div className="formula-card-label">{name}</div>
      <div className="formula-card-math" ref={mathRef} />
      {description && (
        <p className="formula-card-desc">{description}</p>
      )}
    </div>
  );
}

/* Inline formula renderer */
export function InlineMath({ latex }: { latex: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current && typeof katex !== 'undefined') {
      try {
        katex.render(latex, ref.current, {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        ref.current.textContent = latex;
      }
    }
  }, [latex]);
  return <span ref={ref} className="inline-math" />;
}
