const linkGroups = [
  {
    title: 'เกี่ยวกับเรา',
    links: [
      { label: 'ทีมงาน', href: '#' },
      { label: 'พันธกิจ', href: '#' },
      { label: 'ติดต่อเรา', href: '#' },
    ],
  },
  {
    title: 'บริการ',
    links: [
      { label: 'คอร์สเรียน', href: '#' },
      { label: 'คลาสสด', href: '#' },
      { label: 'เกมส์คณิต', href: '#' },
    ],
  },
  {
    title: 'ช่วยเหลือ',
    links: [
      { label: 'คู่มือการใช้งาน', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'แจ้งปัญหา', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <a href="#">
              <img
                src="/img/mmd-logo.png"
                alt="Math My Day"
                className="footer-logo-image"
              />
            </a>
          </div>
          <p>ทำให้คณิตศาสตร์เป็นเรื่องสนุกทุกวัน</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61576679381981"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook" />
            </a>
            <a
              href="https://x.com/mathmyday"
              target="_blank"
              rel="noopener noreferrer"
              className="x-logo"
              aria-label="X (Twitter)"
            >
              𝕏
            </a>
            <a
              href="https://www.instagram.com/hello_mathmyday/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          {linkGroups.map((group) => (
            <div key={group.title} className="link-group">
              <h4>{group.title}</h4>
              {group.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Math My Day. All rights reserved.</p>
      </div>
    </footer>
  )
}
