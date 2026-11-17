import { useEffect, useMemo, useState } from 'react';
import { BagItem, CartDrawer, ConfirmedOrder } from './components/CartDrawer';
import { CollectionSection, SortOption } from './components/CollectionSection';
import { CompareModal } from './components/CompareModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  AgeBracket,
  GenderFilter,
  JACKETS,
  JacketProduct,
  SizeOption,
} from './data/jackets';
import {
  fetchJacketsFromSupabase,
  fetchSavedFavoritesFromSupabase,
  SubmitOrderPayload,
  submitOrderToSupabase,
  syncSavedFavoriteToSupabase,
} from './services/mkStoreService';

const BAG_STORAGE_KEY = 'mk_outerwear_bag_v1';
const SAVED_STORAGE_KEY = 'mk_outerwear_saved_v1';
const ORDER_STORAGE_KEY = 'mk_outerwear_last_order_v1';

export default function App() {
  const [jackets, setJackets] = useState<JacketProduct[]>(JACKETS);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('All');
  const [ageFilter, setAgeFilter] = useState<AgeBracket>('All Ages');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlySaved, setOnlySaved] = useState(false);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [selectedJacket, setSelectedJacket] = useState<JacketProduct | null>(null);
  const [bagItems, setBagItems] = useState<BagItem[]>(() => {
    try {
      const saved = localStorage.getItem(BAG_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as BagItem[]) : [];
    } catch {
      return [];
    }
  });
  const [lastOrder, setLastOrder] = useState<ConfirmedOrder | null>(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ConfirmedOrder) : null;
    } catch {
      return null;
    }
  });
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Load catalog & saved favorites from Supabase on initial mount
  useEffect(() => {
    let active = true;
    fetchJacketsFromSupabase().then((remoteJackets) => {
      if (active && remoteJackets.length > 0) {
        setJackets(remoteJackets);
      }
    });
    fetchSavedFavoritesFromSupabase().then((remoteSaved) => {
      if (active && remoteSaved !== null) {
        setFavoriteIds((prev) => Array.from(new Set([...prev, ...remoteSaved])));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bagItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [bagItems]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [favoriteIds]);

  const filteredJackets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matched = jackets.filter((jacket) => {
      const matchesGender =
        genderFilter === 'All'
          ? true
          : genderFilter === 'Unisex'
            ? jacket.category === 'Unisex'
            : jacket.category === genderFilter || jacket.category === 'Unisex';

      const matchesAge =
        ageFilter === 'All Ages' || jacket.brackets.includes(ageFilter);

      const matchesSaved = !onlySaved || favoriteIds.includes(jacket.id);

      const matchesSearch =
        query === '' ||
        jacket.name.toLowerCase().includes(query) ||
        jacket.colorName.toLowerCase().includes(query) ||
        jacket.description.toLowerCase().includes(query) ||
        jacket.crestDetail.toLowerCase().includes(query);

      return matchesGender && matchesAge && matchesSaved && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      return [...matched].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...matched].sort((a, b) => b.price - a.price);
    }
    return matched;
  }, [jackets, genderFilter, ageFilter, searchQuery, sortBy, onlySaved, favoriteIds]);

  const compareJackets = useMemo(
    () => jackets.filter((j) => compareIds.includes(j.id)),
    [jackets, compareIds],
  );

  const bagCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + item.quantity, 0),
    [bagItems],
  );

  const handleToggleFavorite = (jacketId: string) => {
    const willSave = !favoriteIds.includes(jacketId);
    setFavoriteIds((prev) =>
      willSave ? [...prev, jacketId] : prev.filter((id) => id !== jacketId),
    );
    void syncSavedFavoriteToSupabase(jacketId, willSave);
  };

  const handleToggleCompare = (jacketId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(jacketId)) {
        return prev.filter((id) => id !== jacketId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), jacketId];
      }
      return [...prev, jacketId];
    });
  };

  const handleAddToBag = (jacket: JacketProduct, size: SizeOption) => {
    setBagItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.jacket.id === jacket.id && item.size.label === size.label,
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { jacket, size, quantity: 1 }];
    });
  };

  const handleUpdateQty = (jacketId: string, sizeLabel: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.jacket.id === jacketId && item.size.label === sizeLabel
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (jacketId: string, sizeLabel: string) => {
    setBagItems((prev) =>
      prev.filter(
        (item) => !(item.jacket.id === jacketId && item.size.label === sizeLabel),
      ),
    );
  };

  const handleSubmitOrder = async (payload: SubmitOrderPayload): Promise<ConfirmedOrder> => {
    const order = await submitOrderToSupabase(payload);
    setBagItems([]);
    setLastOrder(order);
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch {
      // Ignore storage quota errors
    }
    return order;
  };

  const handleShopNow = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0D] text-[#F3F4F6]">
      <Navbar
        bagCount={bagCount}
        onOpenBag={() => setIsBagOpen(true)}
        onSelectCategory={setGenderFilter}
      />

      <main className="flex-1">
        <Hero onShopNow={handleShopNow} />

        <CollectionSection
          jackets={filteredJackets}
          genderFilter={genderFilter}
          onGenderChange={setGenderFilter}
          ageFilter={ageFilter}
          onAgeChange={setAgeFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlySaved={onlySaved}
          onToggleOnlySaved={() => setOnlySaved((prev) => !prev)}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          compareIds={compareIds}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareOpen(true)}
          onClearCompare={() => setCompareIds([])}
          onSelectJacket={setSelectedJacket}
        />

        <CraftsmanshipSection
          onSelectBracket={setAgeFilter}
          onSelectJacket={setSelectedJacket}
        />
      </main>

      <Footer onSelectCategory={setGenderFilter} />

      <ProductDetailModal
        jacket={selectedJacket}
        isFavorite={selectedJacket ? favoriteIds.includes(selectedJacket.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedJacket(null)}
        onAddToBag={handleAddToBag}
        onOpenBag={() => setIsBagOpen(true)}
      />

      <CompareModal
        jackets={compareJackets}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectJacket={setSelectedJacket}
        onRemoveCompare={handleToggleCompare}
      />

      <CartDrawer
        isOpen={isBagOpen}
        items={bagItems}
        lastOrder={lastOrder}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
}
