import Image from 'next/image'

/**
 * The "envolv" wordmark with the Embrace-ring "o" (Sean's final, 2026-10-26).
 * Two variants, swapped by the visitor's light/dark setting: white letters on
 * dark surfaces, emerald letters on light ones. Originals are in brand-src/.
 * 1409×361 viewBox → 28px tall ≈ 109px wide.
 */
export default function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <>
      <Image
        src="/brand/envolv-logo-light.svg"
        alt="Envolv"
        width={109}
        height={28}
        priority={priority}
        unoptimized
        className="block dark:hidden"
      />
      <Image
        src="/brand/envolv-logo-dark.svg"
        alt="Envolv"
        width={109}
        height={28}
        priority={priority}
        unoptimized
        className="hidden dark:block"
      />
    </>
  )
}
