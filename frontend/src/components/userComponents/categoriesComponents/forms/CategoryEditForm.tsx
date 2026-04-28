import { categorySchema } from "@/helpers/validation";
import { Category } from "@/types/categoriesType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateCategory } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


type CategoryFormValues = z.input<typeof categorySchema>;

type APIError = {
  success: boolean;
  message: string;
};

function CategoryEditForm({ category , setIsEditDialogOpen }: { category: Category; setIsEditDialogOpen: (open: boolean) => void }) {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema), // Add your validation resolver here (e.g., zodResolver)
        defaultValues: {
            name: category.name,
            nameAr: category.nameAr,
        }
    });

    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: (data: CategoryFormValues) => updateCategory(category.id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Catégorie mise à jour avec succès");
            setIsEditDialogOpen(false);
        },
        onError: (error: AxiosError<APIError>) => {

            const message = error.response?.data?.message || "Une erreur est survenue";
            setError("root", {
                type: "server",
                message,
            });
            toast.error(message || "Erreur lors de la mise à jour de la catégorie");
       
        },
    });

    const onSubmit = (data: CategoryFormValues) => {
        // Handle form submission, e.g., call an API to update the category
        console.log("Form data:", data);
        mutate(data);
    }

    return (
        <div>
            {errors.root && (
                <p className="text-sm text-red-500 mb-4">
                    {errors.root.message}
                </p>
            )}
            <form className="px-6 py-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            placeholder="Nom de la catégorie"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nameAr">Nom en arabe</Label>
                        <Input
                            id="nameAr"
                            placeholder="Nom de la catégorie en arabe"
                            {...register("nameAr")}
                        />
                        {errors.nameAr && (
                            <p className="text-sm text-red-500">
                                {errors.nameAr.message}
                            </p>
                        )}
                    </div>
                </div>
                 {/* Divider */}
                <div className="border-t border-zinc-200" />

               <div className="flex justify-end gap-4">
                    <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsEditDialogOpen(false)}
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
                                Mise à jour en cours
                                <Loader2 className="animate-spin mr-2" size={16} />
                            </>
                        )
                        : "Mettre à jour"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
   
export default CategoryEditForm;