import type { Product } from '../api';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const stock =
    product.stock > 10
      ? { label: 'In Stock', cls: 'text-emerald-500' }
      : product.stock > 0
      ? { label: `Only ${product.stock} left`, cls: 'text-amber-500' }
      : { label: 'Out of Stock', cls: 'text-red-400' };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
      <span className="self-start text-[10px] uppercase tracking-widest font-semibold text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
        {product.category}
      </span>

      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-gray-900 font-semibold text-base leading-snug group-hover:text-gray-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-gray-900 font-bold text-xl tracking-tight">
          €{product.price.toFixed(2)}
        </span>
        <span className={`text-xs font-medium ${stock.cls}`}>
          {stock.label}
        </span>
      </div>
    </div>
  );
}
