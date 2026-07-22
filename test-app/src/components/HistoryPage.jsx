import { useState } from 'react'

export default function HistoryPage({ results, onView, onClear }) {
  const [showConfirm, setShowConfirm] = useState(false)

  if (results.length === 0) {
    return (
      <div className="history-page">
        <div className="history-page-header">
          <h1 className="history-page-title">Tarix</h1>
        </div>
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <path d="M32 20v12l8 8" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="empty-title">Hali test topshirmadingiz</p>
          <p className="empty-subtitle">Bosh sahifadan testni boshlang</p>
        </div>
      </div>
    )
  }

  function getIcon(result) {
    if (result.score >= 90) return '🏆'
    if (result.score >= 70) return '✅'
    if (result.score >= 50) return '📖'
    return '📚'
  }

  return (
    <div className="history-page">
      <div className="history-page-header">
        <h1 className="history-page-title">Tarix</h1>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowConfirm(true)} style={{ color: 'rgba(255,255,255,0.4)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 4h12M7 4V3a1 1 0 011-1h2a1 1 0 011 1v1M6 8v6M12 8v6M4 4l1 11a1 1 0 001 1h8a1 1 0 001-1l1-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="history-stats">
        <div className="history-stat">
          <span className="history-stat-value">{results.length}</span>
          <span className="history-stat-label">Jami test</span>
        </div>
        <div className="history-stat-divider" />
        <div className="history-stat">
          <span className="history-stat-value">
            {Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)}%
          </span>
          <span className="history-stat-label">O'rtacha</span>
        </div>
        <div className="history-stat-divider" />
        <div className="history-stat">
          <span className="history-stat-value">
            {results.filter(r => r.score >= 70).length}
          </span>
          <span className="history-stat-label">Yaxshi</span>
        </div>
      </div>

      <div className="history-list-full">
        {results.map((r, i) => (
          <button key={r.id || i} className="history-card" onClick={() => onView(r.id)}>
            <div className="history-card-left">
              <span className="history-card-icon">{getIcon(r)}</span>
              <div className="history-card-info">
                <span className="history-card-category">{r.categoryName}</span>
                <span className="history-card-date">
                  {new Date(r.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="history-card-right">
              <span className="history-card-score" style={{ color: r.score >= 70 ? '#10B981' : '#EF4444' }}>
                {r.score}%
              </span>
              <span className="history-card-detail">{r.correct}/{r.total}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {showConfirm && (
        <div className="overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3 className="confirm-title">Tarixni tozalash</h3>
            <p className="confirm-text">Barcha natijalar o'chiriladi. Davom etishni xohlaysizmi?</p>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Bekor qilish</button>
              <button className="btn btn-accent" onClick={() => { onClear(); setShowConfirm(false) }}>Tozalash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
