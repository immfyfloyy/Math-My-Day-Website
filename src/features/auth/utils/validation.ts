import type { SignupFormData } from '../types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSignup(data: SignupFormData): string | null {
  if (
    !data.fullname ||
    !data.email ||
    !data.phone ||
    !data.education ||
    !data.password ||
    !data.confirmPassword
  ) {
    return 'กรุณากรอกข้อมูลให้ครบทุกช่อง'
  }
  if (!EMAIL_REGEX.test(data.email)) {
    return 'รูปแบบอีเมลไม่ถูกต้อง'
  }
  if (data.password.length < 6) {
    return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
  }
  if (data.password !== data.confirmPassword) {
    return 'รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง'
  }
  if (!data.terms) {
    return 'กรุณายอมรับข้อกำหนดและเงื่อนไข'
  }
  return null
}
