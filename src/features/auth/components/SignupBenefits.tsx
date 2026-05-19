import { signupBenefits, signupStats } from '../data'

export function SignupBenefits() {
  return (
    <div className="signup-right">
      <div className="benefits-header">
        <h2>ทำไมต้องเป็นสมาชิก?</h2>
        <p>สิทธิพิเศษที่คุณจะได้รับ</p>
      </div>

      <div className="benefits-list">
        {signupBenefits.map((benefit) => (
          <div key={benefit.title} className="benefit-item">
            <div className="benefit-icon">
              <i className={`fas ${benefit.icon}`} />
            </div>
            <div className="benefit-content">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="success-stats">
        {signupStats.map((stat) => (
          <div key={stat.label} className="stat-box">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
