import { featureCards } from '../data'

export function FeaturesSection() {
  return (
    <section className="features-modern" id="features">
      <div className="features-container">
        <div className="section-header">
          <span className="section-badge">ทำไมต้องเลือกเรา</span>
          <h2 className="section-title">
            ฟีเจอร์ที่ทำให้การเรียน
            <span className="text-gradient">ไม่น่าเบื่อ</span>
          </h2>
          <p className="section-subtitle">
            เทคโนโลยี AI ผสานกับการเรียนรู้แบบ Gamification
          </p>
        </div>

        <div className="features-grid">
          {featureCards.map((card) => (
            <div key={card.title} className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="icon-bg" />
                <i className={`fas ${card.icon} feature-icon`} />
              </div>
              <h3 className="feature-title">{card.title}</h3>
              <p className="feature-desc">{card.description}</p>
              <div className="feature-hover-content">
                <ul>
                  {card.hoverItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
