import { StockItem } from "@/data/mektaba-stock";
import { CAT_ACCENT, CAT_GRADIENTS, CAT_ICON, formatMAD, STATUS_MAP, stockStatus } from "@/helpers/productHelper";

function ProductRow({
  item,
  onClick,
}: {
  item: StockItem;
  onClick: () => void;
}) {
  const status = stockStatus(item);
  const st = STATUS_MAP[status];
  const accent = CAT_ACCENT[item.category];

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-xl border border-zinc-100 bg-white px-5 py-3.5 text-left shadow-sm transition-all duration-150 hover:border-zinc-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${CAT_GRADIENTS[item.category]} text-xl`}
      >
        {CAT_ICON[item.category]}
      </div>

      {/* Name */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-800">{item.name}</p>
        <p className="text-[10px] font-mono text-zinc-400">{item.id} · {item.category}</p>
      </div>

      {/* Stock bar */}
      <div className="hidden w-28 sm:block">
        <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
          <span>{item.stock}</span>
          <span>min {item.minStock}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className={`h-full rounded-full ${accent}`}
            style={{
              width: `${Math.min(100, Math.round((item.stock / (item.minStock * 5)) * 100))}%`,
            }}
          />
        </div>
      </div>

      {/* Price */}
      <span className="hidden w-24 shrink-0 text-right text-sm font-bold text-zinc-900 sm:block">
        {formatMAD(item.price)}
      </span>

      {/* Status */}
      <span
        className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${st.pill}`}
      >
        <st.icon size={11} />
        {st.label}
      </span>
    </button>
  );
}

export default ProductRow;