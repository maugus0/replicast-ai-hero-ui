'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteConfig } from '@/content/siteConfig'

const GALLERY_ITEMS = [
  {
    id: 'sats',
    title: 'SATS Global Connect 2025',
    timeAgo: '7 months ago',
    images: ['/images/SATS.jpeg', '/images/SATS2.jpeg'],
    description:
      'What happens when a C-level executive has a key segment to deliver at your annual global conference but is also scheduled to receive a Presidential award at a separate ceremony?',
    highlight:
      'Thanks to the bold and innovative team at SATS Ltd. — we delivered the solution with our first digital twin taking to the stage and delivering keynote snippets to thousands of on-site and online attendees!',
    tags: ['#DigitalTwin', '#Keynote', '#Innovation', '#SATS'],
  },
  {
    id: 'fintech',
    title: 'Singapore FinTech Festival 2025',
    timeAgo: '7 months ago',
    images: ['/images/SingaporeFinTechFestival2025.jpeg'],
    description:
      'Here at Singapore FinTech Festival 2025! Come experience our digital humans in action at booth 4K39 in Hall 4.',
    tags: ['#FinTech', '#Singapore', '#Exhibition'],
  },
  {
    id: 'govware-mbs',
    title: 'GovWare 2025 at Marina Bay Sands',
    timeAgo: '8 months ago',
    images: ['/images/MarinaBaySandsExpo.jpeg', '/images/Singtel-MBS-Expo2.jpeg'],
    description:
      "Here at Marina Bay Sands Expo Hall B for the highly anticipated GovWare 2025! Powered by our partner Singtel Global Services, we're bringing two of their digital twins to life — engaging guests with insights on Singtel 5G+, Quantum-Safe Networks, Digital Workspaces, and their Connected Intelligence capabilities.",
    tags: ['#GovWare', '#MBS', '#Singtel'],
  },
  {
    id: 'singtel-code',
    title: 'Singtel Centre of Digital Excellence',
    timeAgo: '9 months ago',
    images: ['/images/Singtel.jpeg'],
    description:
      'Replicast is privileged to be part of Singtel Centre of Digital Excellence (CODE)! Over the last 2 months, we have co-pitched to enterprises across a range of industries, bringing pain points and gaps in customer experience into supercharged holographic interactions powered by Singtel 5G+.',
    highlight:
      'For its official launch, Luna, our Singtel ambassador, accompanied the opening speech — kicking off this milestone by embodying Singtel\'s vision of "Smart Design for Smart Solutions".',
    tags: ['#5G+', '#Enterprise', '#DigitalTwin'],
  },
  {
    id: 'nvidia',
    title: 'NVIDIA Inception Program',
    timeAgo: '11 months ago',
    images: ['/images/NVIDIA.jpeg'],
    description:
      "We've been accepted into the NVIDIA Inception Program and are really stoked to join this global network of over 25,000 startups to accelerate AI innovation!",
    tags: ['#AI', '#Startup', '#Innovation'],
  },
]

function GallerySection({ item, index }: { item: (typeof GALLERY_ITEMS)[0]; index: number }) {
  const basePath = siteConfig.basePath || ''
  const hasMultipleImages = item.images.length > 1

  return (
    <div id={item.id} className="scroll-mt-24">
      {/* Text Section - Before Image */}
      <section className="bg-slate-50 py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
        >
          <span className="inline-block rounded-full bg-[#6366f1] px-3 py-1 text-xs font-medium text-white sm:text-sm">
            {item.timeAgo}
          </span>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            {item.title}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
            {item.description}
          </p>
          {item.highlight && (
            <p className="mx-auto mt-3 max-w-2xl text-sm italic leading-relaxed text-slate-700 sm:text-base">
              {item.highlight}
            </p>
          )}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-[#6366f1] sm:text-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Image Section - After Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`${hasMultipleImages ? 'grid md:grid-cols-2' : ''}`}
      >
        {item.images.map((img, imgIndex) => (
          <div
            key={imgIndex}
            className={`relative w-full overflow-hidden ${
              item.id === 'nvidia'
                ? 'aspect-[16/9] bg-[#76b900]'
                : 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]'
            }`}
          >
            <Image
              src={`${basePath}${img}`}
              alt={`${item.title} - Image ${imgIndex + 1}`}
              fill
              className={item.id === 'nvidia' ? 'object-contain' : 'object-cover'}
              sizes={hasMultipleImages ? '(max-width: 768px) 100vw, 50vw' : '100vw'}
              priority={index === 0}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function PartnershipsGallery() {
  return (
    <section>
      {/* Gallery sections - no header above first item */}
      {GALLERY_ITEMS.map((item, index) => (
        <GallerySection key={item.id} item={item} index={index} />
      ))}

      {/* Bottom CTA - White background, styled as part of the page */}
      <div className="bg-white py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Want to be part of our <span className="text-[#6366f1]">journey</span>?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Let&apos;s connect and explore how we can transform your customer experience together.
          </p>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-6 rounded-lg bg-slate-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:px-10 sm:py-3.5 sm:text-base"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  )
}
