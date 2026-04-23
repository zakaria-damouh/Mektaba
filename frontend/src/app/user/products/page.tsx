"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, LayoutGrid, LayoutList, SlidersHorizontal } from "lucide-react";
import ProductResults from "@/components/userComponents/productsComponents/ProductResults";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/categoriesType";

type SortKey = "name" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc";
type FilterStatus = "all" | "ok" | "low" | "critical";

export default function ProductPage() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", selectedCategoryIds, search, filterStatus, sort],
    queryFn: () => getProducts(selectedCategoryIds, search, filterStatus, sort),
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleCategoryChange = (id: number, checked: boolean) => {
    setSelectedCategoryIds((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
              Catalogue
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {products.length} article{products.length !== 1 ? "s" : ""} disponible{products.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-0.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg p-2 transition-all ${
                view === "grid"
                  ? "bg-white shadow-sm text-zinc-800"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-lg p-2 transition-all ${
                view === "list"
                  ? "bg-white shadow-sm text-zinc-800"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <LayoutList size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">

        {/* ── Category Pills ── */}
        {!isCategoriesLoading && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategoryIds([])}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${
                selectedCategoryIds.length === 0
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              Tous
            </button>

            {(categories as any).data?.map((category: Category) => {
              const isSelected = selectedCategoryIds.includes(category?.id);
              return (
                <label
                  key={category?.id}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={(e) => handleCategoryChange(category?.id, e.target.checked)}
                  />
                  {category?.name}
                </label>
              );
            })}
          </div>
        )}

        {/* ── Filters Bar ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-56">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-10 pr-4 rounded-xl border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-300"
            />
          </div>

          {/* Status filter */}
          <Select
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as FilterStatus)}
          >
            <SelectTrigger className="h-10 w-40 rounded-xl border-zinc-200 bg-white text-sm text-zinc-700">
              <SlidersHorizontal size={13} className="mr-2 text-zinc-400" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="ok">En stock</SelectItem>
              <SelectItem value="low">Stock bas</SelectItem>
              <SelectItem value="critical">Rupture</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-10 w-44 rounded-xl border-zinc-200 bg-white text-sm text-zinc-700">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="name">Nom A → Z</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="stock-asc">Stock croissant</SelectItem>
              <SelectItem value="stock-desc">Stock décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Results ── */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 text-zinc-400 gap-3">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
            <span className="text-sm">Chargement...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-zinc-400 gap-2">
            <p className="text-sm font-medium text-zinc-500">Aucun produit trouvé</p>
            <p className="text-xs">Essayez de modifier vos filtres</p>
          </div>
        ) : (
          <ProductResults products={products} view={view} />
        )}
      </div>
    </div>
  );
}