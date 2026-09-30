import { NavLink, useNavigate } from 'react-router-dom'
import api from '../services/api'
import logo from '../assets/lucky.png'

export default function Navbar({ user }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?')

    if (!confirmed) {
      return
    }

    try {
      await api.post('/logout')
    } catch {
      // Demo mode keeps frontend behavior resilient even without Laravel running.
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    }
  }

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--header" />
        <div>
          <div className="brand-title">LuckyVault</div>
          <div className="brand-subtitle">Your Virtual Gaming Experience</div>
        </div>
      </div>

      <nav className="topnav" aria-label="Main navigation">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/games" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Games
        </NavLink>
        <NavLink to="/activity" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Activity
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Profile
        </NavLink>
      </nav>

      <div className="topbar-user">
        <div className="balance-pill">
          {Number(user?.balance || 1000).toFixed(2)} <span>Virtual Credits</span>
        </div>
        <div className="user-pill">
          <div className="mini-avatar">{(user?.name || 'D').charAt(0).toUpperCase()}</div>
          <span>{user?.name || 'User'}</span>
        </div>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
