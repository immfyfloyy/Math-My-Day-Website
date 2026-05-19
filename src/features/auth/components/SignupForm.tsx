import { useState } from 'react'
import { useSignupForm } from '../hooks'
import { educationOptions } from '../data'

export function SignupForm() {
  const { data, alert, submitting, handleChange, handleSubmit, dismissAlert } =
    useSignupForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {alert && (
        <div className={`custom-alert show alert-${alert.type}`} role="alert">
          <i
            className={
              alert.type === 'success'
                ? 'fas fa-check-circle'
                : alert.type === 'error'
                  ? 'fas fa-times-circle'
                  : 'fas fa-info-circle'
            }
          />
          <span>{alert.message}</span>
          <button
            type="button"
            className="alert-close"
            onClick={dismissAlert}
            aria-label="ปิดข้อความ"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="fullname">
          <i className="fas fa-user" />
          ชื่อ-นามสกุล
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="กรอกชื่อ-นามสกุล"
          value={data.fullname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          <i className="fas fa-envelope" />
          อีเมล
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          <i className="fas fa-phone" />
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="0xx-xxx-xxxx"
          value={data.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="education">
          <i className="fas fa-graduation-cap" />
          ระดับการศึกษา
        </label>
        <select
          id="education"
          name="education"
          value={data.education}
          onChange={handleChange}
          required
        >
          {educationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="password">
          <i className="fas fa-lock" />
          รหัสผ่าน
        </label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="สร้างรหัสผ่าน"
            value={data.password}
            onChange={handleChange}
            minLength={6}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
          >
            <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
          </button>
        </div>
        <small className="form-hint">
          รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">
          <i className="fas fa-lock" />
          ยืนยันรหัสผ่าน
        </label>
        <div className="password-field">
          <input
            type={showConfirm ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="ยืนยันรหัสผ่านอีกครั้ง"
            value={data.confirmPassword}
            onChange={handleChange}
            minLength={6}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
          >
            <i className={showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'} />
          </button>
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={data.terms}
            onChange={handleChange}
            required
          />
          <span className="checkbox-custom" />
          <span className="checkbox-text">
            ฉันยอมรับ{' '}
            <a href="#" className="link">
              ข้อกำหนดและเงื่อนไข
            </a>{' '}
            และ{' '}
            <a href="#" className="link">
              นโยบายความเป็นส่วนตัว
            </a>
          </span>
        </label>
      </div>

      <button type="submit" className="btn-submit" disabled={submitting}>
        <span>{submitting ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}</span>
        <i className="fas fa-arrow-right" />
      </button>

      <div className="divider">
        <span>หรือสมัครด้วย</span>
      </div>

      <div className="social-buttons">
        <button type="button" className="btn-social btn-google">
          <i className="fab fa-google" />
          <span>Google</span>
        </button>
        <button type="button" className="btn-social btn-facebook">
          <i className="fab fa-facebook-f" />
          <span>Facebook</span>
        </button>
      </div>

      <div className="form-footer">
        <p>
          มีบัญชีอยู่แล้ว?{' '}
          <a href="#" className="link">
            เข้าสู่ระบบ
          </a>
        </p>
      </div>
    </form>
  )
}
