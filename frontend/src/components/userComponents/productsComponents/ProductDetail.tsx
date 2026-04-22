import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StockItem } from "@/data/mektaba-stock";
import { Hash, Truck, CalendarDays, Tag } from "lucide-react";
import { CAT_ACCENT, CAT_GRADIENTS, CAT_ICON, formatMAD, STATUS_MAP, stockStatus } from "@/helpers/productHelper";

function ProductDetail({
  item,
  open,
  onClose,
}: {
  item: StockItem | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!item) return null;
  const status = stockStatus(item);
  const st = STATUS_MAP[status];
  const accent = CAT_ACCENT[item.category];
  const stockValue = item.price * item.stock;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header band */}
        <div
          className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${CAT_GRADIENTS[item.category]} px-8 py-8`}
        >
          <span className="text-6xl">{CAT_ICON[item.category]}</span>
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-bold text-zinc-800 leading-snug">
              {item.name}
            </DialogTitle>
            <p className="text-sm text-zinc-500" dir="rtl">{item.nameAr}</p>
          </DialogHeader>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${st.pill}`}
          >
            <st.icon size={13} />
            {st.label}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-4 p-6">
          {/* Price highlight */}
          <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-zinc-500">
              <Tag size={14} /> Prix unitaire
            </span>
            <span className="text-xl font-bold text-zinc-900">
              {formatMAD(item.price)}
            </span>
          </div>

          <Separator />

          {/* Stock details */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Stock
            </p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Quantité actuelle</span>
                <span className="font-semibold text-zinc-800">{item.stock} unités</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Seuil minimum</span>
                <span className="font-semibold text-zinc-800">{item.minStock} unités</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Valeur en stock</span>
                <span className="font-semibold text-zinc-800">{formatMAD(stockValue)}</span>
              </div>
            </div>

            {/* Stock bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className={`h-full rounded-full ${accent}`}
                style={{
                  width: `${Math.min(100, Math.round((item.stock / (item.minStock * 5)) * 100))}%`,
                }}
              />
            </div>
          </div>

          <Separator />

          {/* Meta */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Informations
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Hash size={13} className="text-zinc-400" />
              <span className="font-mono text-zinc-500">{item.id}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Truck size={13} className="text-zinc-400" />
              {item.supplier}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <CalendarDays size={13} className="text-zinc-400" />
              Réappro. le{" "}
              {new Date(item.lastRestocked).toLocaleDateString("fr-MA", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetail;