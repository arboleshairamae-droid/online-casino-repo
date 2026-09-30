import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const games = [
  { icon: '🎰', name: 'Lucky Slots', text: 'A virtual slot machine challenge for play.' },
  { icon: '♠️', name: 'Card Room', text: 'Try a safe table-game simulation with no real money.' },
  { icon: '🎡', name: 'Prize Wheel', text: 'Spin a reward wheel and track virtual credits.' },
]

export default function Games() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="app-layout">
      <Sidebar user={user} />
      <main className="main-panel">
        <Navbar user={user} />

        <div className="content-area">
          <section className="page-header compact-header">
            <div>
              <p className="eyebrow">Games</p>
              <h1>Game Lounge</h1>
            </div>
          </section>

          <div className="game-grid full-grid">
            {games.map((game) => (
              <article key={game.name} className="game-card large-card">
                <div className="game-icon large-icon">{game.icon}</div>
                <div className="game-card-header">
                  <h3>{game.name}</h3>
                  <span className="demo-badge">GAIN COINS</span>
                </div>
                <p>{game.text}</p>
                <button type="button" className="primary-button small-button">Coming Soon</button>
              </article>
            ))}
          </div>

          <div className="back-link-wrap">
            <Link to="/dashboard" className="text-link">Back to Dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
