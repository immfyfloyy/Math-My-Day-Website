import type {
  ApiErrorResponse,
  SignupRequest,
  SignupSuccessResponse,
} from '../types'

export class AuthApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = 'AuthApiError'
  }
}

export async function signup(
  payload: SignupRequest,
): Promise<SignupSuccessResponse> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = (await response
      .json()
      .catch(() => null)) as ApiErrorResponse | null
    throw new AuthApiError(
      data?.error ?? 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง',
      response.status,
    )
  }

  return (await response.json()) as SignupSuccessResponse
}
