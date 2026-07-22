const tabs = [
  { id: 'home', label: 'Bosh sahifa', icon: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />' },
  { id: 'history', label: 'Tarix', icon: '<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />' },
  { id: 'settings', label: 'Sozlamalar', icon: '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' },
]

export default function Layout({ currentPage, onNavigate }) {
  const showTabs = ['home', 'history', 'settings'].includes(currentPage)

  if (!showTabs) return null

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {tabs.map(tab => {
          const isActive = currentPage === tab.id || (tab.id === 'home' && !['home', 'history', 'settings'].includes(currentPage))
          return (
            <button
              key={tab.id}
              className={`nav-tab ${isActive ? 'nav-tab-active' : ''}`}
              onClick={() => onNavigate(tab.id)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <g dangerouslySetInnerHTML={{ __html: tab.icon }} />
              </svg>
              <span className="nav-tab-label">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
