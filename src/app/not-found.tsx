import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="holo-text mb-6 text-8xl font-bold">404</div>
        <h1 className="mb-4 text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mb-8 text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="from-holo-cyan to-holo-purple text-bg-deep inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-medium transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
