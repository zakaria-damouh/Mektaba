"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/categoriesType";
import { Package, Pencil, Trash2 } from "lucide-react";

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

type Props = {
  category: Category;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export function CategoryCard({ category, onEdit, onDelete }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                onEdit?.(category.id);
              }}
              className="p-2 rounded-full hover:bg-muted transition"
            >
              <Pencil className="w-4 h-4 text-muted-foreground" />
            </Button>

             <Button
                variant={"ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                  }}
                  className="p-2 rounded-full hover:bg-destructive/10 transition"
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
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete category?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete{" "}
                    <span className="font-medium">{category.name}</span>.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete?.(category.id)}
                    className="!bg-destructive text-white hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
    </Card>
  );
}