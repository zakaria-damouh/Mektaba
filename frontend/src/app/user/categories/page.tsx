"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/userComponents/categoriesComponents/CategoryCard";
import EmptyCategories from "@/components/userComponents/categoriesComponents/EmptyCategories";
import CategoryAddForm from "@/components/userComponents/categoriesComponents/forms/CategoryAddForm";
import { CategoryCardSkeleton } from "@/components/userComponents/categoriesComponents/loading/CategoryCardSkeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { deleteCategory, getCategories } from "@/services/category.service";
import { Category } from "@/types/categoriesType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";


type APIError = {
  success: boolean;
  message: string;
};

function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedValue(search, 300);

    const {data: categories = [] , isLoading} = useQuery({
        queryKey:["categories", debouncedSearch],
        queryFn: () => getCategories(debouncedSearch)
    })

    const { mutate: deleteCategoryMutate, isPending } = useMutation({
      mutationFn: deleteCategory,

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        setDeleteError(null);
      },

      onError: (error : AxiosError<APIError>) => {
        console.error("Delete failed:", error);
        setDeleteError(error.response?.data?.message || "An error occurred");
      },
    });

    useEffect(() => {
      if (deleteError && errorRef.current) {
        errorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", 
        });
      }
    }, [deleteError]);

  return (
    <div className="min-h-screen bg-zinc-50">

        <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
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
                z-20
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

       {deleteError && (
          <div ref={errorRef} className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            
            {/* Text */}
            <div className="flex-1">
              <p className="text-sm text-red-600 mt-0.5">
                {deleteError}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setDeleteError(null)}
              className="shrink-0 rounded-md p-1 text-red-600 hover:bg-red-100 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

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
            <CategoryCard key={category.id} category={category}  onDelete={deleteCategoryMutate} isPending={isPending} />
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