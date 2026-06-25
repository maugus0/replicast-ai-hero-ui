import sharp from 'sharp'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const BRAND_URLS = {
  logoGif:
    'https://cdn.prod.website-files.com/68483cc63ee33c4fe7dd3999/685010cfd67156f57cc9b84a_Ai-file-(1).gif',
  faviconPng:
    'https://cdn.prod.website-files.com/68483cc63ee33c4fe7dd3999/685039b46bf756da293598d4_FavIcon%20(1).png',
  webclipPng:
    'https://cdn.prod.website-files.com/68483cc63ee33c4fe7dd3999/685039a942110e1c0414a44a_Webclip%20(1).png',
} as const

const BRAND_FILES = {
  logoGif: 'logo.gif',
  faviconSource: 'favicon-source.png',
  webclipSource: 'webclip-source.png',
  logoFrame: 'logo-frame.png',
} as const

const publicDir = join(process.cwd(), 'public')
const brandDir = join(publicDir, 'images', 'brand')
const imagesDir = join(publicDir, 'images')

async function downloadAsset(url: string, dest: string): Promise<void> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(dest, buffer)
  console.log(`Downloaded ${dest}`)
}

async function ensureBrandAssets(fetchRemote: boolean): Promise<void> {
  mkdirSync(brandDir, { recursive: true })

  const assets = [
    { url: BRAND_URLS.logoGif, file: BRAND_FILES.logoGif },
    { url: BRAND_URLS.faviconPng, file: BRAND_FILES.faviconSource },
    { url: BRAND_URLS.webclipPng, file: BRAND_FILES.webclipSource },
  ]

  for (const { url, file } of assets) {
    const dest = join(brandDir, file)
    if (fetchRemote || !existsSync(dest)) {
      await downloadAsset(url, dest)
    }
  }

  const logoFramePath = join(brandDir, BRAND_FILES.logoFrame)
  if (fetchRemote || !existsSync(logoFramePath)) {
    const gifPath = join(brandDir, BRAND_FILES.logoGif)
    await sharp(gifPath, { animated: false }).png().toFile(logoFramePath)
    console.log(`Extracted logo frame to ${logoFramePath}`)
  }
}

async function generateFavicons(): Promise<void> {
  const faviconSource = join(brandDir, BRAND_FILES.faviconSource)
  const webclipSource = join(brandDir, BRAND_FILES.webclipSource)

  await sharp(faviconSource).resize(16, 16).png().toFile(join(publicDir, 'favicon-16x16.png'))
  await sharp(webclipSource).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'))
  await sharp(faviconSource).resize(32, 32).png().toFile(join(publicDir, 'favicon.ico'))

  console.log('Generated favicon.ico, favicon-16x16.png, apple-touch-icon.png')
}

async function generateOgImage(): Promise<void> {
  mkdirSync(imagesDir, { recursive: true })

  const logoFramePath = join(brandDir, BRAND_FILES.logoFrame)
  const logoBuffer = await sharp(logoFramePath).resize(180, 180).png().toBuffer()
  const logoBase64 = logoBuffer.toString('base64')

  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0A0F"/>
      <stop offset="50%" stop-color="#12121A"/>
      <stop offset="100%" stop-color="#0A0A0F"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="rgba(0,212,255,0.15)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
    <linearGradient id="tagline" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00D4FF"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <image href="data:image/png;base64,${logoBase64}" x="120" y="205" width="180" height="180"/>
  <text x="348" y="290" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700">Replicast AI</text>
  <text x="348" y="350" fill="url(#tagline)" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="600">Holographic AI Digital Humans</text>
  <text x="348" y="400" fill="#9CA3AF" font-family="Arial, Helvetica, sans-serif" font-size="24">Talk, react, and serve — on kiosks, in holograms, across industries.</text>
</svg>`

  await sharp(Buffer.from(svg)).png().toFile(join(imagesDir, 'og-image.png'))
  console.log('Generated public/images/og-image.png')
}

function writeLogoPlaceholder(): void {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
  <rect width="120" height="40" rx="6" fill="#1A1A24"/>
  <text x="60" y="25" text-anchor="middle" fill="#6B7280" font-family="sans-serif" font-size="12">Logo</text>
</svg>`
  writeFileSync(join(imagesDir, 'logo-placeholder.svg'), svg)
  console.log('Generated public/images/logo-placeholder.svg')
}

function writeWebManifest(): void {
  const manifest = {
    name: 'Replicast AI',
    short_name: 'Replicast',
    description: 'Holographic AI Digital Humans',
    start_url: '/replicast-ai_pk/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#0A0A0F',
    icons: [
      { src: '/replicast-ai_pk/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { src: '/replicast-ai_pk/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
  writeFileSync(join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2))
  console.log('Generated public/site.webmanifest')
}

async function main(): Promise<void> {
  const fetchRemote = process.argv.includes('--fetch')
  console.log('Ensuring brand assets...')
  await ensureBrandAssets(fetchRemote)
  console.log('Generating favicons...')
  await generateFavicons()
  console.log('Generating OG image...')
  await generateOgImage()
  writeLogoPlaceholder()
  writeWebManifest()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
