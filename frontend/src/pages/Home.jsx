import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:8001'

export default function Home() {
  const [url, setUrl] = useState('')
  const [creating, setCreating] = useState(false)
  const [urls, setUrls] = useState([])
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [analytics, setAnalytics] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function fetchUrls() {
    try {
      const res = await fetch(`${API_BASE}/url`, { credentials: 'include' })
      const data = await res.json()
      setUrls(Array.isArray(data) ? data : [])
    } catch (e) {
      // ignore
    }
  }

  async function checkAuth() {
    try {
      const res = await fetch(`${API_BASE}/user/me`, { credentials: 'include' })
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
    } catch (e) {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuth()
    fetchUrls()
  }, [])

  async function onCreate(e) {
    e.preventDefault()
    setError('')
    if (!url.trim()) return
    setCreating(true)
    try {
      const res = await fetch(`${API_BASE}/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to create')
      }
      setUrl('')
      await fetchUrls()
      setToast('Short URL created successfully!')
      setTimeout(() => setToast(''), 3000)
    } catch (e) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  function copy(text) {
    navigator.clipboard.writeText(text)
    setToast('Copied to clipboard!')
    setTimeout(() => setToast(''), 3000)
  }

  async function showAnalytics(shortID) {
    const res = await fetch(`${API_BASE}/url/analytics/${shortID}`)
    const data = await res.json()
    setAnalytics({ shortID, ...data })
  }

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="gradient-text">Shorten Your Links</h1>
          <p>
            Create short, memorable links in seconds. Track clicks, analyze traffic,
            and share your content with ease.
          </p>
          <img
            src="/images/hero-waves.png"
            alt="Abstract gradient waves"
            className="hero-image"
          />
        </div>
      </div>

      {/* URL Creation Panel */}
      <div className="panel" style={{ marginBottom: 32 }}>
        <h2 className="title">Create a short link</h2>
        <form onSubmit={onCreate} className="row">
          <input
            className="input"
            placeholder="https://example.com/your-very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button" disabled={creating}>
            {creating ? 'Generating...' : 'Generate'}
          </button>
        </form>
        {error && (
          <p className="muted" style={{ marginTop: 12, color: 'var(--error)' }}>
            {error}
          </p>
        )}
      </div>

      {/* URLs Table */}
      {isAuthenticated && (
        <div className="panel">
          <h3 className="title">Your URLs</h3>
          {urls.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <img
                src="/images/link-illustration.png"
                alt="Link illustration"
                style={{ maxWidth: 300, width: '100%', marginBottom: 24, opacity: 0.8 }}
              />
              <p className="muted">No URLs yet. Create your first short link above!</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Short</th>
                  <th>Destination</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((u, idx) => (
                  <tr key={u._id || u.shortID}>
                    <td>{idx + 1}</td>
                    <td>
                      <a
                        href={`http://localhost:8001/${u.shortID}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {u.shortID}
                      </a>
                      <button
                        className="button"
                        style={{ marginLeft: 8, padding: '8px 12px', fontSize: '0.875rem' }}
                        onClick={() => copy(`http://localhost:8001/${u.shortID}`)}
                      >
                        Copy
                      </button>
                      <button
                        className="button button-secondary"
                        style={{ marginLeft: 8, padding: '8px 12px', fontSize: '0.875rem' }}
                        onClick={() => showAnalytics(u.shortID)}
                      >
                        Analytics
                      </button>
                    </td>
                    <td
                      className="muted"
                      style={{
                        maxWidth: 420,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {u.redirectURL}
                    </td>
                    <td>{u.visitHistory?.length ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {!!toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      {/* Analytics Modal */}
      {analytics && (
        <div className="modal-overlay" onClick={() => setAnalytics(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="title">Analytics for {analytics.shortID}</h3>
            <p style={{ fontSize: '1.125rem', marginBottom: 16 }}>
              Total clicks: <strong style={{ color: 'var(--primary-light)' }}>{analytics.totalClicks}</strong>
            </p>
            <div
              className="muted"
              style={{
                maxHeight: 300,
                overflow: 'auto',
                background: 'rgba(0,0,0,0.2)',
                padding: 16,
                borderRadius: 8,
              }}
            >
              {analytics.analytics.length === 0 ? (
                <p>No clicks yet</p>
              ) : (
                analytics.analytics.map((a, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    {new Date(a.timestamp).toLocaleString()}
                  </div>
                ))
              )}
            </div>
            <div style={{ textAlign: 'right', marginTop: 24 }}>
              <button className="button" onClick={() => setAnalytics(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
