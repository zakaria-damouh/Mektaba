"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/categoriesType";
import { Label } from "@/components/ui/label";
import { productSchema } from "@/helpers/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProduct } from "@/services/product.service";
import { Loader2 } from "lucide-react";



type ProductFormValues = z.input<typeof productSchema>;


function AddProductForm({ categories = [] }: { categories?: Category[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
   defaultValues: {
        ref: "BUR-002",
        name: "Chaise de bureau",
        nameAr: "كرسي مكتب",
        price: 299,
        stock: 50,
        minStock: 10,
        supplier: "MeublesPro",
        categoryIds: [],
        },
  });

  const selectedCategories = watch("categoryIds");

   const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setError("root", { message: error.response?.data?.message });
    },
  });


  const onSubmit = (values: ProductFormValues) => {
    const payload = {
      ...values,
      categoryIds: values.categoryIds.map((id: string) => Number(id)),
    };

    mutate(payload);
  };

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-xl font-bold">Ajouter un produit</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {errors.root && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {errors.root.message}
            </p>
        )}  

        {/* REF */}
        <div>
          <Label className="text-sm font-medium">Référence</Label>
          <Input {...register("ref")} placeholder="EX: BUR-002" />
          {errors.ref && (
            <p className="text-sm text-red-500 py-2">{errors.ref.message}</p>
          )}
        </div>

        {/* NAME */}
        <div>
          <Label className="text-sm font-medium">Nom</Label>
          <Input {...register("name")} placeholder="Nom du produit" />
          {errors.name && (
            <p className="text-sm text-red-500 py-2">{errors.name.message}</p>
          )}
        </div>

        {/* NAME AR */}
        <div>
          <Label className="text-sm font-medium">الاسم بالعربية</Label>
          <Input {...register("nameAr")} placeholder="الاسم" />
          {errors.nameAr && (
            <p className="text-sm text-red-500 py-2">{errors.nameAr.message}</p>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <Label className="text-sm font-medium">Prix</Label>
                <Input type="number" min={0} {...register("price")} />
                {errors.price && (
                <p className="text-sm text-red-500 py-2">{errors.price.message}</p>
                )}
            </div>

            <div>
                <Label className="text-sm font-medium">Stock</Label>
                <Input type="number" min={0} {...register("stock")} />
                {errors.stock && (
                <p className="text-sm text-red-500 py-2">{errors.stock.message}</p>
                )}
            </div>

            <div>
                <Label className="text-sm font-medium">Stock minimum</Label>
                <Input type="number" min={0} {...register("minStock")} />
                {errors.minStock && (
                <p className="text-sm text-red-500 py-2">
                    {errors.minStock.message}
                </p>
                )}
            </div>
        </div>

        {/* SUPPLIER */}
        <div>
          <Label className="text-sm font-medium">Fournisseur</Label>
          <Input {...register("supplier")} placeholder="Nom fournisseur" />
          {errors.supplier && (
            <p className="text-sm text-red-500 py-2">
              {errors.supplier.message}
            </p>
          )}
        </div>

        {/* CATEGORIES */}
        <div>
        <Label className="text-sm font-medium text-gray-700">Catégorie</Label>
        <p className="text-xs text-gray-400 mb-3">Sélectionnez une ou plusieurs catégories</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat: any) => {
            const isChecked = selectedCategories.includes(String(cat.id));
            return (
                <label
                key={cat.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-150
                    ${isChecked
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                >
                <input
                    type="checkbox"
                    value={String(cat.id)}
                    checked={isChecked}
                    onChange={(e) => {
                    if (e.target.checked) {
                        setValue("categoryIds", [...selectedCategories, e.target.value]);
                    } else {
                        setValue("categoryIds", selectedCategories.filter((id: string) => id !== e.target.value));
                    }
                    }}
                    className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isChecked ? "border-white" : "border-gray-300"}`}
                >
                    {isChecked && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span className="text-sm font-medium">{cat.name}</span>
                </label>
            );
            })}
        </div>

        {errors.categoryIds && (
            <p className="text-sm text-red-500 mt-2">{errors.categoryIds.message}</p>
        )}
        </div>

        <Button type="submit" className={`w-full ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={isPending}>
        {isPending ? 
            (
                <>
                    Ajout en cours
                    <Loader2 className="animate-spin mr-2" size={16} />
                </>
            )
        : "Ajouter le produit"}
        </Button>


      </form>
    </div>
  );
}

export default AddProductForm;