export type EducationLevel =
  | 'elementary'
  | 'junior'
  | 'senior'
  | 'government'
  | 'other'

export interface SignupFormData {
  fullname: string
  email: string
  phone: string
  education: EducationLevel | ''
  password: string
  confirmPassword: string
  terms: boolean
}

export const initialSignupForm: SignupFormData = {
  fullname: '',
  email: '',
  phone: '',
  education: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

export interface AlertState {
  message: string
  type: 'success' | 'error' | 'info'
}

// ── API contract (shared between client and server) ─────────────

export interface SignupRequest {
  fullname: string
  email: string
  phone: string
  education: EducationLevel
  password: string
}

export interface SignupSuccessResponse {
  user: {
    id: string
    email: string
    fullname: string
  }
}

export interface ApiErrorResponse {
  error: string
}
