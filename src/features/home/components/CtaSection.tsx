export function CtaSection() {
  return (
    <section className="cta-modern">
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
    </section>
  )
}
