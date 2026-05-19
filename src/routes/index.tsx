import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@shared/components/layout'
import {
  BannerSlider,
  MemberAccessSection,
  FeaturesSection,
  PortfolioSection,
  CoursesSection,
  CtaSection,
} from '@features/home'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <MainLayout>
      <BannerSlider />
      <MemberAccessSection />
      <FeaturesSection />
      <PortfolioSection />
      <CoursesSection />
      <CtaSection />
    </MainLayout>
  )
}
