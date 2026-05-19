import { useDragScroll } from '@shared/hooks'
import { portfolioCards } from '../data'

const CARD_WIDTH = 300 + 24 // card width + gap

export function PortfolioSection() {
  const { ref, scrollPrev, scrollNext } = useDragScroll<HTMLDivElement>({
    itemWidth: CARD_WIDTH,
    scrollMultiplier: 2,
  })

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">
        <div className="section-header">
          <span className="section-badge">
            <i className="fas fa-trophy" />
            Success Stories
          </span>
          <h2 className="section-title">
            ผลลัพธ์<span className="text-gradient">การเรียนรู้</span>
          </h2>
          <p className="section-subtitle">
            เรื่องราวความสำเร็จจากผู้เรียนจริง
            ที่เริ่มต้นจากความตั้งใจเล็กๆ สู่การพัฒนาตนเองและก้าวไปสู่เป้าหมายที่วางไว้
          </p>
        </div>

        <div className="portfolio-slider-wrapper">
          <button
            type="button"
            className="slider-btn prev-btn"
            onClick={scrollPrev}
            aria-label="ก่อนหน้า"
          >
            <i className="fas fa-chevron-left" />
          </button>

          <div ref={ref} className="portfolio-slider">
            {portfolioCards.map((card) => (
              <div key={card.name} className="portfolio-card">
                <img
                  src={card.avatar}
                  alt={card.name}
                  className="portfolio-avatar"
                />
                <div className="achievement-tag">{card.achievement}</div>
                <h4>{card.name}</h4>
                <p className="student-school">{card.school}</p>
                <p className="student-achievement">{card.story}</p>
                <div className="student-stats">
                  <span>
                    <i className="fas fa-book-open" /> {card.lessons} บทเรียน
                  </span>
                  <span>
                    <i className="fas fa-calendar" /> {card.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="slider-btn next-btn"
            onClick={scrollNext}
            aria-label="ถัดไป"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        <div className="slider-dots" />
      </div>
    </section>
  )
}
