import { useState, useEffect } from 'react';
import { getProducts } from './api';
import type { Product } from './api';
import ProductCard from './components/ProductCard';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
// import './App.css';

const LIMIT = 8;

interface FetchState {
  products: Product[];
  totalCount: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: FetchState = {
  products: [],
  totalCount: 0,
  totalPages: 0,
  loading: true,
  error: null,
};

export default function App() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [fetchState, setFetchState] = useState<FetchState>(initialState);

  useEffect(() => {
    let cancelled = false;
    setFetchState(s => ({ ...s, loading: true, error: null }));

    getProducts({
      page,
      limit: LIMIT,
      category: category || undefined,
      sortBy: sortBy || undefined,
      order,
    })
      .then(res => {
        if (cancelled) return;
        setFetchState({
          products: res.data,
          totalCount: res.metadata.totalCount,
          totalPages: res.metadata.totalPages,
          loading: false,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Something went wrong.';
        setFetchState(s => ({ ...s, loading: false, error: message }));
      });

    return () => { cancelled = true; };
  }, [page, category, sortBy, order]);

  function handleCategoryChange(v: string) { setCategory(v); setPage(1); }
  function handleSortByChange(v: string) { setSortBy(v); setPage(1); }
  function handleOrderChange(v: 'asc' | 'desc') { setOrder(v); setPage(1); }

  const { products, totalCount, totalPages, loading, error } = fetchState;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Catalog</h1>
            <span className="text-xs uppercase tracking-widest text-gray-300 font-medium hidden sm:inline">
              Curated Collection
            </span>
          </div>
          <span className="text-sm text-gray-400 tabular-nums">
            {!loading && !error && `${totalCount} products`}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-10 pb-8 border-b border-gray-100">
          <Filters
            category={category}
            sortBy={sortBy}
            order={order}
            onCategoryChange={handleCategoryChange}
            onSortByChange={handleSortByChange}
            onOrderChange={handleOrderChange}
          />
        </div>

        {/* Loading — skeleton grid */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="h-5 w-20 bg-gray-100 rounded-full mb-5" />
                <div className="h-4 w-3/4 bg-gray-100 rounded mb-2.5" />
                <div className="h-3 bg-gray-100 rounded mb-1.5" />
                <div className="h-3 w-2/3 bg-gray-100 rounded mb-8" />
                <div className="pt-4 border-t border-gray-50 flex justify-between">
                  <div className="h-5 w-16 bg-gray-100 rounded" />
                  <div className="h-4 w-14 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
            <span className="text-5xl select-none">⚠︎</span>
            <p className="text-gray-900 font-semibold text-lg">{error}</p>
            <p className="text-sm text-gray-400 max-w-xs">
              Could not load products. Please check your connection and try again.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
            <span className="text-5xl select-none text-gray-300">∅</span>
            <p className="text-gray-900 font-semibold text-lg">No products found</p>
            <p className="text-sm text-gray-400">Try adjusting or clearing your filters.</p>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-14">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </main>
    </div>
  );
}
