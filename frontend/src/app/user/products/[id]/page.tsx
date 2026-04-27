"use client";

import { deleteProduct, getProductById } from "@/services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { use, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ProductCategory } from "@/types/categoriesType";
import { formatDate, fromNow } from "@/helpers/date";

// React Icons
import {
  FiImage,
  FiBox,
  FiTag,
  FiTruck,
  FiClock,
  FiEdit,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCategories } from "@/services/category.service";
import ProductForm from "@/components/userComponents/productsComponents/forms/ProductForm";
import { ScrollArea } from "@/components/ui/scroll-area";

type APIError = {
  success: boolean;
  message: string;
};

function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  const product = data?.data;
  

  const {mutate: deleteProductMutate, isPending} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      router.push(ROUTES.USER.PRODUCTS);
      toast.success("Produit supprimé avec succès");
      setIsDeleteDialogOpen(false);
    },
    onError: (error : AxiosError<APIError>) => {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.message || "Échec de la suppression du produit");
    },
  });

      const {data: categoriesData, isLoading: isCategoriesLoading} = useQuery({
          queryKey : ["categories"],
          queryFn : () => getCategories()
      })
  
      const categories = categoriesData?.data || [];

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="w-full h-[320px] rounded-2xl bg-zinc-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full cursor-pointer" onClick={() => router.back()}>
              <FiArrowLeft className="w-4 h-4" />
            </Button>

            <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
              Produit details
            </h1>
            
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {product?.name}
          </h1>
          <p className="text-zinc-500 text-sm">{product?.nameAr}</p>

          <div className="flex items-center gap-2 flex-wrap">
            {product?.categories?.map((c: ProductCategory) => (
              <Badge key={c.id} variant="secondary" className="rounded-full">
                {c.category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* IMAGE PLACEHOLDER */}
        <div className="w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden bg-zinc-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <FiImage className="w-10 h-10" />
            <p className="text-sm">Aucune image</p>
          </div>

          {/* 👉 Future real image */}
          {/* 
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="w-full h-full object-cover"
          /> 
          */}
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            {/* INFO */}
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <FiTag /> Informations
                </h2>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500 flex items-center gap-1">
                      <FiTag size={14} /> Référence
                    </p>
                    <p className="font-medium">{product?.ref}</p>
                  </div>

                  <div>
                    <p className="text-zinc-500 flex items-center gap-1">
                      <FiTruck size={14} /> Fournisseur
                    </p>
                    <p className="font-medium">{product?.supplier}</p>
                  </div>

                  <div>
                    <p className="text-zinc-500 flex items-center gap-1">
                      <FiClock size={14} /> Dernier réapprovisionnement
                    </p>
                    <p className="font-medium">
                      {product?.lastRestocked
                        ? fromNow(product.lastRestocked)
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-500 flex items-center gap-1">
                      <FiClock size={14} /> Créé le
                    </p>
                    <p className="font-medium">
                      {product?.createdAt
                        ? formatDate(product.createdAt)
                        : "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* STOCK */}
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <FiBox /> Stock
                </h2>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-sm">Disponible</p>
                    <p className="text-2xl font-semibold">
                      {product?.stock}
                    </p>
                  </div>

                  <Badge
                    variant={
                      product && product.stock <= product.minStock
                        ? "destructive"
                        : "default"
                    }
                    className="rounded-full"
                  >
                    {product && product.stock <= product.minStock
                      ? "Stock faible"
                      : "En stock"}
                  </Badge>
                </div>

                <div className="text-sm text-zinc-500">
                  Stock minimum: {product?.minStock}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div>
            <Card className="rounded-2xl shadow-sm sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-zinc-500 text-sm">Prix</p>
                  <p className="text-3xl font-semibold">
                    {product?.price} MAD
                  </p>
                </div>

                <Separator />

                <Button variant={"outline"} className="w-full h-11 rounded-full cursor-pointer" onClick={() => setIsEditDialogOpen(true)}>
                  <FiEdit /> Modifier
                </Button>

                <Button variant={"destructive"} className="w-full h-11 rounded-full cursor-pointer" onClick={() => setIsDeleteDialogOpen(true)}>
                  <FiTrash2 /> Supprimer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="!max-w-2xl rounded-3xl p-0 overflow-hidden border border-zinc-200 shadow-xl">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-3 space-y-2">
            <DialogTitle className="text-xl font-semibold text-zinc-900">
              Modifier le produit
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[550px]">
            <div className="p-6">
              <ProductForm
                mode="edit"
                product={product}
                categories={categories}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
              </div>
            </ScrollArea>
          </DialogContent>
      </Dialog>

    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className="max-w-md rounded-3xl p-0 overflow-hidden border border-zinc-200 shadow-xl">
        
        {/* Header */}
        <AlertDialogHeader className="px-6 pt-6 pb-3 space-y-2">
          <AlertDialogTitle className="text-xl font-semibold text-zinc-900">
            Supprimer le produit ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-zinc-500 leading-relaxed">
            Cette action est irréversible. Le produit sera définitivement supprimé.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Divider */}
        <div className="border-t border-zinc-100" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          
          <Button
            variant="ghost"
            className="rounded-full px-4 h-10 text-zinc-600 cursor-pointer  hover:bg-zinc-100 hover:text-zinc-900 transition"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Annuler
          </Button>

          <Button
            variant="destructive"
            className="rounded-full px-5 h-10 cursor-pointer transition-all"
            onClick={() => deleteProductMutate(product?.id)}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                <span>Suppression...</span>
              </div>
            ) : (
              "Supprimer"
            )}
          </Button>

        </div>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}

export default ProductDetailsPage;