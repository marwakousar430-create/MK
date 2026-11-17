import { Bookmark, Check, Search, SlidersHorizontal, X } from 'lucide-react';
import { AgeBracket, GenderFilter, JacketProduct } from '../data/jackets';
import { SafeImage } from './SafeImage';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface CollectionSectionProps {
  jackets: JacketProduct[];
  genderFilter: GenderFilter;
  onGenderChange: (gender: GenderFilter) => void;
  ageFilter: AgeBracket;
  onAgeChange: (age: AgeBracket) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlySaved: boolean;
  onToggleOnlySaved: () => void;
  favoriteIds: string[];
  onToggleFavorite: (jacketId: string) => void;
  compareIds: string[];
  onToggleCompare: (jacketId: string) => void;
  onOpenCompare: () => void;
  onClearCompare: () => void;
  onSelectJacket: (jacket: JacketProduct) => void;
}

const GENDER_OPTIONS: GenderFilter[] = ['All', 'Boys', 'Girls', 'Unisex'];
const AGE_OPTIONS: { value: AgeBracket; shortLabel: string }[] = [
  { value: 'All Ages', shortLabel: 'All Ages' },
  { value: 'Toddlers (2-5Y)', shortLabel: 'Toddlers 2–5Y' },
  { value: 'Kids (6-10Y)', shortLabel: 'Kids 6–10Y' },
  { value: 'Juniors (11-14Y)', shortLabel: 'Juniors 11–14Y' },
  { value: 'Teens & Adults (15Y+)', shortLabel: 'Teens & Adults 15+' },
];

export function CollectionSection({
  jackets,
  genderFilter,
  onGenderChange,
  ageFilter,
  onAgeChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onlySaved,
  onToggleOnlySaved,
  favoriteIds,
  onToggleFavorite,
  compareIds,
  onToggleCompare,
  onOpenCompare,
  onClearCompare,
  onSelectJacket,
}: CollectionSectionProps) {
  const hasActiveFilters =
    genderFilter !== 'All' ||
    ageFilter !== 'All Ages' ||
    searchQuery.trim() !== '' ||
    onlySaved;

  const resetFilters = () => {
    onGenderChange('All');
    onAgeChange('All Ages');
    onSearchChange('');
    onSortChange('featured');
    if (onlySaved) onToggleOnlySaved();
  };

  return (
    <section id="collection" className="py-16 lg:py-20 bg-[#0D0F14]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#D4A853] mb-2">
              Signature Crest Collection
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white">
              All-Age MK Outerwear
            </h2>
          </div>
          <p className="text-sm text-[#9CA3AF] tabular-nums">
            Showing {jackets.length} {jackets.length === 1 ? 'jacket' : 'jackets'} · Every piece displays the MK crest
          </p>
        </div>

        {/* Interactive Filter & Search Toolbar */}
        <div className="py-6 flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Gender Segmented Control */}
              <div className="inline-flex items-center p-1 bg-[#161A23] border border-white/8 rounded-lg" role="group" aria-label="Filter by gender">
                {GENDER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onGenderChange(option)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                      genderFilter === option
                        ? 'bg-[#D4A853] text-[#090A0D]'
                        : 'text-[#D1D5DB] hover:text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Age Group Segmented Control */}
              <div className="flex flex-wrap items-center p-1 bg-[#161A23] border border-white/8 rounded-lg" role="group" aria-label="Filter by age group">
                {AGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onAgeChange(option.value)}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                      ageFilter === option.value
                        ? 'bg-white text-[#090A0D] font-semibold'
                        : 'text-[#D1D5DB] hover:text-white'
                    }`}
                  >
                    {option.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Search, Saved Filter & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search jackets..."
                  aria-label="Search jackets"
                  className="w-full pl-10 pr-9 py-2.5 bg-[#161A23] border border-white/12 rounded-lg text-sm text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4A853] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onToggleOnlySaved}
                className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer tabular-nums ${
                  onlySaved
                    ? 'bg-[#D4A853] text-[#090A0D] border-[#D4A853]'
                    : 'bg-[#161A23] text-[#D1D5DB] border-white/12 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current' : ''}`} />
                <span>Saved ({favoriteIds.length})</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sort jackets"
                className="px-3.5 py-2.5 bg-[#161A23] border border-white/12 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-[#D4A853] cursor-pointer whitespace-nowrap shrink-0"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Compare Bar */}
          {compareIds.length > 0 && (
            <div className="px-4 py-3 bg-[#161A23] border border-[#D4A853]/35 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#F3F4F6]">
                <SlidersHorizontal className="w-4 h-4 text-[#D4A853]" />
                <span className="tabular-nums">
                  <strong>{compareIds.length}</strong> of 3 jackets selected for comparison
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClearCompare}
                  className="text-xs text-[#9CA3AF] hover:text-white cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={onOpenCompare}
                  disabled={compareIds.length < 2}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    compareIds.length >= 2
                      ? 'bg-[#D4A853] text-[#090A0D] hover:bg-[#E2BA6B] cursor-pointer'
                      : 'bg-white/10 text-[#9CA3AF] cursor-not-allowed'
                  }`}
                >
                  {compareIds.length < 2 ? 'Select 1 more to compare' : `Compare Now (${compareIds.length})`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {jackets.length === 0 ? (
          <div className="py-16 px-6 text-center bg-[#12151C] border border-white/10 rounded-xl">
            <p className="font-display text-lg font-semibold text-white mb-2">
              {onlySaved ? 'No saved jackets yet' : 'No MK jackets match those filters'}
            </p>
            <p className="text-sm text-[#9CA3AF] mb-6">
              {onlySaved
                ? 'Bookmark jackets you like to compare styles and sizes across age groups.'
                : 'Try clearing your search or switching back to all age groups.'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#D4A853] text-[#090A0D] text-sm font-semibold rounded-lg hover:bg-[#E2BA6B] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jackets.map((jacket) => {
              const isSaved = favoriteIds.includes(jacket.id);
              const isCompared = compareIds.includes(jacket.id);

              return (
                <article
                  key={jacket.id}
                  className="group bg-[#12151C] border border-white/10 rounded-xl overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:border-[#D4A853]/45 flex flex-col"
                >
                  {/* 4:3 Studio Product Media */}
                  <div className="relative aspect-[4/3] w-full bg-[#0A0C10] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onSelectJacket(jacket)}
                      className="w-full h-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D4A853]"
                    >
                      <SafeImage
                        src={jacket.image}
                        alt={`${jacket.name} in ${jacket.colorName} with MK chest logo`}
                        fallbackTitle={jacket.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Subtle Saved Bookmark Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(jacket.id)}
                      aria-label={isSaved ? `Remove ${jacket.name} from saved` : `Save ${jacket.name}`}
                      className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#D4A853] text-[#090A0D] border-[#D4A853]'
                          : 'bg-black/55 text-white border-white/15 hover:border-[#D4A853]'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Uniform Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Quiet unboxed metadata with typographic separator */}
                      <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                        <span>
                          {jacket.category} <span aria-hidden="true">·</span> {jacket.ageSpanLabel}
                        </span>
                        <span className="font-mono text-[11px] text-[#D4A853]">{jacket.shortTag}</span>
                      </div>

                      {/* Title & Price */}
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-base font-semibold text-white leading-snug">
                          <button
                            type="button"
                            onClick={() => onSelectJacket(jacket)}
                            className="text-left hover:text-[#D4A853] transition-colors cursor-pointer"
                          >
                            {jacket.name}
                          </button>
                        </h3>
                        <span className="text-[15px] font-semibold text-[#D4A853] tabular-nums shrink-0">
                          ${jacket.price}
                        </span>
                      </div>

                      <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-1">
                        {jacket.crestDetail}
                      </p>
                      <p className="font-mono text-[11px] text-[#6B7280] mt-1.5 tabular-nums truncate">
                        Sizes: {jacket.sizes.map((s) => s.label).join(' · ')}
                      </p>
                    </div>

                    {/* Color Swatch + Compare + Select Action */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                          style={{ backgroundColor: jacket.colorHex }}
                          aria-hidden="true"
                        />
                        <span className="text-xs text-[#D1D5DB] truncate">{jacket.colorName}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onToggleCompare(jacket.id)}
                          aria-pressed={isCompared}
                          className={`px-2.5 py-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
                            isCompared
                              ? 'bg-white text-[#090A0D] border-white'
                              : 'bg-transparent text-[#9CA3AF] border-white/15 hover:text-white'
                          }`}
                        >
                          {isCompared && <Check className="w-3 h-3" />}
                          <span>Compare</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectJacket(jacket)}
                          className="px-3.5 py-2 bg-[#D4A853] text-[#090A0D] text-xs font-semibold rounded-lg hover:bg-[#E2BA6B] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
                        >
                          Select Size
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
