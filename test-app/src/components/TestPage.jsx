import { useState, useEffect, useCallback } from 'react'

export default function TestPage({ questions, answers, onAnswer, onSubmit, category, timerDuration, onBack }) {
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timerDuration)
  const [submitting, setSubmitting] = useState(false)
  const question = questions[current]
  const total = questions.length
  const answered = Object.keys(answers).length

  useEffect(() => {
    if (timeLeft <= 0) { handleSubmit(); return }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleSubmit = useCallback(() => {
    if (submitting) return
    setSubmitting(true)
    setTimeout(() => onSubmit(), 300)
  }, [submitting, onSubmit])

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const progress = ((current + 1) / total) * 100

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="test-page">
      <div className="test-header">
        <div className="test-header-top">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="test-category-badge" style={{ borderColor: category?.color }}>
            <span style={{ color: category?.color }}>{category?.name}</span>
          </div>
          <div className={`test-timer ${timeLeft < 60 ? 'timer-warning' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="test-meta">
          <span className="test-count">Savol {current + 1}/{total}</span>
          <span className="test-answered">{answered} ta javob berildi</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="test-body">
        <div className="question-card" key={current}>
          <span className="question-number">Savol {current + 1}</span>
          <h2 className="question-text">{question.question}</h2>
          <div className="options-list">
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === idx
              return (
                <button
                  key={idx}
                  className={`option-btn ${isSelected ? 'option-selected' : ''}`}
                  onClick={() => onAnswer(question.id, idx)}
                >
                  <span className={`option-label ${isSelected ? 'label-selected' : ''}`}>
                    {optionLabels[idx]}
                  </span>
                  <span className="option-text">{option}</span>
                  {isSelected && (
                    <svg className="option-check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#7C3AED" />
                      <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="test-footer">
        <div className="test-nav">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
            disabled={current === 0}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Orqaga
          </button>

          <div className="nav-dots">
            {questions.map((q, i) => (
              <button
                key={q.id}
                className={`nav-dot ${i === current ? 'dot-active' : ''} ${answers[q.id] !== undefined ? 'dot-done' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

          {current < total - 1 ? (
            <button className="btn btn-primary btn-sm" onClick={() => setCurrent(prev => prev + 1)}>
              Keyingi
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              className="btn btn-accent btn-sm"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Yuborilmoqda...' : 'Yakunlash'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
