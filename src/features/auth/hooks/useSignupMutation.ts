import { useMutation } from '@tanstack/react-query'
import { signup, AuthApiError } from '../services'
import type { SignupRequest, SignupSuccessResponse } from '../types'

export function useSignupMutation() {
  return useMutation<SignupSuccessResponse, AuthApiError, SignupRequest>({
    mutationFn: signup,
  })
}
