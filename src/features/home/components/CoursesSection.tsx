import { courseLevels } from '../data'

export function CoursesSection() {
  return (
    <section className="courses-modern" id="courses">
      <div className="courses-container">
        <div className="section-header">
          <span className="section-badge">คอร์สเรียนยอดนิยม</span>
          <h2 className="section-title">
            เลือกเรียนตาม<span className="text-gradient">ระดับของคุณ</span>
          </h2>
        </div>

        <div className="course-levels">
          {courseLevels.map((level) => (
            <div
              key={level.title}
              className={level.featured ? 'level-card featured' : 'level-card'}
            >
              {level.featured && (
                <div className="featured-badge">ยอดนิยม</div>
              )}
              <div className="level-icon">
                <i className={`fas ${level.icon}`} />
              </div>
              <div className="level-info">
                <h4>{level.title}</h4>
                <p>{level.range}</p>
                <span className="course-count">{level.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-modern">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              พร้อมเปลี่ยนวิธีการเรียนคณิตแบบเดิม ๆ แล้วหรือยัง?
            </h2>
            <button type="button" className="btn-cta-primary">
              <span>ดูคอร์สเรียน</span>
              <i className="fas fa-arrow-right" />
              <div className="btn-particles">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <div className="cta-decoration">
            <div className="decoration-circle circle-1" />
            <div className="decoration-circle circle-2" />
            <div className="decoration-circle circle-3" />
          </div>
        </div>
      </div>
    </section>
  )
}
