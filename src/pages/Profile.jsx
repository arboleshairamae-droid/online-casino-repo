import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import logo from '../assets/lucky.png'

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  const [form, setForm] = useState({ name: storedUser.name || 'Demo User' })
  const [saved, setSaved] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedUser = { ...storedUser, name: form.name }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setSaved('Profile updated successfully.')
  }

  return (
    <div className="app-layout">
      <Sidebar user={storedUser} />
      <main className="main-panel">
        <Navbar user={storedUser} />

        <div className="content-area">
          <section className="profile-hero">
            <div className="profile-identity">
              <div className="profile-avatar" aria-hidden="true">
                {(storedUser.name || 'Demo User').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="eyebrow">Player profile</p>
                <h1>{storedUser.name || 'Demo User'}</h1>
                <p className="profile-email">{storedUser.email || 'demo@example.com'}</p>
              </div>
            </div>
            <div className="profile-status">
              <span className="status-dot" />
              <span>Account active</span>
            </div>
          </section>

          <div className="profile-layout">
            <section className="profile-card account-overview">
              <div className="profile-section-heading">
                <div>
                  <p className="eyebrow small-eyebrow">Account overview</p>
                  <h2>Your details</h2>
                </div>
                <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--profile" />
              </div>

            <div className="profile-grid">
              <div>
                <span className="meta-label">Name</span>
                <strong>{storedUser.name || 'Demo User'}</strong>
              </div>
              <div>
                <span className="meta-label">Email</span>
                <strong>{storedUser.email || 'demo@example.com'}</strong>
              </div>
              <div>
                <span className="meta-label">Member since</span>
                <strong>{storedUser.created_at ? new Date(storedUser.created_at).toLocaleDateString() : 'N/A'}</strong>
              </div>
              <div>
                <span className="meta-label">Virtual credit balance</span>
                <strong>{Number(storedUser.balance || 1000).toFixed(2)} credits</strong>
              </div>
            </div>
            </section>

            <section className="profile-card profile-edit-card">
              <div className="profile-section-heading">
                <div>
                  <p className="eyebrow small-eyebrow">Personalize</p>
                  <h2>Edit profile</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="profile-form">
              <div className="field-group">
                <label htmlFor="name">Update Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your display name" />
              </div>

              <button type="submit" className="primary-button">Save Changes <span aria-hidden="true">&#8594;</span></button>
              {saved ? <p className="success-message small-success">{saved}</p> : null}
              </form>
            </section>
          </div>

          <div className="profile-notice">
            <span className="notice-icon" aria-hidden="true">&#10024;</span>
            <div>
              <strong>Virtual credits only</strong>
              <p>This profile belongs to the LuckyVault educational demo environment. Virtual Credits — No Monetary Value.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
