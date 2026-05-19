import { createFileRoute } from '@tanstack/react-router'
import { SignupPage } from '@features/auth'
import signupCss from '@shared/styles/signup.css?url'

export const Route = createFileRoute('/signup')({
  head: () => ({
    meta: [{ title: 'สมัครสมาชิก - Math My Day' }],
    links: [{ rel: 'stylesheet', href: signupCss }],
  }),
  component: SignupRoute,
})

function SignupRoute() {
  return <SignupPage />
}
