import { Link } from '@tanstack/react-router'
import { SignupForm } from './SignupForm'
import { SignupBenefits } from './SignupBenefits'

export function SignupPage() {
  return (
    <div className="signup-page">
      <Link to="/" className="back-home">
        <i className="fas fa-arrow-left" />
        <span>กลับหน้าหลัก</span>
      </Link>

      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-left">
            <div className="signup-header">
              <div className="logo-container">
                <img src="/img/mmd-logo.png" alt="Math My Day Logo" />
              </div>
              <h1 className="signup-title">สมัครสมาชิก</h1>
              <p className="signup-subtitle">
                เริ่มต้นการเรียนรู้คณิตศาสตร์อย่างสนุกสนาน
              </p>
            </div>
            <SignupForm />
          </div>

          <SignupBenefits />
        </div>
      </div>
    </div>
  )
}
