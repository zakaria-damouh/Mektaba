"use client";

import { getProductById } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

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
} from "react-icons/fi";

function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  const product = data?.data;

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="w-full h-[320px] rounded-2xl bg-zinc-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* HEADER */}
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

              <button className="w-full h-11 rounded-xl bg-black text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition">
                <FiEdit /> Modifier
              </button>

              <button className="w-full h-11 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-100 transition">
                <FiTrash2 /> Supprimer
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;