// src/components/PythonBlock.tsx
import React, { useState, useEffect, useRef } from 'react';
import './PythonBlock.css';

// We'll use Prism for syntax highlighting
declare const Prism: any;

interface PythonBlockProps {
  title?: string;
  code: string;
  explanation?: string[];
}

export default function PythonBlock({ title, code, explanation }: PythonBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && typeof Prism !== 'undefined') {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, expanded]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="python-block">
      <div className="python-block-header">
        <div className="python-block-label">
          <span className="python-block-dot" />
          <span className="python-block-dot" />
          <span className="python-block-dot" />
          <span className="python-block-title">{title || 'Python'}</span>
        </div>
        <div className="python-block-actions">
          <button
            className="python-block-btn"
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            className="python-block-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse code' : 'Expand code'}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      {expanded && (
        <pre className="python-block-code">
          <code ref={codeRef} className="language-python">
            {code}
          </code>
        </pre>
      )}
      {explanation && explanation.length > 0 && (
        <div className="python-block-explanation">
          <div className="python-block-explain-title">What's happening?</div>
          <ol className="python-block-explain-list">
            {explanation.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
