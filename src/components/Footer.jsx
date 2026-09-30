import logo from '../assets/lucky.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div className="brand-wrap footer-brand">
          <img src={logo} alt="LuckyVault logo" className="brand-logo brand-logo--footer" />
          <div>
            <div className="brand-title footer-title">LuckyVault</div>
          </div>
        </div>
        <p className="footer-tagline">Fictional educational gaming platform.</p>
      </div>

      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Help</a>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Information</a>
      </div>

        
    </footer>
  )
}
