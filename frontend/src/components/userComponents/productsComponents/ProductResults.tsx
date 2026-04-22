
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import { Product } from "@/types/productsType";

function ProductResults({ products, view } : { products: Product[]; view: "grid" | "list" }) {
  if (products.length === 0) return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-zinc-400">
            <span className="text-5xl">🔍</span>
            <p className="text-sm font-medium">Aucun article trouvé</p>
           
          </div>
  );

  return view === "grid" ? (
   <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
    {products.map((item: Product) => (
        <ProductCard key={item.id} product={item} />
    ))}
    </div>
  ) : (
    <div className="w-full">
    <ProductRow products={products} />
    </div>
  );
}

export default ProductResults;