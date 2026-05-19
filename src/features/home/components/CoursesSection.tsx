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
    </section>
  )
}
