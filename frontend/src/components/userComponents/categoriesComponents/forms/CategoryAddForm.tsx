import { categorySchema } from "@/helpers/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postCategory } from "@/services/category.service";
import { Loader2 } from "lucide-react";


type CategoryFormValues = z.input<typeof categorySchema>; 

type ApiError = {
  success: boolean;
  message: string;
};

function CategoryAddForm({setIsAddCategoryOpen} : {setIsAddCategoryOpen: (open: boolean) => void}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
       defaultValues: {
            name: "",
            nameAr: ""
            },
      });

      const queryClient = useQueryClient();

      const {mutate, isPending} = useMutation({
        mutationFn: postCategory,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
            setIsAddCategoryOpen(false);
        },
        onError: (error: AxiosError<ApiError>) => {
            if (error.response?.data?.message) {
                setError("name", { message: error.response.data.message });
            } else {
                setError("name", { message: "Une erreur est survenue" });
            }
        },

      });

      const onSubmit = (data: CategoryFormValues) => {
        mutate(data);
      }
    
    return (
        <div>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-4 space-y-5"
            >
                {/* Name FR */}
                <div className="space-y-2">
                    <Label className="text-sm text-zinc-700">
                    Nom de la catégorie
                    </Label>
                    <Input
                    {...register("name")}
                    placeholder="Ex: Fournitures scolaires"
                    className="h-11 rounded-xl border-zinc-200 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-0 transition-all"
                    />
                    {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

                {/* Name AR */}
                <div className="space-y-2">
                    <Label className="text-sm text-zinc-700">
                    الاسم بالعربية
                    </Label>
                    <Input
                    {...register("nameAr")}
                    placeholder="مثال: أدوات مدرسية"
                    className="h-11 rounded-xl border-zinc-200 text-right focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-0 transition-all"
                    />
                    {errors.nameAr && (
                    <p className="text-xs text-red-500">{errors.nameAr.message}</p>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-200" />

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsAddCategoryOpen(false)}
                    className="rounded-full px-6 py-4 cursor-pointer"
                    >
                    Annuler
                    </Button>

                    <Button
                    type="submit"
                    disabled={isPending}
                    className={`rounded-full px-6 py-4 bg-black text-white hover:bg-zinc-800 ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {isPending ? 
                        (
                        <>
                                Ajout en cours
                                <Loader2 className="animate-spin mr-2" size={16} />
                            </>
                        )
                        : "Ajouter"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CategoryAddForm;