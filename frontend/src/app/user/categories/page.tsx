"use client";

import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/userComponents/categoriesComponents/CategoryCard";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/categoriesType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";


function CategoriesPage() {

    const {data: categories = [] , isLoading} = useQuery({
        queryKey:["categories"],
        queryFn:getCategories
    })

    if(isLoading) {
        return (
            <div className="flex justify-center py-20 text-zinc-400">
                Loading categories...
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-zinc-50">

        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-base font-bold text-zinc-900">Categories</h1>
            <p className="text-xs text-zinc-400">
              {categories.count} catégorie{categories.count !== 1 ? "s" : ""} trouvée
              {categories.count !== 1 ? "s" : ""}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-lg ">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                <TbCategoryPlus />
                <span>Ajouter une catégorie</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {categories.data?.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;