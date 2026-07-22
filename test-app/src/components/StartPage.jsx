export default function StartPage({ onStart, results }) {
  const lastResult = results[0]

  return (
    <div className="start-page">
      <div className="start-bg">
        <div className="start-circle start-circle-1" />
        <div className="start-circle start-circle-2" />
      </div>

      <div className="start-content">
        <div className="start-logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="14" fill="url(#logo-grad)" />
            <path d="M16 24l6 6 10-12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48">
                <stop stopColor="#7C3AED" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="start-title">TestMaster</h1>
        <p className="start-subtitle">Bilimingizni sinab ko'ring</p>

        <div className="start-stats">
          <div className="stat-item">
            <span className="stat-value">{results.length}</span>
            <span className="stat-label">Testlar</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">10</span>
            <span className="stat-label">Savollar</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{lastResult ? `${lastResult.score}%` : '—'}</span>
            <span className="stat-label">Oxirgi</span>
          </div>
        </div>

        <button className="btn btn-primary start-btn" onClick={onStart}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 3l12 7-12 7V3z" fill="currentColor" />
          </svg>
          Testni boshlash
        </button>

        {results.length > 0 && (
          <div className="history-section">
            <h3 className="history-title">Tarix</h3>
            <div className="history-list">
              {results.slice(0, 5).map((r, i) => (
                <div key={i} className="history-item">
                  <span className="history-date">
                    {new Date(r.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })}
                  </span>
                  <span className="history-score" data-good={r.score >= 70}>
                    {r.score}%
                  </span>
                  <span className="history-detail">{r.correct}/{r.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
