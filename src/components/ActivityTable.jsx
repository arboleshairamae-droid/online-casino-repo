export default function ActivityTable({ rows = [] }) {
  return (
    <div className="activity-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow small-eyebrow">Your recent sessions</p>
          <h3>Activity</h3>
        </div>
        <span className="panel-badge">Virtual credits</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Game</th>
              <th>Activity</th>
              <th>Credits</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row) => (
              <tr key={`${row.game}-${row.date}`}>
                <td>{row.game}</td>
                <td>{row.activity}</td>
                <td className={row.amount.startsWith('+') ? 'credit-positive' : 'credit-negative'}>{row.amount}</td>
                <td>{row.date}</td>
                <td><span className="status-pill">{row.status}</span></td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="empty-table">
                  <span className="empty-icon" aria-hidden="true">&#9671;</span>
                  <strong>No activity yet</strong>
                  <span>Play a virtual game to see your progress here.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
