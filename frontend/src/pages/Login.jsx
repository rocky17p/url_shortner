import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_BASE = 'http://localhost:8001'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Login failed')
      }
      // Navigate to home page after successful login
      navigate('/')
      // Force reload to update auth state
      window.location.reload()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div>
          <h2 className="title gradient-text">Welcome Back</h2>
          <p className="muted" style={{ marginBottom: 32 }}>
            Sign in to your account to continue
          </p>
          <form onSubmit={onSubmit} className="form-group">
            <input
              className="input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="button" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          {error && (
            <p className="muted" style={{ marginTop: 16, color: 'var(--error)' }}>
              {error}
            </p>
          )}
          <div className="auth-link">
            Don't have an account?{' '}
            <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
      <div
        className="auth-decoration"
        style={{ backgroundImage: 'url(/images/login-decoration.png)' }}
      />
    </div>
  )
}
