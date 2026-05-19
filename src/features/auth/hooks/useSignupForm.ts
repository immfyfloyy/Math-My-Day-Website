import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSignupMutation } from './useSignupMutation'
import {
  initialSignupForm,
  type AlertState,
  type EducationLevel,
  type SignupFormData,
} from '../types'
import { formatPhone, validateSignup } from '../utils'

export function useSignupForm() {
  const [data, setData] = useState<SignupFormData>(initialSignupForm)
  const [alert, setAlert] = useState<AlertState | null>(null)
  const navigate = useNavigate()
  const mutation = useSignupMutation()

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const target = e.target
    const { name, value } = target
    if (name === 'phone') {
      setData((prev) => ({ ...prev, phone: formatPhone(value) }))
      return
    }
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setData((prev) => ({ ...prev, terms: target.checked }))
      return
    }
    setData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const error = validateSignup(data)
    if (error) {
      setAlert({ message: error, type: 'error' })
      return
    }

    mutation.mutate(
      {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        education: data.education as EducationLevel,
        password: data.password,
      },
      {
        onSuccess: () => {
          setAlert({
            message: 'สมัครสมาชิกสำเร็จ! กำลังนำคุณไปยังหน้าหลัก...',
            type: 'success',
          })
          setTimeout(() => navigate({ to: '/' }), 1500)
        },
        onError: (err) => {
          setAlert({ message: err.message, type: 'error' })
        },
      },
    )
  }

  return {
    data,
    alert,
    submitting: mutation.isPending,
    handleChange,
    handleSubmit,
    dismissAlert: () => setAlert(null),
  }
}
