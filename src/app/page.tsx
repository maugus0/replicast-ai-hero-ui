import {
  Hero,
  About,
  AboutKiosk,
  Features,
  ContactCTA,
  JayaGrocers,
  BreezeCollab,
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
      <BreezeCollab />
    </>
  )
}
