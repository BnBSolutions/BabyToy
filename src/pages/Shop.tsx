import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, LayoutGrid } from 'lucide-react';
import bunnyPink from '@/assets/products/bunny-pink.jpg';
import bearMoonlight from '@/assets/products/bear-moonlight.jpg';

const productsWithImages = products.map((p, i) => ({
  ...p,
  images: [i === 0 ? bunnyPink : i === 1 ? bearMoonlight : p.images[0]],
}));

const Shop: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('newest');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: [],
    price: [],
    age: [],
  });

  const filterOptions = {
    category: [
      { key: 'comforters', label: t.nav.comforters },
      { key: 'plush', label: t.nav.plushToys },
      { key: 'puppets', label: t.nav.puppets },
      { key: 'music-boxes', label: t.nav.musicBoxes },
    ],
    price: [
      { key: 'under20', label: t.finder.budgets.under20 },
      { key: 'under40', label: t.finder.budgets.under40 },
      { key: 'under60', label: t.finder.budgets.under60 },
      { key: 'over60', label: t.finder.budgets.over60 },
    ],
    age: [
      { key: 'newborn', label: t.finder.ages.newborn },
      { key: 'baby', label: t.finder.ages.baby },
      { key: 'toddler', label: t.finder.ages.toddler },
      { key: 'child', label: t.finder.ages.child },
    ],
  };

  const sortOptions = [
    { key: 'newest', label: t.categories.newest },
    { key: 'popular', label: t.categories.popular },
    { key: 'price-asc', label: t.categories.priceAsc },
    { key: 'price-desc', label: t.categories.priceDesc },
  ];

  const toggleFilter = (category: string, key: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(key)
        ? prev[category].filter(k => k !== key)
        : [...prev[category], key],
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ category: [], price: [], age: [] });
  };

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  const filteredProducts = useMemo(() => {
    let result = [...productsWithImages];

    // Apply category filter
    if (activeFilters.category.length > 0) {
      result = result.filter(p => activeFilters.category.includes(p.category));
    }

    // Apply price filter
    if (activeFilters.price.length > 0) {
      result = result.filter(p => {
        if (activeFilters.price.includes('under20')) return p.price < 20;
        if (activeFilters.price.includes('under40')) return p.price >= 20 && p.price < 40;
        if (activeFilters.price.includes('under60')) return p.price >= 40 && p.price < 60;
        if (activeFilters.price.includes('over60')) return p.price >= 60;
        return true;
      });
    }

    // Apply URL filters
    const filterParam = searchParams.get('filter');
    if (filterParam === 'new') {
      result = result.filter(p => p.isNew);
    } else if (filterParam === 'bestseller') {
      result = result.filter(p => p.isBestseller);
    }

    // Apply sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return result;
  }, [activeFilters, sortBy, searchParams]);

  const FilterSection = ({ title, options, filterKey }: { 
    title: string; 
    options: { key: string; label: string }[]; 
    filterKey: string;
  }) => (
    <div className="mb-6">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label
            key={option.key}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                activeFilters[filterKey].includes(option.key)
                  ? 'bg-primary border-primary'
                  : 'border-border group-hover:border-primary/50'
              }`}
            >
              {activeFilters[filterKey].includes(option.key) && (
                <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm">{option.label}</span>
            <input
              type="checkbox"
              className="sr-only"
              checked={activeFilters[filterKey].includes(option.key)}
              onChange={() => toggleFilter(filterKey, option.key)}
            />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-soft py-12 lg:py-16">
        <div className="container">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
            {t.nav.shop}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {t.categories.results}
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{t.categories.filters}</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    {t.categories.clearFilters}
                  </button>
                )}
              </div>

              <FilterSection
                title={t.finder.typeLabel}
                options={filterOptions.category}
                filterKey="category"
              />
              <FilterSection
                title={t.finder.budgetLabel}
                options={filterOptions.price}
                filterKey="price"
              />
              <FilterSection
                title={t.finder.ageLabel}
                options={filterOptions.age}
                filterKey="age"
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {t.categories.showFilters}
                    {hasActiveFilters && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {Object.values(activeFilters).flat().length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
                  <SheetHeader className="mb-6">
                    <div className="flex items-center justify-between">
                      <SheetTitle>{t.categories.filters}</SheetTitle>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-primary hover:underline"
                        >
                          {t.categories.clearFilters}
                        </button>
                      )}
                    </div>
                  </SheetHeader>
                  <div className="overflow-y-auto pb-20">
                    <FilterSection
                      title={t.finder.typeLabel}
                      options={filterOptions.category}
                      filterKey="category"
                    />
                    <FilterSection
                      title={t.finder.budgetLabel}
                      options={filterOptions.price}
                      filterKey="price"
                    />
                    <FilterSection
                      title={t.finder.ageLabel}
                      options={filterOptions.age}
                      filterKey="age"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                    <Button
                      className="w-full"
                      onClick={() => setFiltersOpen(false)}
                    >
                      {t.common.apply} ({filteredProducts.length} {t.categories.results})
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm bg-transparent border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {sortOptions.map(option => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Grid Toggle - Desktop */}
                <div className="hidden lg:flex items-center gap-1 border rounded-lg p-1">
                  <button
                    onClick={() => setGridCols(2)}
                    className={`p-1.5 rounded ${gridCols === 2 ? 'bg-muted' : ''}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded ${gridCols === 3 ? 'bg-muted' : ''}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded ${gridCols === 4 ? 'bg-muted' : ''}`}
                  >
                    <div className="grid grid-cols-4 gap-0.5 w-4 h-4">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="bg-current rounded-sm" />
                      ))}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(activeFilters).flatMap(([category, keys]) =>
                  keys.map(key => {
                    const option = filterOptions[category as keyof typeof filterOptions]?.find(o => o.key === key);
                    return option ? (
                      <button
                        key={`${category}-${key}`}
                        onClick={() => toggleFilter(category, key)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                      >
                        {option.label}
                        <X className="h-3 w-3" />
                      </button>
                    ) : null;
                  })
                )}
              </div>
            )}

            {/* Products Grid */}
            <div
              className={`grid gap-4 lg:gap-6 ${
                gridCols === 2
                  ? 'grid-cols-2'
                  : gridCols === 3
                  ? 'grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  {t.common.error}
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  {t.categories.clearFilters}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
