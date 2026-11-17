import { GenderFilter } from '../data/jackets';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
  onSelectCategory: (category: GenderFilter) => void;
}

export function Navbar({ bagCount, onOpenBag, onSelectCategory }: NavbarProps) {
  const handleNavFilter = (category: GenderFilter) => {
    onSelectCategory(category);
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#090A0D]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#D4A853] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
        >
          MK
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#D1D5DB]" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => handleNavFilter('All')}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#D4A853] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => handleNavFilter('Boys')}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#D4A853] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            Boys
          </button>
          <button
            type="button"
            onClick={() => handleNavFilter('Girls')}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#D4A853] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            Girls
          </button>
          <a
            href="#craftsmanship"
            className="hover:text-white hover:underline underline-offset-4 decoration-[#D4A853] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            Fit Guide
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="px-4 py-2 bg-[#D4A853] text-[#090A0D] text-sm font-semibold rounded-lg hover:bg-[#E2BA6B] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
          >
            Bag ({bagCount})
          </button>
        </div>
      </div>
    </header>
  );
}
