import { BiCategory } from "react-icons/bi";


function EmptyCategories() {
    return (
     <div className="flex flex-col items-center justify-center py-16 text-center">
      
        <div className="h-14 w-14 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
            <BiCategory className="text-zinc-500" size={22} />
        </div>

        <h3 className="text-sm font-semibold text-zinc-800">
            Aucune catégorie trouvée
        </h3>

    </div>
    );
}

export default EmptyCategories;