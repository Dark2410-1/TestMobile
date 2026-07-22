import categories from '../data/categories.json'

export default function HomePage({ onStartTest, lastResult }) {
  const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0)

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-logo">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="14" fill="url(#lg)" />
            <path d="M16 24l6 6 10-12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
                <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="home-logo-text">
            <h1 className="home-title">TestMaster</h1>
            <p className="home-subtitle">Bilimingizni sinab ko'ring</p>
          </div>
        </div>
        <div className="home-greeting">
          <span>Salom!</span>
          <span className="home-date">{new Date().toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      <div className="home-body">
        <div className="home-stats-row">
          <div className="home-stat">
            <span className="home-stat-value">{categories.length}</span>
            <span className="home-stat-label">Kategoriya</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-value">{totalQuestions}</span>
            <span className="home-stat-label">Savol</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-value">{lastResult ? `${lastResult.score}%` : '—'}</span>
            <span className="home-stat-label">Oxirgi</span>
          </div>
        </div>

        {lastResult && (
          <div className="last-result-banner" onClick={() => {}}>
            <div className="last-result-left">
              <span className="last-result-label">Oxirgi test</span>
              <span className="last-result-name">{lastResult.categoryName}</span>
            </div>
            <div className="last-result-score" style={{ color: lastResult.score >= 70 ? '#10B981' : '#EF4444' }}>
              {lastResult.score}%
            </div>
          </div>
        )}

        <h2 className="section-title">Kategoriyalar</h2>

        <div className="categories-grid">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => onStartTest(cat.id)}
              style={{ '--cat-color': cat.color, '--cat-bg': cat.bgColor }}
            >
              <div className="category-icon" style={{ background: cat.bgColor, color: cat.color }}>
                {cat.icon}
              </div>
              <div className="category-info">
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.questionCount} ta savol</span>
              </div>
              <svg className="category-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
