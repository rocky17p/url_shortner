import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    fetch('/user/me', { credentials: 'include' })
      .then(r => r.json())
      .then(setAuth)
      .catch((e) => console.log("Auth fetch error", e))
  }, [])

  async function logout() {
    await fetch('/user/logout', { method: 'POST', credentials: 'include' })
    setAuth({ authenticated: false, user: null })
    navigate('/login')
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand" onClick={() => navigate('/')}>URL Shortener</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          {auth.authenticated ? (
            <>
              <span className="muted" style={{ marginLeft: 12 }}>Hi, {auth.user?.email}</span>
              <button className="button" style={{ marginLeft: 12 }} onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default App
