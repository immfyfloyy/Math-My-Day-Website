import { createFileRoute } from '@tanstack/react-router'
import { TcasCalculatorPage } from '@features/tcas'
import tcasCss from '@features/tcas/styles/tcas.css?url'

export const Route = createFileRoute('/tcas-calculator')({
  head: () => ({
    meta: [{ title: 'เช็กคะแนนยื่นมหาลัย - Math My Day' }],
    links: [{ rel: 'stylesheet', href: tcasCss }],
  }),
  component: TcasCalculatorRoute,
})

function TcasCalculatorRoute() {
  return <TcasCalculatorPage />
}
