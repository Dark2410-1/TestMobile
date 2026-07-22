export default function SettingsPage({ settings, setSettings, results, navigate }) {
  function update(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const timerOptions = [
    { label: '5 daqiqa', value: 300 },
    { label: '10 daqiqa', value: 600 },
    { label: '15 daqiqa', value: 900 },
    { label: '30 daqiqa', value: 1800 },
    { label: 'Cheksiz', value: 999999 },
  ]

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Sozlamalar</h1>
      </div>

      <div className="settings-body">
        <div className="settings-group">
          <h3 className="settings-group-title">Test sozlamalari</h3>

          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">Taymer vaqti</span>
              <span className="settings-item-desc">Test uchun ajratilgan vaqt</span>
            </div>
            <div className="settings-item-value">
              <select
                className="settings-select"
                value={settings.timerDuration}
                onChange={e => update('timerDuration', Number(e.target.value))}
              >
                {timerOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">Savollarni aralashtirish</span>
              <span className="settings-item-desc">Har safar savollar tartibi o'zgaradi</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.shuffleQuestions}
                onChange={e => update('shuffleQuestions', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        <div className="settings-group">
          <h3 className="settings-group-title">Statistika</h3>
          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">Jami testlar</span>
            </div>
            <span className="settings-stat-value">{results.length}</span>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">O'rtacha natija</span>
            </div>
            <span className="settings-stat-value">
              {results.length > 0 ? `${Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)}%` : '—'}
            </span>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">Eng yaxshi natija</span>
            </div>
            <span className="settings-stat-value" style={{ color: '#10B981' }}>
              {results.length > 0 ? `${Math.max(...results.map(r => r.score))}%` : '—'}
            </span>
          </div>
        </div>

        <div className="settings-group">
          <h3 className="settings-group-title">Ilova haqida</h3>
          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">Versiya</span>
            </div>
            <span className="settings-stat-value">1.0.0</span>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <span className="settings-item-label">Muallif</span>
            </div>
            <span className="settings-stat-value" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Dilshod</span>
          </div>
        </div>
      </div>
    </div>
  )
}
