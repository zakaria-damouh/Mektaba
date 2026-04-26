"use client";

import AddProductForm from "@/components/userComponents/productsComponents/forms/AddProductForm";
import { getCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";


function AddProductPage() {


    const {data , isLoading} = useQuery({
        queryKey : ["categories"],
        queryFn : () => getCategories()
    })

    const categories = data?.data || [];
    
    return(
        <div>
            <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div>
                    <h1 className="text-base font-bold text-zinc-900">Ajouter un produit</h1>
                
                </div>

                
                </div>
            </header>
            <AddProductForm  categories={categories}/>
        </div>
    );
}

export default AddProductPage;