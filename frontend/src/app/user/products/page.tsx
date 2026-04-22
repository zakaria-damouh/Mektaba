"use client";

import { useState, useMemo } from "react";
import {
  stockItems,
  categories,
  type Category,
  type StockItem,
} from "@/data/mektaba-stock";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Tag,
  Truck,
  CalendarDays,
  Hash,
} from "lucide-react";

// ── helpers ─────────────────────────────────────────────────────────────
function formatMAD(n: number) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 2,
  }).format(n);
}

function stockStatus(item: StockItem): "critical" | "low" | "ok" {
  if (item.stock === 0) return "critical";
  if (item.stock <= item.minStock) return "low";
  return "ok";
}

const STATUS_MAP = {
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

const CAT_GRADIENTS: Record<Category, string> = {
  Papeterie: "from-sky-100 to-blue-50",
  "Livres Scolaires": "from-violet-100 to-purple-50",
  "Fournitures Artistiques": "from-rose-100 to-pink-50",
  Bureautique: "from-amber-100 to-yellow-50",
  Carterie: "from-emerald-100 to-teal-50",
};

const CAT_ACCENT: Record<Category, string> = {
  Papeterie: "bg-sky-500",
  "Livres Scolaires": "bg-violet-500",
  "Fournitures Artistiques": "bg-rose-500",
  Bureautique: "bg-amber-500",
  Carterie: "bg-emerald-500",
};

const CAT_TEXT: Record<Category, string> = {
  Papeterie: "text-sky-600",
  "Livres Scolaires": "text-violet-600",
  "Fournitures Artistiques": "text-rose-600",
  Bureautique: "text-amber-600",
  Carterie: "text-emerald-600",
};

// Category emoji icons
const CAT_ICON: Record<Category, string> = {
  Papeterie: "✏️",
  "Livres Scolaires": "📚",
  "Fournitures Artistiques": "🎨",
  Bureautique: "🗂️",
  Carterie: "✉️",
};

type SortKey = "name" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc";

// ── Product Card ─────────────────────────────────────────────────────────
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

// ── Product Row (list view) ───────────────────────────────────────────────
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

// ── Detail Dialog ────────────────────────────────────────────────────────
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

// ── Main Page ────────────────────────────────────────────────────────────
export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<StockItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = [...stockItems];

    if (search)
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.id.toLowerCase().includes(search.toLowerCase()) ||
          i.nameAr.includes(search)
      );
    if (filterCat !== "all") items = items.filter((i) => i.category === filterCat);
    if (filterStatus !== "all")
      items = items.filter((i) => stockStatus(i) === filterStatus);

    items.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "stock-asc") return a.stock - b.stock;
      if (sort === "stock-desc") return b.stock - a.stock;
      return 0;
    });

    return items;
  }, [search, filterCat, filterStatus, sort]);

  function openDetail(item: StockItem) {
    setSelected(item);
    setDialogOpen(true);
  }

  // Category counts
  const catCounts = useMemo(() => {
    const map: Record<string, number> = { all: stockItems.length };
    for (const c of categories)
      map[c] = stockItems.filter((i) => i.category === c).length;
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-base font-bold text-zinc-900">Catalogue Produits</h1>
            <p className="text-xs text-zinc-400">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} trouvé
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-1.5 transition-colors ${
                view === "grid"
                  ? "bg-white shadow-sm text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-1.5 transition-colors ${
                view === "list"
                  ? "bg-white shadow-sm text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <LayoutList size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* ── Category Pills ── */}
        <div className="mb-5 flex flex-wrap gap-2">
          {(["all", ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                filterCat === cat
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {cat !== "all" && <span>{CAT_ICON[cat as Category]}</span>}
              {cat === "all" ? "Tous" : cat}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  filterCat === cat ? "bg-white/20" : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {catCounts[cat]}
              </span>
            </button>
          ))}
        </div>

        {/* ── Filters Row ── */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-sm"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 w-36 text-xs">
              <SlidersHorizontal size={12} className="mr-1.5 text-zinc-400" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="ok">✅ En stock</SelectItem>
              <SelectItem value="low">⚠️ Stock bas</SelectItem>
              <SelectItem value="critical">❌ Rupture</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-9 w-40 text-xs">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom A→Z</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="stock-asc">Stock croissant</SelectItem>
              <SelectItem value="stock-desc">Stock décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Product Grid / List ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-zinc-400">
            <span className="text-5xl">🔍</span>
            <p className="text-sm font-medium">Aucun article trouvé</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setFilterCat("all");
                setFilterStatus("all");
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((item) => (
              <ProductCard key={item.id} item={item} onClick={() => openDetail(item)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((item) => (
              <ProductRow key={item.id} item={item} onClick={() => openDetail(item)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Detail Dialog ── */}
      <ProductDetail
        item={selected}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}