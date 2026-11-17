import { Bookmark, Check, Ruler, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { JacketProduct, SizeOption } from '../data/jackets';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  jacket: JacketProduct | null;
  isFavorite: boolean;
  onToggleFavorite: (jacketId: string) => void;
  onClose: () => void;
  onAddToBag: (jacket: JacketProduct, size: SizeOption) => void;
  onOpenBag: () => void;
}

export function ProductDetailModal({
  jacket,
  isFavorite,
  onToggleFavorite,
  onClose,
  onAddToBag,
  onOpenBag,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [zoomCrest, setZoomCrest] = useState(false);
  const [showFitFinder, setShowFitFinder] = useState(false);
  const [finderAge, setFinderAge] = useState<number>(8);
  const [finderHeightCm, setFinderHeightCm] = useState<number>(130);

  useEffect(() => {
    if (jacket) {
      setSelectedSize(jacket.sizes[Math.min(1, jacket.sizes.length - 1)] || jacket.sizes[0]);
      setJustAdded(false);
      setZoomCrest(false);
      setShowFitFinder(false);
    }
  }, [jacket]);

  useEffect(() => {
    if (!jacket) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [jacket, onClose]);

  const recommendedSize = useMemo(() => {
    if (!jacket || !showFitFinder) return null;
    const exactMatch = jacket.sizes.find(
      (s) =>
        (finderHeightCm >= s.minHeightCm && finderHeightCm <= s.maxHeightCm) ||
        (finderAge >= s.minAge && finderAge <= s.maxAge),
    );
    if (exactMatch) return exactMatch;
    if (finderHeightCm < jacket.sizes[0].minHeightCm) return jacket.sizes[0];
    return jacket.sizes[jacket.sizes.length - 1];
  }, [jacket, showFitFinder, finderAge, finderHeightCm]);

  useEffect(() => {
    if (showFitFinder && recommendedSize) {
      setSelectedSize(recommendedSize);
      setJustAdded(false);
    }
  }, [showFitFinder, recommendedSize]);

  if (!jacket || !selectedSize) return null;

  const handleAdd = () => {
    onAddToBag(jacket, selectedSize);
    setJustAdded(true);
  };

  const handleOpenBag = () => {
    onClose();
    onOpenBag();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="bg-[#12151C] text-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-white/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Studio Gallery */}
          <div className="md:col-span-6 bg-[#0A0C10] flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-white/10">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#090A0D] relative">
              <SafeImage
                src={jacket.image}
                alt={`${jacket.name} featuring signature MK emblem`}
                fallbackTitle={jacket.name}
                className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                  zoomCrest ? 'scale-150 origin-[62%_38%]' : 'scale-100'
                }`}
              />
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#D1D5DB] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-white">MK Branding Placement</span>
                <button
                  type="button"
                  onClick={() => setZoomCrest((prev) => !prev)}
                  className="text-xs font-semibold text-[#D4A853] hover:underline underline-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {zoomCrest ? 'Reset View' : 'Inspect MK Crest'}
                </button>
              </div>
              <p>{jacket.crestDetail}</p>
              <p className="text-[#9CA3AF]">{jacket.weatherRating}</p>
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="text-xs uppercase tracking-wider text-[#9CA3AF]">
                  {jacket.category} <span aria-hidden="true">·</span> {jacket.sku}
                </div>
                <div className="flex items-center gap-1 -mr-2 -mt-2">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(jacket.id)}
                    aria-label={isFavorite ? 'Remove from saved' : 'Save jacket'}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      isFavorite ? 'text-[#D4A853]' : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close product details"
                    className="p-2 text-[#9CA3AF] hover:text-white rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-baseline justify-between gap-4 mb-3">
                <h2 id="pdp-title" className="font-display text-2xl font-bold text-white">
                  {jacket.name}
                </h2>
                <span className="font-display text-xl font-bold text-[#D4A853] tabular-nums shrink-0">
                  ${jacket.price}
                </span>
              </div>

              <p className="text-sm text-[#D1D5DB] leading-relaxed mb-5">
                {jacket.description}
              </p>

              {/* Smart Fit Finder Toggle & Controls */}
              <div className="mb-5">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-semibold text-white">Select Age &amp; Size</span>
                  <button
                    type="button"
                    onClick={() => setShowFitFinder((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A853] hover:underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showFitFinder ? 'Hide Fit Finder' : 'Smart Fit Finder'}</span>
                  </button>
                </div>

                {showFitFinder && (
                  <div className="mb-3.5 p-3.5 rounded-xl bg-[#090A0D] border border-[#D4A853]/35 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#D1D5DB]">Enter age &amp; height for instant fit</span>
                      {recommendedSize && (
                        <span className="font-semibold text-[#D4A853] tabular-nums">
                          Best Fit: {recommendedSize.label}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#9CA3AF] mb-1 tabular-nums" htmlFor="fit-age">
                          Age: {finderAge >= 18 ? '18+ Yrs' : `${finderAge} Yrs`}
                        </label>
                        <input
                          id="fit-age"
                          type="range"
                          min={2}
                          max={18}
                          value={finderAge}
                          onChange={(e) => setFinderAge(Number(e.target.value))}
                          className="w-full accent-[#D4A853] cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#9CA3AF] mb-1 tabular-nums" htmlFor="fit-height">
                          Height: {finderHeightCm} cm
                        </label>
                        <input
                          id="fit-height"
                          type="range"
                          min={88}
                          max={190}
                          value={finderHeightCm}
                          onChange={(e) => setFinderHeightCm(Number(e.target.value))}
                          className="w-full accent-[#D4A853] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs text-[#9CA3AF] mb-2.5 tabular-nums">
                  {selectedSize.ageRange} · Chest {selectedSize.chestCm} · Length {selectedSize.lengthCm}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {jacket.sizes.map((size) => {
                    const active = selectedSize.label === size.label;
                    const isRec = showFitFinder && recommendedSize?.label === size.label;
                    return (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setJustAdded(false);
                        }}
                        className={`px-3 py-2.5 rounded-lg border text-left transition-colors duration-150 cursor-pointer relative ${
                          active
                            ? 'bg-[#D4A853] text-[#090A0D] border-[#D4A853]'
                            : 'bg-[#161A23] text-white border-white/12 hover:border-white/35'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold whitespace-nowrap">{size.label}</span>
                          {isRec && (
                            <span className={`text-[10px] font-bold uppercase ${active ? 'text-[#090A0D]' : 'text-[#D4A853]'}`}>
                              Fit
                            </span>
                          )}
                        </div>
                        <div className={`text-[11px] mt-0.5 whitespace-nowrap ${active ? 'text-[#090A0D]/80' : 'text-[#9CA3AF]'}`}>
                          {size.ageRange}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specifications */}
              <ul className="space-y-2 border-t border-white/10 pt-4 mb-6 text-xs text-[#D1D5DB]">
                {jacket.fabricSpecs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2">
                    <span className="text-[#D4A853] font-bold" aria-hidden="true">·</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 bg-[#D4A853] hover:bg-[#E2BA6B] text-[#090A0D] text-sm font-semibold rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {selectedSize.label}</span>
                  </>
                ) : (
                  <span>Add to Bag — ${jacket.price}</span>
                )}
              </button>

              {justAdded && (
                <button
                  type="button"
                  onClick={handleOpenBag}
                  className="py-3.5 px-5 bg-white hover:bg-[#E5E7EB] text-[#090A0D] text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Open Bag
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
