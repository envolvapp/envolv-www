import { cn } from '@/lib/utils'

/**
 * Marks something the product doesn't do yet. Teal, not gold: gold is
 * rationed to "Most popular" / "save ~17%" (see BRAND.md), and a roadmap
 * marker shouldn't shout louder than the features that actually ship.
 */
export default function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'ml-2 inline-block rounded-full border border-teal-500/40 px-1.5 py-px align-[1px] text-[10px] font-semibold tracking-wide text-teal-500 uppercase',
        className,
      )}
    >
      Soon
    </span>
  )
}
