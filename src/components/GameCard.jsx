export default function GameCard({ game }) {
  return (
    <article className="game-card">
      <div className="game-visual" aria-hidden="true">{game.icon}</div>
      <div className="game-card-header">
        <div>
          <h3>{game.name}</h3>
        </div>
        <span className="demo-badge">{game.badge}</span>
      </div>

      <p>{game.description}</p>

      <div className="game-footer-row">
        <button type="button" className="primary-button small-button">
          Play <span aria-hidden="true">&#8594;</span>
        </button>
        <button type="button" className="favorite-button" aria-label={`Favorite ${game.name}`}>
          ♡
        </button>
      </div>
    </article>
  )
}
