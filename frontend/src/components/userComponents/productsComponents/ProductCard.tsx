import { StockItem } from "@/data/mektaba-stock";
import { CAT_ACCENT, CAT_GRADIENTS, CAT_ICON, CAT_TEXT, formatMAD, STATUS_MAP, stockStatus } from "@/helpers/productHelper";

function ProductCard({
  item,
  onClick,
}: {
  item: StockItem;
  onClick: () => void;
}) {
  const status = stockStatus(item);
  const st = STATUS_MAP[status];
  const grad = CAT_GRADIENTS[item.category];
  const accent = CAT_ACCENT[item.category];
  const stockPct = Math.min(100, Math.round((item.stock / (item.minStock * 5)) * 100));

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      {/* Top colour band */}
      <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${grad}`}>
        <span className="text-4xl select-none">{CAT_ICON[item.category]}</span>
        {/* Status dot */}
        <span
          className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full ring-2 ring-white ${st.dot}`}
        />
        {/* Category pill */}
        <span
          className={`absolute bottom-3 left-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${CAT_TEXT[item.category]} bg-white/70 backdrop-blur-sm`}
        >
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-[10px] font-mono text-zinc-400">{item.id}</p>
          <h3 className="mt-0.5 text-sm font-semibold leading-tight text-zinc-800 line-clamp-2">
            {item.name}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-400" dir="rtl">
            {item.nameAr}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <span className="text-base font-bold text-zinc-900">
            {formatMAD(item.price)}
          </span>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${st.pill}`}
          >
            <st.icon size={11} />
            {st.label}
          </span>
        </div>

        {/* Mini stock bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>Stock</span>
            <span className="font-medium text-zinc-600">{item.stock} / min {item.minStock}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className={`h-full rounded-full transition-all ${accent}`}
              style={{ width: `${stockPct}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default ProductCard;