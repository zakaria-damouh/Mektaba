"use client";

import { useState, useMemo } from "react";
import {
  stockItems,
  categories,
  type Category,
  type StockItem,
} from "@/data/mektaba-stock";
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
  Search,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { CAT_ICON, stockStatus } from "@/helpers/productHelper";
import ProductCard from "@/components/userComponents/productsComponents/ProductCard";
import ProductRow from "@/components/userComponents/productsComponents/ProductRow";
import ProductDetail from "@/components/userComponents/productsComponents/ProductDetail";


type SortKey = "name" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc";


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