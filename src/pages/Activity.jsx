import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const activities = [
  { title: 'Lucky Slots', detail: 'Result', amount: '+50 virtual credits' },
  { title: 'Prize Wheel', detail: 'Result', amount: '-10 virtual credits' },
  { title: 'Card Room', detail: 'Result', amount: '+25 virtual credits' },
]

export default function Activity() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="app-layout">
      <Sidebar user={user} />
      <main className="main-panel">
        <Navbar user={user} />

        <div className="content-area">
          <section className="page-header compact-header">
            <div>
              <p className="eyebrow">Activity</p>
              <h1>Recent Activity</h1>
            </div>
          </section>

          <div className="activity-panel full-panel">
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.title} className="activity-item">
                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.detail}</p>
                  </div>
                  <span className={activity.amount.startsWith('+') ? 'credit-positive' : 'credit-negative'}>
                    {activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
