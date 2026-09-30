export default function StatCard({ label, value, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="mini-label">{label}</div>
      <div className="stat-value">{value}</div>
    </article>
  )
}
