"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { productSchema } from "@/helpers/validation";
import { postProduct, updateProduct } from "@/services/product.service";
import { ROUTES } from "@/lib/routes";
import { Category } from "@/types/categoriesType";

type ProductFormValues = z.input<typeof productSchema>;

type ApiError = {
  success: boolean;
  message: string;
};

type Props = {
  mode: "create" | "edit";
  product?: any;
  categories?: Category[];
  setIsEditDialogOpen?: (open: boolean) => void
};

export default function ProductForm({
  mode,
  product,
  categories = [],
  setIsEditDialogOpen,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isEdit = mode === "edit";

  /* ---------------- DEFAULT VALUES ---------------- */
  const defaultValues: ProductFormValues = {
    ref: product?.ref || "",
    name: product?.name || "",
    nameAr: product?.nameAr || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    minStock: product?.minStock || 0,
    supplier: product?.supplier || "",
    categoryIds:
      product?.categories?.map((c: any) => String(c.categoryId)) || [],
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const selectedCategories = watch("categoryIds");

  /* ---------------- MUTATION ---------------- */
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit ? updateProduct(product.id, data) : postProduct(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      if (isEdit) {
        setIsEditDialogOpen?.(false);
      } else {
        router.push(ROUTES.USER.PRODUCTS);
      }
      },

    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message || "Une erreur est survenue";

      setError("root", { type: "server", message });
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    const payload = {
      ...values,
      categoryIds: values.categoryIds
        .map((id) => Number(id))
        .filter((id) => !isNaN(id)),
    };

    mutate(payload);
  };

  /* ---------------- UI ---------------- */
  return (
<div className="mx-auto max-w-3xl p-6 space-y-8">
  {!isEdit && (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold text-zinc-900">
        Ajouter un produit
      </h1>
      <p className="text-sm text-zinc-500">
        Remplissez les informations du produit
      </p>
    </div>
  )}

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6 bg-white"
  >
    {/* ERROR */}
    {errors.root && (
      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        {errors.root.message}
      </div>
    )}

    {/* REF */}
    <div className="space-y-2">
      <Label className="text-sm text-zinc-700">Référence</Label>
      <Input
        {...register("ref")}
        className="h-11 rounded-xl border-zinc-200 focus-visible:ring-2 focus-visible:ring-black/20"
      />
    </div>

    {/* NAME */}
    <div className="space-y-2">
      <Label className="text-sm text-zinc-700">Nom</Label>
      <Input
        {...register("name")}
        className="h-11 rounded-xl border-zinc-200 focus-visible:ring-2 focus-visible:ring-black/20"
      />
    </div>

    {/* NAME AR */}
    <div className="space-y-2">
      <Label className="text-sm text-zinc-700">الاسم بالعربية</Label>
      <Input
        {...register("nameAr")}
        className="h-11 rounded-xl border-zinc-200 focus-visible:ring-2 focus-visible:ring-black/20 text-right"
      />
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label className="text-sm text-zinc-700">Prix</Label>
        <Input
          type="number"
          {...register("price")}
          className="h-11 rounded-xl border-zinc-200"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-zinc-700">Stock</Label>
        <Input
          type="number"
          {...register("stock")}
          className="h-11 rounded-xl border-zinc-200"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-zinc-700">Stock minimum</Label>
        <Input
          type="number"
          {...register("minStock")}
          className="h-11 rounded-xl border-zinc-200"
        />
      </div>
    </div>

    {/* SUPPLIER */}
    <div className="space-y-2">
      <Label className="text-sm text-zinc-700">Fournisseur</Label>
      <Input
        {...register("supplier")}
        className="h-11 rounded-xl border-zinc-200"
      />
    </div>

    {/* CATEGORIES */}
    <div className="space-y-3">
      <div>
        <Label className="text-sm text-zinc-700">Catégorie</Label>
        <p className="text-xs text-zinc-400">
          Sélectionnez une ou plusieurs catégories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((cat: any) => {
          const isChecked = selectedCategories.includes(String(cat.id));

          return (
            <label
              key={cat.id}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border cursor-pointer transition-all duration-150
              ${
                isChecked
                  ? "border-black bg-black text-white shadow-sm"
                  : "border-zinc-200 bg-white hover:border-zinc-400"
              }`}
            >
              <span className="text-sm font-medium">{cat.name}</span>

              <input
                type="checkbox"
                value={String(cat.id)}
                checked={isChecked}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue("categoryIds", [
                      ...selectedCategories,
                      e.target.value,
                    ]);
                  } else {
                    setValue(
                      "categoryIds",
                      selectedCategories.filter(
                        (id: string) => id !== e.target.value
                      )
                    );
                  }
                }}
                className="hidden"
              />

              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center
                ${isChecked ? "border-white" : "border-zinc-300"}`}
              >
                {isChecked && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>

    {/* SUBMIT */}
    <Button
      className="w-full h-11 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all cursor-pointer"
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} />
          <span>
            {isEdit ? "Mise à jour..." : "Ajout en cours..."}
          </span>
        </div>
      ) : isEdit ? (
        "Enregistrer les modifications"
      ) : (
        "Ajouter le produit"
      )}
    </Button>
  </form>
</div>
  );
}