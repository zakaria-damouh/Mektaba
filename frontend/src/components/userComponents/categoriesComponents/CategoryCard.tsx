"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/categoriesType";
import { Loader2, Package, Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CategoryEditForm from "./forms/CategoryEditForm";

type Props = {
  category: Category;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => unknown; 
  isPending?: boolean;
};
export function CategoryCard({ category, onDelete, isPending }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <Card className="group relative rounded-2xl border border-border/50 bg-background transition-all duration-300 hover:shadow-md">
      
      <CardContent className="p-5 sm:p-6 flex flex-col gap-5">
        
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">
          
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-[15px] font-medium text-foreground truncate">
              {category.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-right truncate">
              {category.nameAr}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition">
            
            {/* Edit */}
            <Button
            variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditDialogOpen(true);
              }}
              className="p-2 rounded-full hover:bg-muted transition cursor-pointer" 
            >
              <Pencil className="w-4 h-4 text-muted-foreground" />
            </Button>

             <Button
                variant={"ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                  }}
                  className="p-2 rounded-full hover:bg-destructive/10 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>



          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/40" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          
          {/* Products */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Products</span>
          </div>

          <span className="text-sm font-semibold text-foreground">
            {category._count.products}
          </span>

        </div>

      </CardContent>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="!max-w-lg rounded-2xl p-0 overflow-hidden">
          
          {/* Header */}
          <AlertDialogHeader className="px-6 pt-6 pb-2 space-y-2">
            <AlertDialogTitle className="text-lg font-semibold text-zinc-900">
              Supprimer la catégorie ?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm text-zinc-500 leading-relaxed">
              Cette action est irréversible. La catégorie{" "}
              <span className="font-medium text-zinc-900">
                {category.name}
              </span>{" "}
              sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>

        

          {/* Footer */}
          <AlertDialogFooter className="!bg-white px-6 pb-6 flex justify-end gap-3">
            
            <AlertDialogCancel className="!rounded-full px-4 h-10 text-sm cursor-pointer">
              Annuler
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => onDelete?.(category.id)}
              disabled={isPending}
              className="!rounded-full px-4 h-10 bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  Suppression...
                  <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-xl rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2 space-y-1">
            <DialogTitle className="text-lg font-semibold text-zinc-900">
              Modifier la catégorie
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500">
              Formulaire de modification de la catégorie{" "}
              <span className="font-medium text-zinc-900">{category.name}</span>.
            </DialogDescription>
          </DialogHeader>
          {/* Form content goes here */}
            <div className="p-6">
             <CategoryEditForm category={category} setIsEditDialogOpen={setIsEditDialogOpen} />
            </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}