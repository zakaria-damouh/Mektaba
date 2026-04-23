"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductResults from "@/components/userComponents/productsComponents/ProductResults";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/categoriesType";
import {
  Search,
  LayoutList,
  LayoutGrid,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Circle,
} from "lucide-react";
import {
  ArrowUpAZ,
  ArrowDownAZ,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
} from "lucide-react";
import PaginationButton from "@/components/userComponents/elements/PaginationButton";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FiX } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";

type SortKey = "name" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc";
type FilterStatus = "all" | "ok" | "low" | "critical";

export default function ProductPage() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", selectedCategoryIds, search, filterStatus, sort, pagination.page, pagination.limit],
    queryFn:  () => getProducts(selectedCategoryIds, search, filterStatus, sort, pagination.page, pagination.limit)
  });
 const totalPages = products?.totalPages ?? 1;

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
  }, [selectedCategoryIds, search, filterStatus, sort]);

  const handleCategoryChange = (id: number, checked: boolean) => {
    setSelectedCategoryIds((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  const hasActiveFilters =
  selectedCategoryIds.length > 0 ||
  search !== "" ||
  filterStatus !== "all" ||
  sort !== "name";

  const clearFilters = () => {
    setSelectedCategoryIds([]);
    setSearch("");
    setFilterStatus("all");
    setSort("name");
    setPagination({ ...pagination, page: 1 });
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
              {products.total} article{products.total !== 1 ? "s" : ""} disponible{products.total !== 1 ? "s" : ""}
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
            {/* ALL */}
            <button
              onClick={() => setSelectedCategoryIds([])}
              className={`
                h-7 px-4
                rounded-full
                text-sm font-medium
                transition-all
                border
                cursor-pointer
                ${
                  selectedCategoryIds.length === 0
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300"
                }
              `}
            >
              Tous
            </button>

            {(categories as any).data?.map((category: Category) => {
              const isSelected = selectedCategoryIds.includes(category?.id);

              return (
                <label
                  key={category?.id}
                  className={`
                    h-7 px-4
                    flex items-center
                    rounded-full
                    text-sm font-medium
                    cursor-pointer
                    transition-all
                    border
                    ${
                      isSelected
                        ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                        : "bg-white text-zinc-600 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={(e) =>
                      handleCategoryChange(category?.id, e.target.checked)
                    }
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
            size={15}
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              text-zinc-400
              pointer-events-none
              z-50
            "
          />

          <Input
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-8 w-full
              rounded-full
              border border-zinc-200/70
              bg-white/80 backdrop-blur
              pl-11 pr-4
              text-sm text-zinc-700
              placeholder:text-zinc-400
              shadow-sm
              transition-all

              hover:bg-white
              focus-visible:bg-white
              focus-visible:ring-2 focus-visible:ring-zinc-200
              focus-visible:ring-offset-1
            "
          />
        </div>

          {/* Status filter */}
        <Select
          value={filterStatus}
          onValueChange={(v) => setFilterStatus(v as FilterStatus)}
        >
          <SelectTrigger
            className="
              h-11 w-48
              rounded-full
              border border-zinc-200/70
              bg-white/80 backdrop-blur
              shadow-sm
              px-3
              text-sm text-zinc-700
              flex items-center gap-2
              hover:bg-zinc-50
              focus:ring-2 focus:ring-zinc-200 focus:ring-offset-1
              transition-all
            "
          >
            {/* <SlidersHorizontal size={14} className="text-zinc-500" /> */}
            <SelectValue placeholder="Statut" />
          </SelectTrigger>

          <SelectContent
            className="
              rounded-2xl
              border border-zinc-200/60
              shadow-lg
              p-1
              bg-white
            "
          >
            <SelectItem
              value="all"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
            >
              <Circle size={14} className="text-zinc-400" />
              Tous statuts
            </SelectItem>

            <SelectItem
              value="ok"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-green-50"
            >
              <CheckCircle2 size={14} className="text-green-500" />
              <span className="text-green-500">En stock</span>
            </SelectItem>

            <SelectItem
              value="low"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-yellow-50"
            >
              <AlertTriangle size={14} className="text-yellow-500" />
              <span className="text-yellow-500">Stock bas</span>
            </SelectItem>

            <SelectItem
              value="critical"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-red-50"
            >
              <XCircle size={14} className="text-red-500" />
              <span className="text-red-500">Rupture</span>
            </SelectItem>
          </SelectContent>
        </Select>

          {/* Sort */}
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger
              className="
                h-11 w-52
                rounded-full
                border border-zinc-200/70
                bg-white/80 backdrop-blur
                shadow-sm
                px-3
                text-sm text-zinc-700
                flex items-center gap-2
                hover:bg-zinc-50
                focus:ring-2 focus:ring-zinc-200 focus:ring-offset-1
                transition-all
              "
            >
              {/* <SlidersHorizontal size={14} className="text-zinc-500" /> */}
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>

            <SelectContent
              className="
                rounded-2xl
                border border-zinc-200/60
                shadow-lg
                p-1
                bg-white
              "
            >
              <SelectItem className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100" value="name">
                <ArrowUpAZ size={14} className="text-zinc-500" />
                Nom A → Z
              </SelectItem>

              <SelectItem className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100" value="price-asc">
                <ArrowUpWideNarrow size={14} className="text-zinc-500" />
                Prix croissant
              </SelectItem>

              <SelectItem className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100" value="price-desc">
                <ArrowDownWideNarrow size={14} className="text-zinc-500" />
                Prix décroissant
              </SelectItem>

              <SelectItem className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100" value="stock-asc">
                <ArrowUpWideNarrow size={14} className="text-zinc-500" />
                Stock croissant
              </SelectItem>

              <SelectItem className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-zinc-100" value="stock-desc">
                <ArrowDownWideNarrow size={14} className="text-zinc-500" />
                Stock décroissant
              </SelectItem>
            </SelectContent>
          </Select>

          <div>
            {hasActiveFilters && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="icon"
                    className="
                      h-8 w-8
                      rounded-full
                      border-zinc-200/70
                      bg-white/80 backdrop-blur
                      text-zinc-500
                      hover:text-zinc-900
                      hover:bg-zinc-50
                      shadow-sm
                      cursor-pointer
                      transition-all
                    "
                  >
                    <AiOutlineClear  size={16} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Effacer les filtres
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* ── Results ── */}
       
          <ProductResults products={products.data} view={view} isLoading={isLoading} />
        
          <PaginationButton
            page={pagination.page}
            totalPages={totalPages}
            onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          />
      </div>
    </div>
  );
}