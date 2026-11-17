import { HERO_CAMPAIGN_IMAGE } from '../data/jackets';

interface HeroProps {
  onShopNow: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
  return (
    <section id="top" className="border-b border-white/10 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#D4A853] mb-4">
                MK Outerwear · Boys &amp; Girls · Ages 2 to Adult
              </p>
              <h1
                className="font-display font-bold tracking-tight text-white leading-[1.06] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)' }}
              >
                Bold luxury jackets for every age, crowned with MK.
              </h1>
              <p className="text-base text-[#D1D5DB] leading-relaxed max-w-md mb-8 tracking-[0.01em]">
                Engineered for toddlers, kids, juniors, and teens. From emerald leather-sleeve varsity bombers to ruby satin puffers, every silhouette features the signature MK crest on the chest.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onShopNow}
                  className="px-6 py-3 bg-[#D4A853] text-[#090A0D] text-sm font-semibold rounded-lg hover:bg-[#E2BA6B] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
                >
                  Shop Collection
                </button>
                <a
                  href="#craftsmanship"
                  className="text-sm font-semibold text-white hover:text-[#D4A853] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  All-Age Fit Matrix
                </a>
              </div>
            </div>

            {/* Clean unboxed specification footer inside hero */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-display font-semibold text-sm text-white">Ages 2–18+</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">Toddler to Adult</div>
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-[#D4A853]">Gold MK Crest</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">On every jacket</div>
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-white">4-Season Shells</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">Satin, wool &amp; down</div>
              </div>
            </div>
          </div>

          {/* Right Campaign Imagery Column */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden bg-[#12151C] border border-white/10 min-h-[340px] lg:min-h-[500px]">
            <img
              src={HERO_CAMPAIGN_IMAGE}
              alt="Boy, girl, and toddler wearing colorful luxury MK jackets with gold embroidered MK crest on each chest"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs">
              <span className="font-medium tracking-wide text-[#F3F4F6]">MK Signature Crest Lookbook</span>
              <span className="text-[#D4A853] font-medium tabular-nums">Boys · Girls · All Ages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
