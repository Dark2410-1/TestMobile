export default function ResultPage({ result, questions, onRestart, onHome }) {
  if (!result) return null

  const { score, correct, total, answers } = result
  const grade = score >= 90 ? "A'lo" : score >= 70 ? "Yaxshi" : score >= 50 ? "Qoniqarli" : "Qoniqarsiz"
  const gradeColor = score >= 90 ? '#10B981' : score >= 70 ? '#3B82F6' : score >= 50 ? '#F59E0B' : '#EF4444'

  const radius = 72
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="result-page">
      <div className="result-content">
        <div className="result-header">
          <h1 className="result-title">Test yakunlandi!</h1>
          <p className="result-subtitle">{result.categoryName}</p>
        </div>

        <div className="result-score-ring">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <circle cx="90" cy="90" r={radius} fill="none" stroke={gradeColor} strokeWidth="10"
              strokeLinecap="round" transform="rotate(-90 90 90)"
              strokeDasharray={circumference} strokeDashoffset={offset} className="score-circle" />
          </svg>
          <div className="score-inner">
            <span className="score-value" style={{ color: gradeColor }}>{score}%</span>
            <span className="score-grade">{grade}</span>
          </div>
        </div>

        <div className="result-stats">
          <div className="result-stat">
            <span className="result-stat-value" style={{ color: '#10B981' }}>{correct}</span>
            <span className="result-stat-label">To'g'ri</span>
          </div>
          <div className="result-stat-divider" />
          <div className="result-stat">
            <span className="result-stat-value" style={{ color: '#EF4444' }}>{total - correct}</span>
            <span className="result-stat-label">Noto'g'ri</span>
          </div>
          <div className="result-stat-divider" />
          <div className="result-stat">
            <span className="result-stat-value">{total}</span>
            <span className="result-stat-label">Jami</span>
          </div>
        </div>

        <div className="result-answers">
          <h3 className="result-answers-title">Javoblar tahlili</h3>
          <div className="answers-list">
            {questions.map((q, i) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <div key={q.id} className={`answer-item ${isCorrect ? 'answer-correct' : 'answer-wrong'}`}>
                  <div className="answer-item-header">
                    <span className="answer-number">{i + 1}</span>
                    <span className={`answer-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}`}>
                      {isCorrect ? "To'g'ri" : "Noto'g'ri"}
                    </span>
                  </div>
                  <p className="answer-question">{q.question}</p>
                  <div className="answer-detail">
                    <span className="answer-label">Sizning javob: </span>
                    <span className={`answer-value ${isCorrect ? 'value-correct' : 'value-wrong'}`}>
                      {userAns !== undefined ? `${optionLabels[userAns]}. ${q.options[userAns]}` : 'Javob berilmagan'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="answer-detail">
                      <span className="answer-label">To'g'ri javob: </span>
                      <span className="answer-value value-correct">{optionLabels[q.correct]}. {q.options[q.correct]}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="result-actions">
          <button className="btn btn-primary result-action-btn" onClick={onRestart}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9a5 5 0 018.72-3.33M14 9a5 5 0 01-8.72 3.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 4v3h-3M4 14v-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Qayta topshirish
          </button>
          <button className="btn btn-secondary result-action-btn" onClick={onHome}>
            Bosh sahifa
          </button>
        </div>
      </div>
    </div>
  )
}
