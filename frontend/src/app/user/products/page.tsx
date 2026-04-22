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
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/productsType";
import ProductResults from "@/components/userComponents/productsComponents/ProductResults";


type SortKey = "name" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc";


export default function ProductPage() {
  const [view, setView] = useState<"grid" | "list">("grid");


  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  
 

  if (isLoading) {
  return (
    <div className="flex justify-center py-20 text-zinc-400">
      Loading products...
    </div>
  );
}
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-base font-bold text-zinc-900">Catalogue Produits</h1>
            <p className="text-xs text-zinc-400">
              {products.length} article{products.length !== 1 ? "s" : ""} trouvé
              {products.length !== 1 ? "s" : ""}
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

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* <div className="mb-5 flex flex-wrap gap-2">
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
        </div> */}

        {/* <div className="mb-6 flex flex-wrap items-center gap-3">
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
        </div> */}

        {/* ── Product Grid / List ── */}
       <ProductResults products={products} view={view} />
      </div>

    
    </div>
  );
}