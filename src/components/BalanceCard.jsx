export default function BalanceCard({ balance = '1000.00' }) {
  return (
    <div className="balance-card-panel">
      <div className="balance-header-row">
        <div>
          <p className="eyebrow small-eyebrow">Balance</p>
          <h2>{Number(balance || 1000).toFixed(2)}</h2>
        </div>
        <div className="gold-chip">✦</div>
      </div>
      <div className="balance-meta-row">
        <span>Virtual Credits</span>
      </div>
    </div>
  )
}
