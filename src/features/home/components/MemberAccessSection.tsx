import { memberBenefits } from '../data'

export function MemberAccessSection() {
  return (
    <section className="member-access-section" id="membership">
      <div className="member-container">
        <div className="member-layout">
          <div className="member-left">
            <div className="member-header">
              <div className="member-badge">
                <i className="fas fa-ticket-alt" />
                <span>Member Access</span>
              </div>
              <h2 className="member-title">
                สำหรับผู้เรียนที่ต้องการคำแนะนำ
                <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>
                  อย่างสม่ำเสมอ
                </span>
              </h2>
              <p className="member-subtitle">
                สิ่งที่ได้รับเมื่อสมัคร Member (รายเดือน)
              </p>
            </div>

            <div className="benefits-list">
              {memberBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className={
                    benefit.highlight
                      ? 'benefit-item highlight-benefit'
                      : 'benefit-item'
                  }
                >
                  <i
                    className={
                      benefit.highlight
                        ? 'fas fa-star'
                        : 'fas fa-check-circle'
                    }
                  />
                  <div className="benefit-text">
                    <strong>{benefit.bold}</strong>
                    {benefit.rest}
                    {benefit.subBenefits && (
                      <ul className="sub-benefits">
                        {benefit.subBenefits.map((sub) => (
                          <li key={sub}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="member-right">
            <div className="pricing-box">
              <div className="trial-badge">
                <i className="fas fa-gift" />
                ทดลองใช้ฟรี 1 อาทิตย์
              </div>
              <div className="pricing-header">
                <i className="fas fa-crown" />
                <h3>Member Access</h3>
              </div>
              <div className="price-display">
                <span className="price-number">69</span>
                <span className="price-unit">บาท/เดือน</span>
              </div>
              <button type="button" className="btn-subscribe">
                สมัคร Membership
              </button>
              <p className="pricing-note">ยกเลิกได้ทุกเมื่อ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
