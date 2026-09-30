import { NavLink, useNavigate } from 'react-router-dom'
import api from '../services/api'
import logo from '../assets/lucky.png'

export default function Sidebar({ user }) {
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

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '▣' },
    { to: '/games', label: 'All Games', icon: '◈' },
    { to: '/activity', label: 'Activity', icon: '◔' },
    { to: '/profile', label: 'Profile', icon: '◉' },
    { to: '/dashboard', label: 'Settings', icon: '⚙' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--sidebar" />
        <div>
          <div className="brand-title">LuckyVault</div>
          <div className="brand-subtitle small-subtitle">Your Virtual Gaming Experience</div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <button type="button" className="sidebar-link logout-link" onClick={handleLogout}>
          <span>⇠</span>
          Logout
        </button>
      </nav>

      <div className="sidebar-user-card">
        <div className="mini-label">Balance</div>
        <div className="sidebar-user-balance">{Number(user?.balance || 1000).toFixed(2)}</div>
        <small>Virtual credits</small>
      </div>
    </aside>
  )
}
