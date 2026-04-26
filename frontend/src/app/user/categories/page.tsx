"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/userComponents/categoriesComponents/CategoryCard";
import EmptyCategories from "@/components/userComponents/categoriesComponents/EmptyCategories";
import CategoryAddForm from "@/components/userComponents/categoriesComponents/forms/CategoryAddForm";
import { CategoryCardSkeleton } from "@/components/userComponents/categoriesComponents/loading/CategoryCardSkeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/categoriesType";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";


function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 300);

    const {data: categories = [] , isLoading} = useQuery({
        queryKey:["categories", debouncedSearch],
        queryFn: () => getCategories(debouncedSearch)
    })


  return (
    <div className="min-h-screen bg-zinc-50">

        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-base font-bold text-zinc-900">Categories</h1>
            <p className="text-xs text-zinc-400">
              {categories?.count} catégorie{categories?.count !== 1 ? "s" : ""} trouvée
              {categories?.count !== 1 ? "s" : ""}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-lg ">
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(true)} size="sm" className="flex items-center gap-2 cursor-pointer">
                <TbCategoryPlus />
                <span>Ajouter une catégorie</span>
            </Button>
          </div>
        </div>
      </header>

      <div className=" flex justify-end px-4 py-6">
          <div className="relative md:max-w-5/12 flex-1 min-w-56">
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
              placeholder="Rechercher une catégorie..."
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
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">

        {!isLoading && categories?.data?.length === 0 ? (
          <EmptyCategories />
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          ) : 
          (
            categories?.data?.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
            ))
          )}
        </div>
        )}
      </div>

      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogContent className="sm:max-w-xl rounded-2xl p-0 overflow-hidden">
              
              {/* Header */}
              <DialogHeader className="px-6 pt-6 pb-2 space-y-1">
                <DialogTitle className="text-lg font-semibold text-zinc-900">
                  Ajouter une catégorie
                </DialogTitle>
                <DialogDescription className="text-sm text-zinc-500">
                  Remplissez les informations pour créer une nouvelle catégorie.
                </DialogDescription>
              </DialogHeader>
          <CategoryAddForm setIsAddCategoryOpen={setIsAddCategoryOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CategoriesPage;