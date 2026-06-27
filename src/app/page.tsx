import {
  Hero,
  About,
  AboutKiosk,
  Features,
  ContactCTA,
  JayaGrocers,
  BrezzeCollab,
  PartnershipsGallery,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutKiosk />
      <Features />
      <About />
      <ContactCTA />
      <JayaGrocers />
      <PartnershipsGallery />
      <BrezzeCollab />
    </>
  )
}
