import { tutors } from '../data'

export function TutorsSection() {
  const tutor = tutors[0]

  return (
    <section className="tutors-section" id="tutors">
      <div className="tutors-container">
        <div className="section-header">
          <h2 className="section-title">
            ผู้สอนและ<span className="text-gradient">ที่ปรึกษาด้านการเรียน</span>
          </h2>
          <p className="section-subtitle">
            ผู้เชี่ยวชาญที่อยู่เคียงข้างคุณ ตั้งแต่วันแรกจนถึงวันสอบ
          </p>
        </div>

        <article className="tutor-card">
          <div className="tutor-image-wrap">
            <div className="tutor-image-frame">
              <img
                src={tutor.image}
                alt={`รูปติวเตอร์ ${tutor.name}`}
                className="tutor-image tutor-image-base"
                draggable={false}
              />
              <img
                src={tutor.smileImage}
                alt=""
                className="tutor-image tutor-image-smile"
                draggable={false}
                aria-hidden="true"
              />
              <div className="tutor-image-gradient" aria-hidden="true" />
              <div className="tutor-image-shine" aria-hidden="true" />
            </div>

            <div className="tutor-speech" aria-hidden="true">
              <span className="tutor-speech-text">
                งงสูตรไหน เดี๋ยวสอนให้ร้อง “อ๋อ!”
              </span>
            </div>
          </div>

          <div className="tutor-info">
            <div className="tutor-name-block">
              <h3 className="tutor-name">{tutor.name}</h3>
              <span className="tutor-nickname">{tutor.nickname}</span>
            </div>

            <div className="tutor-meta">
              <div className="tutor-meta-item">
                <i className="fas fa-graduation-cap" />
                <span>{tutor.education}</span>
              </div>
              <div className="tutor-meta-item">
                <i className="fas fa-briefcase" />
                <span>{tutor.experience}</span>
              </div>
            </div>

            <blockquote className="tutor-quote">
              <i className="fas fa-quote-left" />
              <span>{tutor.quote}</span>
              <i className="fas fa-quote-right tutor-quote-end" />
            </blockquote>

            <div className="tutor-stats">
              {tutor.stats.map((s) => (
                <div key={s.label} className="tutor-stat">
                  <div className="tutor-stat-value">{s.value}</div>
                  <div className="tutor-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="tutor-columns">
              <div className="tutor-column">
                <h4 className="tutor-col-title">
                  <i className="fas fa-bullseye" /> ความเชี่ยวชาญ
                </h4>
                <ul className="tutor-list">
                  {tutor.specialties.map((sp) => (
                    <li key={sp}>{sp}</li>
                  ))}
                </ul>
              </div>
              <div className="tutor-column">
                <h4 className="tutor-col-title">
                  <i className="fas fa-trophy" /> ผลงานที่ภาคภูมิใจ
                </h4>
                <ul className="tutor-list">
                  {tutor.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
