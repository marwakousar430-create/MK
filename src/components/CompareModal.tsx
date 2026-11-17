import { X } from 'lucide-react';
import { useEffect } from 'react';
import { JacketProduct } from '../data/jackets';
import { SafeImage } from './SafeImage';

interface CompareModalProps {
  jackets: JacketProduct[];
  isOpen: boolean;
  onClose: () => void;
  onSelectJacket: (jacket: JacketProduct) => void;
  onRemoveCompare: (jacketId: string) => void;
}

export function CompareModal({
  jackets,
  isOpen,
  onClose,
  onSelectJacket,
  onRemoveCompare,
}: CompareModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || jackets.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-title"
      onClick={onClose}
    >
      <div
        className="bg-[#12151C] text-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/12 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#D4A853]">
              Side-by-Side Specification
            </p>
            <h2 id="compare-title" className="font-display text-2xl font-bold text-white mt-1">
              Compare MK Jackets ({jackets.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="p-2 text-[#9CA3AF] hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`grid grid-cols-1 ${jackets.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 pt-6`}>
          {jackets.map((jacket) => (
            <div
              key={jacket.id}
              className="bg-[#090A0D] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-[#0A0C10]">
                  <SafeImage
                    src={jacket.image}
                    alt={jacket.name}
                    fallbackTitle={jacket.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#9CA3AF] mb-1">
                      <span>{jacket.category} · {jacket.ageSpanLabel}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveCompare(jacket.id)}
                        className="text-xs text-[#9CA3AF] hover:text-white underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-white">{jacket.name}</h3>
                      <span className="font-display text-base font-bold text-[#D4A853] tabular-nums">
                        ${jacket.price}
                      </span>
                    </div>
                  </div>

                  <dl className="space-y-3 text-xs border-t border-white/10 pt-3">
                    <div>
                      <dt className="text-[#9CA3AF]">Colorway</dt>
                      <dd className="text-white font-medium mt-0.5">{jacket.colorName}</dd>
                    </div>
                    <div>
                      <dt className="text-[#9CA3AF]">Weather Rating</dt>
                      <dd className="text-white font-medium mt-0.5">{jacket.weatherRating}</dd>
                    </div>
                    <div>
                      <dt className="text-[#9CA3AF]">MK Crest</dt>
                      <dd className="text-[#D1D5DB] mt-0.5">{jacket.crestDetail}</dd>
                    </div>
                    <div>
                      <dt className="text-[#9CA3AF]">Available Sizes</dt>
                      <dd className="font-mono text-[#D4A853] mt-0.5 tabular-nums">
                        {jacket.sizes.map((s) => s.label).join(' · ')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectJacket(jacket);
                  }}
                  className="w-full py-2.5 bg-[#D4A853] hover:bg-[#E2BA6B] text-[#090A0D] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Select Size &amp; Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
