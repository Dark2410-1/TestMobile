import { useState, useEffect, useCallback } from 'react'
import categoriesData from './data/categories.json'
import HomePage from './components/HomePage'
import TestPage from './components/TestPage'
import ResultPage from './components/ResultPage'
import HistoryPage from './components/HistoryPage'
import SettingsPage from './components/SettingsPage'
import Layout from './components/Layout'
import './App.css'

const RESULTS_KEY = 'testmaster_results'
const SETTINGS_KEY = 'testmaster_settings'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getSaved(key, fallback) {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  } catch { return fallback }
}

export default function App() {
  const [page, setPage] = useState('home')
  const [category, setCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(() => getSaved(RESULTS_KEY, []))
  const [settings, setSettings] = useState(() => getSaved(SETTINGS_KEY, { timerDuration: 600, shuffleQuestions: true }))
  const [animateIn, setAnimateIn] = useState(false)
  const [viewResult, setViewResult] = useState(null)

  useEffect(() => {
    requestAnimationFrame(() => setAnimateIn(true))
  }, [])

  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  }, [results])

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }, [settings])

  const navigate = useCallback((to) => {
    setAnimateIn(false)
    setTimeout(() => {
      setPage(to)
      requestAnimationFrame(() => setAnimateIn(true))
    }, 250)
  }, [])

  function handleStartTest(catId) {
    const cat = categoriesData.find(c => c.id === catId)
    if (!cat) return
    setCategory(cat)
    const qs = settings.shuffleQuestions ? shuffleArray(cat.questions) : cat.questions
    setQuestions(qs)
    setAnswers({})
    setAnimateIn(false)
    setTimeout(() => {
      setPage('test')
      requestAnimationFrame(() => setAnimateIn(true))
    }, 250)
  }

  function handleAnswer(questionId, optionIndex) {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  function handleSubmit() {
    const total = questions.length
    const correct = questions.filter(q => answers[q.id] === q.correct).length
    const score = Math.round((correct / total) * 100)
    const result = {
      id: Date.now(),
      date: new Date().toISOString(),
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color,
      total,
      correct,
      score,
      answers: { ...answers }
    }
    setResults(prev => [result, ...prev].slice(0, 50))
    setAnimateIn(false)
    setTimeout(() => {
      setPage('result')
      requestAnimationFrame(() => setAnimateIn(true))
    }, 250)
  }

  function handleViewHistory(resultId) {
    const r = results.find(res => res.id === resultId)
    if (r) {
      setViewResult(r)
      navigate('history-detail')
    }
  }

  const pageProps = { navigate, settings, setSettings, results, setResults }

  return (
    <div className="app">
      <div className="bg-effects">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>
      <div className={`page-wrap ${animateIn ? 'page-enter' : ''}`}>
        {page === 'home' && (
          <HomePage onStartTest={handleStartTest} lastResult={results[0] || null} />
        )}
        {page === 'test' && (
          <TestPage
            questions={questions}
            answers={answers}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
            category={category}
            timerDuration={settings.timerDuration}
            onBack={() => navigate('home')}
          />
        )}
        {page === 'result' && (
          <ResultPage
            result={results[0]}
            questions={questions}
            onRestart={() => handleStartTest(category.id)}
            onHome={() => navigate('home')}
          />
        )}
        {page === 'history' && (
          <HistoryPage
            results={results}
            onView={handleViewHistory}
            onClear={() => setResults([])}
            {...pageProps}
          />
        )}
        {page === 'history-detail' && viewResult && (
          <HistoryDetail
            result={viewResult}
            categories={categoriesData}
            onBack={() => navigate('history')}
          />
        )}
        {page === 'settings' && <SettingsPage {...pageProps} />}
        <Layout currentPage={page} onNavigate={navigate} />
      </div>
    </div>
  )
}

function HistoryDetail({ result, categories, onBack }) {
  const cat = categories.find(c => c.id === result.categoryId)
  const questions = cat ? cat.questions : []
  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="detail-page">
      <div className="detail-header">
        <button className="btn btn-ghost" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Orqaga
        </button>
        <div className="detail-title-group">
          <h1 className="detail-title">{result.categoryName}</h1>
          <span className="detail-score" style={{ color: result.score >= 70 ? '#10B981' : '#EF4444' }}>
            {result.score}%
          </span>
        </div>
        <div className="detail-meta">
          <span>{result.correct}/{result.total} to'g'ri</span>
          <span>•</span>
          <span>{new Date(result.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
      <div className="detail-body">
        {questions.map((q, i) => {
          const userAns = result.answers[q.id]
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
                <span className="answer-label">Siz: </span>
                <span className={`answer-value ${isCorrect ? 'value-correct' : 'value-wrong'}`}>
                  {userAns !== undefined ? `${optionLabels[userAns]}. ${q.options[userAns]}` : 'Javob berilmagan'}
                </span>
              </div>
              {!isCorrect && (
                <div className="answer-detail">
                  <span className="answer-label">To'g'ri: </span>
                  <span className="answer-value value-correct">
                    {optionLabels[q.correct]}. {q.options[q.correct]}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
