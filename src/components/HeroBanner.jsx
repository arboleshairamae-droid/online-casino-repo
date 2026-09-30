import { Link } from 'react-router-dom'
import logo from '../assets/lucky.png'

export default function HeroBanner({ userName = 'Player' }) {
  return (
    <section className="hero-banner">
      <div className="hero-copy">
        <p className="eyebrow">Premium lounge</p>
        <h1>Welcome back, {userName}.</h1>
        <p>Explore polished virtual games, track your progress, and enjoy the LuckyVault experience.</p>
        <div className="hero-actions">
          <Link to="/games" className="primary-button">Explore Games <span aria-hidden="true">&#8594;</span></Link>
          <Link to="/activity" className="ghost-button">View Activity</Link>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="glow-ring ring-one" />
        <div className="glow-ring ring-two" />
        <div className="token token-a">♠</div>
        <div className="token token-b">♥</div>
        <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--hero" />
        <div className="card-float card-one">A</div>
        <div className="card-float card-two">K</div>
        <div className="floating-label">{userName}</div>
      </div>
    </section>
  )
}
