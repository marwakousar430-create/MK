import { ALL_AGE_FIT_MATRIX, AgeBracket, JACKETS, JacketProduct, LOOKBOOK_FEATURES } from '../data/jackets';
import { SafeImage } from './SafeImage';

interface CraftsmanshipSectionProps {
  onSelectBracket: (bracket: AgeBracket) => void;
  onSelectJacket: (jacket: JacketProduct) => void;
}

export function CraftsmanshipSection({ onSelectBracket, onSelectJacket }: CraftsmanshipSectionProps) {
  const handlePickBracket = (bracket: AgeBracket) => {
    onSelectBracket(bracket);
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLookbookJacket = (jacketId: string) => {
    const found = JACKETS.find((j) => j.id === jacketId);
    if (found) onSelectJacket(found);
  };

  return (
    <section id="craftsmanship" className="bg-[#090A0D] border-t border-white/10 text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Editorial Lookbook & Crest Macro Gallery */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#D4A853] mb-2">
                Editorial Lookbook &amp; Craft
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white">
                Worn Across Every Generation
              </h2>
            </div>
            <p className="text-sm text-[#9CA3AF]">
              Tap any editorial portrait to inspect the featured MK jacket
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {LOOKBOOK_FEATURES.map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => handleOpenLookbookJacket(feature.linkedJacketId)}
                className="group bg-[#12151C] border border-white/10 rounded-xl overflow-hidden text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-[#D4A853]/50 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full bg-[#0A0C10] overflow-hidden">
                  <SafeImage
                    src={feature.image}
                    alt={feature.title}
                    fallbackTitle={feature.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-3 w-full">
                  <div>
                    <h3 className="font-display text-base font-semibold text-white group-hover:text-[#D4A853] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                      {feature.subtitle}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#D4A853]">
                    <span>{feature.actionLabel}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Construction Story + Interactive All-Age Fit Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Story: Signature MK Mark */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#D4A853] mb-3">
              Signature Construction
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white mb-5">
              Every jacket wears the MK crest.
            </h2>
            <p className="text-sm text-[#D1D5DB] leading-relaxed mb-8">
              Whether fitted for a two-year-old’s shearling teddy bomber or a teenager’s cobalt racing leather, every piece is reinforced at the seams and crowned with our gold or silver MK chest emblem.
            </p>

            <div className="space-y-5 border-t border-white/10 pt-6">
              <div>
                <h3 className="font-display text-sm font-semibold text-white">
                  01. Bullion Embroidery &amp; Metallic Medallions
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  High-density bullion stitching and brushed-gold MK badges resist abrasion through active outdoor wear.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-white">
                  02. Graded Proportions Across All Ages
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  Each age bracket uses its own anatomical block—never a shrunk adult pattern—giving toddlers comfort and teens crisp tailoring.
                </p>
              </div>
            </div>
          </div>

          {/* Right Fit Matrix Table */}
          <div className="lg:col-span-7 bg-[#12151C] border border-white/10 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
              <h3 className="font-display text-lg font-semibold text-white">
                All-Age Sizing &amp; Fit Matrix
              </h3>
              <span className="text-xs text-[#D4A853]">Click an age row to shop that bracket</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/12 text-xs uppercase tracking-wider text-[#9CA3AF]">
                    <th className="py-3 pr-4 font-medium">Age Bracket</th>
                    <th className="py-3 pr-4 font-medium">Tag Sizes</th>
                    <th className="py-3 pr-4 font-medium">Height</th>
                    <th className="py-3 font-medium">Chest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 text-sm">
                  {ALL_AGE_FIT_MATRIX.map((row) => (
                    <tr
                      key={row.bracket}
                      onClick={() => handlePickBracket(row.bracket)}
                      className="align-top hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 pr-4 font-medium text-white whitespace-nowrap">
                        <span className="group-hover:text-[#D4A853] transition-colors">
                          {row.bracket}
                        </span>
                        <div className="text-xs font-normal text-[#9CA3AF] whitespace-normal mt-1 max-w-xs">
                          {row.fitNotes}
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-mono text-xs text-[#D1D5DB] tabular-nums whitespace-nowrap">
                        {row.sizes}
                      </td>
                      <td className="py-4 pr-4 text-xs text-[#D1D5DB] tabular-nums whitespace-nowrap">
                        {row.heightRange}
                      </td>
                      <td className="py-4 text-xs text-[#D1D5DB] tabular-nums whitespace-nowrap">
                        {row.chestRange}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
