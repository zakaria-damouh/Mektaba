
import EmptyProducts from "./EmptyProducts";
import ProductCardSkeleton from "./loading/ProductCardSkeleton";
import ProductTableSkeleton from "./loading/ProductTableSkeleton";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import { Product } from "@/types/productsType";

function ProductResults({ products, view , isLoading} : { products: Product[]; view: "grid" | "list"; isLoading: boolean }) {

   if (!isLoading && products?.length === 0) {
    return <EmptyProducts />;
  }

  return view === "grid" ? (
   <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
    {isLoading ? (
      Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
    ) : (
      <>
        {products?.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
        ))}
      </>
    )}
    </div>
  ) : (
    <div className="w-full">
      {isLoading ? <ProductTableSkeleton /> : <ProductRow products={products} />}
    </div>
  );
}

export default ProductResults;