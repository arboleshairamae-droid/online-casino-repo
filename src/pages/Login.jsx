import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import logo from '../assets/lucky.png'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/login', form)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/dashboard')
    } catch (apiError) {
      const message = apiError.response?.data?.message || 'Invalid email or password.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <section className="auth-visual">
          <div className="visual-content">
            <div className="visual-top">
              <div className="auth-brand">
                <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--auth" />
                <div>
                  <div className="brand-title">LuckyVault</div>
                  <div className="brand-subtitle">Your Virtual Gaming Experience</div>
                </div>
              </div>
            </div>

            <div className="hero-copy">
              <p className="tagline">Luxury Gaming</p>
              <h1>Play the next era of virtual entertainment.</h1>
              <p>
                Explore a premium fictional gaming experience with smooth, immersive challenges and richly designed rewards.
              </p>
            </div>

            <div className="visual-cards">
              <div className="visual-card">
                <strong>1,000</strong>
                <span>Virtual credits</span>
              </div>
              <div className="visual-card">
                <strong>24/7</strong>
                <span>Access</span>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-header-copy">
                <h2>Welcome Back</h2>
                <p>Access yourprofile</p>
              </div>
                <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--auth" />
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="password">Password</label>
                <div className="password-field-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58A2 2 0 0 0 13.42 13.42" />
                        <path d="M9.88 5.08A10.94 10.94 0 0 1 12 5c5 0 9 4 9 7a12.5 12.5 0 0 1-3.11 4.64" />
                        <path d="M14.12 18.92A10.94 10.94 0 0 1 12 19c-5 0-9-4-9-7a12.5 12.5 0 0 1 3.11-4.64" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-wrap">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#">Forgot password?</a>
              </div>

              {error ? <div className="message error-message">{error}</div> : null}

              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              <span>Need an account?</span>
              <Link to="/register">Create Account</Link>
            </div>

            <div className="demo-banner">Virtual credits have no monetary value.</div>
          </div>
        </section>
      </div>
    </div>
  )
}
