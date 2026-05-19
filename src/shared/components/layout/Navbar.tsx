import { Link } from '@tanstack/react-router'

const navLinks = [
  { href: '#courses', icon: 'fa-graduation-cap', label: 'คอร์สเรียน' },
  { href: '#library', icon: 'fa-book', label: 'คลังหนังสือ' },
  { href: '#game', icon: 'fa-gamepad', label: 'เกมส์' },
  { href: '#portfolio', icon: 'fa-trophy', label: 'ผลงานลูกศิษย์' },
  { href: '#about', icon: 'fa-info-circle', label: 'เกี่ยวกับเรา' },
]

export function Navbar() {
  return (
    <nav className="modern-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-3d-container">
            <img
              src="/img/mmd-logo.png"
              alt="Math My Day"
              className="logo-3d-image"
            />
            <div className="logo-shadow" />
          </Link>
        </div>

        <div className="nav-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              <span className="nav-icon">
                <i className={`fas ${link.icon}`} />
              </span>
              <span className="nav-text">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button type="button" className="btn-glass btn-login">
            <i className="fas fa-sign-in-alt" />
            <span>เข้าสู่ระบบ</span>
          </button>
          <Link to="/signup" className="btn-gradient btn-signup">
            <i className="fas fa-user-plus" />
            <span>สมัครสมาชิก</span>
          </Link>
        </div>

        <div className="mobile-menu-toggle">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  )
}
