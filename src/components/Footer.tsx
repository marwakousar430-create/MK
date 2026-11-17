import { GenderFilter } from '../data/jackets';

interface FooterProps {
  onSelectCategory: (category: GenderFilter) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const jumpToCollection = (cat: GenderFilter) => {
    onSelectCategory(cat);
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090A0D] border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-display text-lg font-bold tracking-tight text-[#D4A853]">
            MK Outerwear
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Boys &amp; Girls Jackets · Toddlers through Adult Sizing · Signature MK Crest
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#D1D5DB]">
          <button
            type="button"
            onClick={() => jumpToCollection('Boys')}
            className="hover:text-[#D4A853] transition-colors cursor-pointer"
          >
            Boys Jackets
          </button>
          <button
            type="button"
            onClick={() => jumpToCollection('Girls')}
            className="hover:text-[#D4A853] transition-colors cursor-pointer"
          >
            Girls Jackets
          </button>
          <a href="#craftsmanship" className="hover:text-[#D4A853] transition-colors">
            Fit Matrix
          </a>
          <span className="text-[#6B7280]">© 2026 MK Outerwear</span>
        </div>
      </div>
    </footer>
  );
}
