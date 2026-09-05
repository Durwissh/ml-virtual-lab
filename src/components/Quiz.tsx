// src/components/Quiz.tsx
import React, { useState, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import './Quiz.css';

interface Question {
  q: string;
  options: string[];
  answer: number; // 0-indexed correct answer
}

interface QuizProps {
  quizId: string;
  title: string;
  description?: string;
  questions: Question[];
  variant?: 'pretest' | 'posttest';
  onComplete?: () => void;
}

const optionLetters = ['A', 'B', 'C', 'D'];

export default function Quiz({ quizId, title, description, questions, variant = 'pretest', onComplete }: QuizProps) {
  const { saveQuizResult, progress } = useProgress();
  const existingResult = progress.quizResults[quizId];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    existingResult ? existingResult.answers : new Array(questions.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(!!existingResult);
  const [showReview, setShowReview] = useState(false);

  const score = answers.reduce((acc, ans, i) => {
    return acc + (ans === questions[i].answer ? 1 : 0);
  }, 0);

  const percent = Math.round((score / questions.length) * 100);

  const handleSelect = useCallback((optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  }, [current, submitted]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const result = {
      score,
      total: questions.length,
      answers,
      submittedAt: new Date().toISOString(),
    };
    saveQuizResult(quizId, result);
    onComplete?.();
  }, [score, questions.length, answers, quizId, saveQuizResult, onComplete]);

  const handleRetake = useCallback(() => {
    setAnswers(new Array(questions.length).fill(-1));
    setSubmitted(false);
    setShowReview(false);
    setCurrent(0);
  }, [questions.length]);

  const allAnswered = answers.every(a => a !== -1);
  const q = questions[current];

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h3 className="quiz-title">{title}</h3>
        {description && <p className="quiz-desc">{description}</p>}
      </div>

      {/* Results panel */}
      {submitted && !showReview && (
        <div className="quiz-results animate-fade-in-up">
          <div className="quiz-results-score">{score}/{questions.length}</div>
          <div className="quiz-results-label">
            {percent >= 80 ? 'Excellent work!' : percent >= 60 ? 'Good effort!' : 'Keep practising.'}
          </div>
          <div className="quiz-results-bar">
            <div
              className="quiz-results-bar-fill"
              style={{
                width: `${percent}%`,
                background: percent >= 80 ? 'var(--success)' : percent >= 60 ? 'var(--warning)' : 'var(--error)',
              }}
            />
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-5)' }}>
            You scored {percent}% ({score} out of {questions.length} correct)
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setShowReview(true)}>
              Review Answers
            </button>
            <button className="btn btn-ghost" onClick={handleRetake}>
              Retake
            </button>
          </div>
        </div>
      )}

      {/* Review mode */}
      {submitted && showReview && (
        <div className="animate-fade-in">
          <button className="btn btn-ghost" onClick={() => setShowReview(false)} style={{ marginBottom: 'var(--space-4)' }}>
            ← Back to Results
          </button>
          {questions.map((question, qi) => {
            const isCorrect = answers[qi] === question.answer;
            return (
              <div
                key={qi}
                className={`quiz-review-item ${isCorrect ? 'quiz-review-item--correct' : 'quiz-review-item--incorrect'}`}
              >
                <div className="quiz-review-question">
                  {qi + 1}. {question.q}
                </div>
                <div className="quiz-review-answer">
                  Your answer: {answers[qi] >= 0 ? `${optionLetters[answers[qi]]} – ${question.options[answers[qi]]}` : 'Not answered'}
                  {!isCorrect && (
                    <span className="quiz-review-correct">
                      {' '}· Correct: {optionLetters[question.answer]} – {question.options[question.answer]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-ghost" onClick={handleRetake}>Retake Quiz</button>
          </div>
        </div>
      )}

      {/* Question view (not submitted) */}
      {!submitted && (
        <>
          <div className="quiz-progress">
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
            </div>
            <span className="quiz-progress-text">{current + 1} / {questions.length}</span>
          </div>

          <div className="quiz-question-card animate-fade-in" key={current}>
            <div className="quiz-question-number">Question {current + 1}</div>
            <div className="quiz-question-text">{q.q}</div>
            <div className="quiz-options" role="radiogroup" aria-label={`Question ${current + 1} options`}>
              {q.options.map((option, oi) => (
                <button
                  key={oi}
                  className={`quiz-option${answers[current] === oi ? ' quiz-option--selected' : ''}`}
                  onClick={() => handleSelect(oi)}
                  role="radio"
                  aria-checked={answers[current] === oi}
                >
                  <span className="quiz-option-indicator">{optionLetters[oi]}</span>
                  <span className="quiz-option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-nav">
            <button
              className="btn btn-ghost"
              disabled={current === 0}
              onClick={() => setCurrent(c => c - 1)}
            >
              ← Previous
            </button>
            {current < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrent(c => c + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!allAnswered}
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
