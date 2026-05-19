import { createFileRoute } from '@tanstack/react-router'
import { createUser, findUserByEmail, hashPassword } from '@shared/server'
import type {
  ApiErrorResponse,
  SignupRequest,
  SignupSuccessResponse,
} from '@features/auth/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function badRequest(error: string): Response {
  return Response.json({ error } satisfies ApiErrorResponse, { status: 400 })
}

export const Route = createFileRoute('/api/auth/signup')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Partial<SignupRequest>
        try {
          body = (await request.json()) as Partial<SignupRequest>
        } catch {
          return badRequest('รูปแบบข้อมูลไม่ถูกต้อง')
        }

        const { fullname, email, phone, education, password } = body
        if (!fullname || !email || !phone || !education || !password) {
          return badRequest('กรุณากรอกข้อมูลให้ครบทุกช่อง')
        }
        if (!EMAIL_REGEX.test(email)) {
          return badRequest('รูปแบบอีเมลไม่ถูกต้อง')
        }
        if (password.length < 6) {
          return badRequest('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
        }

        if (findUserByEmail(email)) {
          return Response.json(
            { error: 'อีเมลนี้ถูกใช้สมัครไปแล้ว' } satisfies ApiErrorResponse,
            { status: 409 },
          )
        }

        const passwordHash = await hashPassword(password)
        const user = createUser({
          fullname,
          email,
          phone,
          education,
          passwordHash,
        })

        const payload: SignupSuccessResponse = {
          user: {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
          },
        }
        return Response.json(payload, { status: 201 })
      },
    },
  },
})
