import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import logo from '../assets/lucky.png'

const initialForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const nextErrors = {}
    const name = form.name.trim()
    const email = form.email.trim()
    const password = form.password
    const passwordConfirmation = form.password_confirmation

    if (!name) {
      nextErrors.name = ['Full name is required.']
    }

    if (!email) {
      nextErrors.email = ['Email is required.']
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = ['Enter a valid email address.']
    }

    if (!password) {
      nextErrors.password = ['Password is required.']
    } else if (password.length < 6) {
      nextErrors.password = ['Password must be at least 6 characters.']
    }

    if (!passwordConfirmation) {
      nextErrors.password_confirmation = ['Please confirm your password.']
    } else if (password !== passwordConfirmation) {
      nextErrors.password_confirmation = ['Passwords do not match.']
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setMessage('')
      return
    }

    setErrors({})
    setMessage('')
    setLoading(true)

    try {
      const response = await api.post('/register', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.password_confirmation,
      })
      setMessage('Your account includes 1,000 virtual credits.')
      setTimeout(() => navigate('/'), 1200)
      return response
    } catch (apiError) {
      const responseErrors = apiError.response?.data?.errors || {}
      const apiMessage = apiError.response?.data?.message || 'Please complete all required fields.'
      const backendUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/api$/, '')

      if (apiError.code === 'ERR_NETWORK' || !apiError.response) {
        setErrors({
          form: [`Unable to reach the server. Make sure the Laravel backend is running on ${backendUrl}.`],
        })
        return null
      }

      if (Object.keys(responseErrors).length > 0) {
        const normalizedErrors = Object.fromEntries(
          Object.entries(responseErrors).map(([key, value]) => [key, Array.isArray(value) ? value : [String(value)]]),
        )

        setErrors(normalizedErrors)
      } else {
        setErrors({ form: [apiMessage] })
      }

      return null
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card register-card">
        <div className="auth-header">
          <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--auth" />
          <div>
            <div className="brand-title">Create Account</div>
            <div className="brand-subtitle">Join LuckyVault</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter Username" />
            {errors.name ? <small className="field-error">{errors.name[0]}</small> : null}
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            {errors.email ? <small className="field-error">{errors.email[0]}</small> : null}
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
                placeholder="Minimum 6 characters"
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
            {errors.password ? <small className="field-error">{errors.password[0]}</small> : null}
          </div>

          <div className="field-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <div className="password-field-wrap">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Repeat password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPasswordConfirmation((current) => !current)}
                aria-label={showPasswordConfirmation ? 'Hide password confirmation' : 'Show password confirmation'}
              >
                {showPasswordConfirmation ? (
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
            {errors.password_confirmation ? <small className="field-error">{errors.password_confirmation[0]}</small> : null}
          </div>

          {errors.form ? <div className="message error-message">{Array.isArray(errors.form) ? errors.form[0] : errors.form}</div> : null}
          {message ? <div className="message success-message">{message}</div> : null}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}
