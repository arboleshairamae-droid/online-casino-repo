import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/HeroBanner'
import BalanceCard from '../components/BalanceCard'
import StatCard from '../components/StatCard'
import GameCard from '../components/GameCard'
import ActivityTable from '../components/ActivityTable'
import Footer from '../components/Footer'

const demoGames = [
  { icon: '🎰', name: 'Lucky Slots', description: 'Classic reel action with virtual spins and rewards.', badge: 'GAIN COINS', accent: 'gold' },
  { icon: '🎡', name: 'Golden Wheel', description: 'Test your timing on a prestige wheel bonus reel.', badge: 'GAIN COINS', accent: 'gold' },
  { icon: '♠️', name: 'Royal Cards', description: 'A polished card-table simulation in a luxury lounge.', badge: 'GAIN COINS', accent: 'gold' },
  { icon: '🧰', name: 'Mystery Vault', description: 'Open a secure vault for surprise drops and quests.', badge: 'GAIN COINS', accent: 'gold' },
  { icon: '🎲', name: 'Lucky Dice', description: 'Roll the dice and track your virtual lucky streak.', badge: 'GAIN COINS', accent: 'gold' },
  { icon: '💎', name: 'Treasure Spin', description: 'Collect shimmering rewards in a jewel-themed loop.', badge: 'GAIN COINS', accent: 'gold' },
]

const stats = [
  { label: ' Balance', value: '1,000', icon: '◈' },
  { label: 'Games Played', value: '0', icon: '▣' },
  { label: ' Wins', value: '0', icon: '✦' },
  { label: 'Favorites', value: '0', icon: '♡' },
]

const activityRows = [
  { game: 'Lucky Slots', activity: 'Result', amount: '+50', date: 'Today', status: 'Completed' },
  { game: 'Golden Wheel', activity: 'Bonus Round', amount: '+25', date: 'Today', status: 'Completed' },
  { game: 'Royal Cards', activity: 'Virtual Round', amount: '-10', date: 'Yesterday', status: 'Completed' },
]

export default function Dashboard() {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch {
      return {}
    }
  }, [])

  return (
    <div className="app-layout">
      <Sidebar user={user} />

      <main className="main-panel">
        <Navbar user={user} />

        <div className="content-area dashboard-shell">
          <HeroBanner userName={user?.name || 'Player'} />

          <div className="balance-and-stats">
            <BalanceCard balance={user?.balance || 1000} />
            <div className="stat-grid">
              {stats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
              ))}
            </div>
          </div>

          <section className="feature-section">
            <div className="section-header">
              <div>
                <p className="eyebrow small-eyebrow">Featured Games</p>
                <h2>Popular Picks</h2>
              </div>
              <button type="button" className="ghost-button small-button">View All</button>
            </div>

            <div className="game-grid premium-grid">
              {demoGames.map((game) => (
                <GameCard key={game.name} game={game} />
              ))}
            </div>
          </section>

          <section className="promo-banner">
            <div>
              <p className="eyebrow small-eyebrow">Daily Rewards</p>
              <h3>Try today&apos;s virtual challenges.</h3>
            </div>
            <button type="button" className="primary-button">Explore</button>
          </section>

          <ActivityTable rows={activityRows} />
        </div>

        <Footer />
      </main>
    </div>
  )
}
