/**
 * Neutral project preview frame.
 *
 * When a real screenshot exists it is rendered lazily with fixed dimensions
 * to avoid layout shift. Otherwise an abstract wireframe stands in — clearly
 * decorative, never pretending to be a capture of the product.
 */
export default function ProjectMedia({ image, imageAlt }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-line bg-surface-2">
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.015]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="aspect-[16/9] w-full overflow-hidden bg-[#0b1424] p-4 sm:p-5"
        >
          <div className="flex h-full flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/20" />
              <span className="ml-2 h-1.5 w-16 rounded-full bg-ink-3/15" />
            </div>

            <div className="mt-1 flex flex-1 gap-3">
              <div className="hidden w-1/5 flex-col gap-2 rounded-sm border border-white/5 bg-white/[0.015] p-2 sm:flex">
                <span className="h-1.5 w-3/4 rounded-full bg-ink-3/25" />
                <span className="h-1.5 w-1/2 rounded-full bg-ink-3/15" />
                <span className="h-1.5 w-2/3 rounded-full bg-ink-3/15" />
                <span className="mt-auto h-1.5 w-1/2 rounded-full bg-accent/25" />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex gap-2">
                  <span className="h-8 flex-1 rounded-sm border border-white/5 bg-white/[0.02]" />
                  <span className="h-8 flex-1 rounded-sm border border-white/5 bg-white/[0.02]" />
                  <span className="h-8 flex-1 rounded-sm border border-white/5 bg-white/[0.02]" />
                </div>

                <div className="flex-1 rounded-sm border border-white/5 bg-white/[0.02] p-2.5">
                  <span className="block h-1.5 w-1/3 rounded-full bg-accent/20" />
                  <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-ink-3/15" />
                  <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-ink-3/10" />
                  <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-ink-3/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5"
      />
    </div>
  )
}
