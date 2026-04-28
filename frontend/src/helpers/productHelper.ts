import { Category, StockItem } from "@/data/mektaba-stock";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export function formatMAD(n: number) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 2,
  }).format(n);
}

export function stockStatus(item: StockItem): "critical" | "low" | "ok" {
  if (item.stock === 0) return "critical";
  if (item.stock <= item.minStock) return "low";
  return "ok";
}

export const STATUS_MAP = {
  ok: {
    label: "En stock",
    icon: CheckCircle2,
    pill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  low: {
    label: "Stock bas",
    icon: AlertTriangle,
    pill: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
  },
  critical: {
    label: "Rupture",
    icon: XCircle,
    pill: "bg-red-50 text-red-600 border border-red-200",
    dot: "bg-red-500",
  },
};

export const CAT_GRADIENTS: Record<Category, string> = {
  Papeterie: "from-sky-100 to-blue-50",
  "Livres Scolaires": "from-violet-100 to-purple-50",
  "Fournitures Artistiques": "from-rose-100 to-pink-50",
  Bureautique: "from-amber-100 to-yellow-50",
  Carterie: "from-emerald-100 to-teal-50",
};

export const CAT_ACCENT: Record<Category, string> = {
  Papeterie: "bg-sky-500",
  "Livres Scolaires": "bg-violet-500",
  "Fournitures Artistiques": "bg-rose-500",
  Bureautique: "bg-amber-500",
  Carterie: "bg-emerald-500",
};

export const CAT_TEXT: Record<Category, string> = {
  Papeterie: "text-sky-600",
  "Livres Scolaires": "text-violet-600",
  "Fournitures Artistiques": "text-rose-600",
  Bureautique: "text-amber-600",
  Carterie: "text-emerald-600",
};

export const CAT_ICON: Record<Category, string> = {
  Papeterie: "✏️",
  "Livres Scolaires": "📚",
  "Fournitures Artistiques": "🎨",
  Bureautique: "🗂️",
  Carterie: "✉️",
};