import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

interface AnchorLink {
  type: 'anchor'
  href: string
  icon: string
  label: string
}

interface RouteLink {
  type: 'route'
  to: string
  icon: string
  label: string
}

type NavLink = AnchorLink | RouteLink

const navLinks: NavLink[] = [
  { type: 'anchor', href: '#courses', icon: 'fa-graduation-cap', label: 'คอร์สเรียน' },
  { type: 'anchor', href: '#library', icon: 'fa-book', label: 'คลังหนังสือ' },
  { type: 'route', to: '/tcas-calculator', icon: 'fa-calculator', label: 'เช็กคะแนนยื่นมหาลัย' },
  { type: 'anchor', href: '#game', icon: 'fa-gamepad', label: 'เกมส์' },
  { type: 'anchor', href: '#portfolio', icon: 'fa-trophy', label: 'ผลงานลูกศิษย์' },
  { type: 'anchor', href: '#about', icon: 'fa-info-circle', label: 'เกี่ยวกับเรา' },
]

function renderLink(link: NavLink, onClick?: () => void) {
  const content = (
    <>
      <span className="nav-icon">
        <i className={`fas ${link.icon}`} />
      </span>
      <span className="nav-text">{link.label}</span>
    </>
  )

  if (link.type === 'route') {
    return (
      <Link key={link.to} to={link.to} className="nav-link" onClick={onClick}>
        {content}
      </Link>
    )
  }
  return (
    <a key={link.href} href={link.href} className="nav-link" onClick={onClick}>
      {content}
    </a>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
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
            {navLinks.map((link) => renderLink(link))}
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

          <button
            type="button"
            className="mobile-menu-toggle"
            data-open={mobileOpen}
            aria-label={mobileOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className="mobile-drawer-overlay"
        data-open={mobileOpen}
        onClick={closeMobile}
        aria-hidden
      />

      <aside className="mobile-drawer" data-open={mobileOpen} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">เมนู</span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={closeMobile}
            aria-label="ปิดเมนู"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="mobile-drawer-links">
          {navLinks.map((link) => renderLink(link, closeMobile))}
        </div>

        <div className="mobile-drawer-actions">
          <button type="button" className="btn-glass btn-login">
            <i className="fas fa-sign-in-alt" />
            <span>เข้าสู่ระบบ</span>
          </button>
          <Link
            to="/signup"
            className="btn-gradient btn-signup"
            onClick={closeMobile}
          >
            <i className="fas fa-user-plus" />
            <span>สมัครสมาชิก</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
