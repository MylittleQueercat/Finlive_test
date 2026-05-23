interface Props {
  category: string;
  sortBy: string;
  order: 'asc' | 'desc';
  onCategoryChange: (v: string) => void;
  onSortByChange: (v: string) => void;
  onOrderChange: (v: 'asc' | 'desc') => void;
}

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price', label: 'Price' },
  { value: 'name', label: 'Name' },
  { value: 'stock', label: 'Stock' },
];

const selectCls =
  'appearance-none text-sm border border-gray-200 rounded-lg pl-3 pr-8 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-shadow cursor-pointer';

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 whitespace-nowrap">
      {children}
    </span>
  );
}

export default function Filters({ category, sortBy, order, onCategoryChange, onSortByChange, onOrderChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-3">
        <Label>Category</Label>
        <SelectWrapper>
          <select value={category} onChange={e => onCategoryChange(e.target.value)} className={selectCls}>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </SelectWrapper>
      </div>

      <div className="flex items-center gap-3">
        <Label>Sort by</Label>
        <SelectWrapper>
          <select value={sortBy} onChange={e => onSortByChange(e.target.value)} className={selectCls}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </SelectWrapper>
      </div>

      <div className="flex items-center gap-3">
        <Label>Order</Label>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(['asc', 'desc'] as const).map(o => (
            <button
              key={o}
              onClick={() => onOrderChange(o)}
              className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-150 ${
                order === o
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-400 hover:bg-gray-50'
              }`}
            >
              {o === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
