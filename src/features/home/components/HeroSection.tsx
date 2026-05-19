import { useCountUp } from '@shared/hooks'

const trustBadges = [
  { icon: 'fa-shield-alt', label: 'ปลอดภัย 100%' },
  { icon: 'fa-award', label: 'รับรองโดย กระทรวงศึกษา' },
  { icon: 'fa-users', label: '50,000+ ผู้ใช้งาน' },
]

const mathCards = ['3', '8', '2', '6']

const studentAvatars = [
  'https://i.pravatar.cc/60?img=1',
  'https://i.pravatar.cc/60?img=2',
  'https://i.pravatar.cc/60?img=3',
]

interface StatProps {
  target: number
  label: string
}

function StatCounter({ target, label }: StatProps) {
  const { value, ref } = useCountUp(target)
  return (
    <div className="stat-item">
      <div ref={ref} className="stat-number">
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="hero-modern">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-fire" />
            <span>ยอดนิยม #1 ในไทย</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line-1">
              ทำให้<span className="text-gradient">คณิตศาสตร์</span>
            </span>
            <span className="title-line-2">
              เป็นเรื่อง<span className="text-magic">สนุก</span>ทุกวัน
            </span>
          </h1>

          <p className="hero-description">
            แพลตฟอร์มการเรียนรู้คณิตศาสตร์ที่ใช้ AI ปรับการเรียนให้เหมาะกับคุณ
            <br />
            พร้อมเกมส์สนุกๆ และครูผู้เชี่ยวชาญ
          </p>

          <div className="hero-stats">
            <StatCounter target={50000} label="นักเรียน" />
            <StatCounter target={1200} label="บทเรียน" />
            <StatCounter target={98} label="% พึงพอใจ" />
          </div>

          <div className="hero-actions">
            <button type="button" className="btn-primary-large">
              <i className="fas fa-play-circle" />
              <span>เริ่มเรียนฟรี</span>
              <div className="btn-shine" />
            </button>
            <button type="button" className="btn-secondary-large">
              <i className="fas fa-gamepad" />
              <span>เล่นเกมส์ 24</span>
            </button>
          </div>

          <div className="trust-badges">
            {trustBadges.map((badge) => (
              <span key={badge.label} className="badge-item">
                <i className={`fas ${badge.icon}`} />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-3d-card">
            <div className="card-layer layer-1">
              <div className="math-game-preview">
                <div className="game-header">
                  <span className="game-title">Math 24 Challenge</span>
                  <span className="game-score">Score: 1,250</span>
                </div>
                <div className="game-cards">
                  {mathCards.map((card, i) => (
                    <div key={i} className="math-card">
                      {card}
                    </div>
                  ))}
                </div>
                <div className="game-equation">(8 - 2) × (6 - 3) = 24</div>
              </div>
            </div>

            <div className="card-layer layer-2">
              <div className="student-avatars">
                {studentAvatars.map((src, i) => (
                  <img key={i} src={src} alt={`Student ${i + 1}`} />
                ))}
                <span className="more-students">+234</span>
              </div>
              <span className="live-indicator">
                <span className="live-dot" />
                กำลังเรียน LIVE
              </span>
            </div>

            <div className="card-layer layer-3">
              <div className="achievement-popup">
                <i className="fas fa-trophy" />
                <span>คุณได้รับเหรียญทอง!</span>
              </div>
            </div>
          </div>

          <div className="floating-element element-1">
            <i className="fas fa-brain" />
          </div>
          <div className="floating-element element-2">
            <i className="fas fa-rocket" />
          </div>
          <div className="floating-element element-3">
            <i className="fas fa-star" />
          </div>
        </div>
      </div>

      <div className="wave-separator">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  )
}
