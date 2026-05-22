import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@shared/components/layout'
import {
  BannerSlider,
  MemberAccessSection,
  FeaturesSection,
  TutorsSection,
  PortfolioSection,
  CoursesSection,
} from '@features/home'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <MainLayout>
      <BannerSlider />
      <FeaturesSection />
      <CoursesSection />
      <TutorsSection />
      <MemberAccessSection />
      <PortfolioSection />
    </MainLayout>
  )
}
