import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Signup failed')
      }
      // Redirect to home page with full reload to update auth state
      window.location.href = '/'
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
          <h2 className="title gradient-text">Create Account</h2>
          <p className="muted" style={{ marginBottom: 32 }}>
            Get started with your free account
          </p>
          <form onSubmit={handleSubmit} className="form-group">
            <input
              className="input"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          {error && (
            <p className="muted" style={{ marginTop: 16, color: 'var(--error)' }}>
              {error}
            </p>
          )}
          <div className="auth-link">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
      <div
        className="auth-decoration"
        style={{ backgroundImage: 'url(/images/signup-decoration.png)' }}
      />
    </div>
  )
}
