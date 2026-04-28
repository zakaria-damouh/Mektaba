import { PackageSearch } from "lucide-react";

function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      <div className="h-14 w-14 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
        <PackageSearch className="text-zinc-500" size={22} />
      </div>

      <h3 className="text-sm font-semibold text-zinc-800">
        Aucun produit trouvé
      </h3>

      <p className="text-xs text-zinc-500 mt-1 max-w-xs">
        Essayez de modifier vos filtres ou votre recherche pour voir plus de résultats.
      </p>
    </div>
  );
}

export default EmptyProducts;