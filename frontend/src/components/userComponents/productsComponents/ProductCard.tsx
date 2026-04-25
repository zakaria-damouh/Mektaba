"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactDate } from "@/helpers/date";
import { Product } from "@/types/productsType";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function ProductCard({ product }: { product: Product }) {
  const isLowStock = product?.stock <= product?.minStock;
  const router = useRouter();

  return (
    <Card onClick={() => router.push(ROUTES.USER.PRODUCTS_DETAILS(product.id))}  className="group w-full overflow-hidden border bg-background shadow-sm transition hover:shadow-md hover:scale-105 cursor-pointer">

      {/* HEADER */}
      <CardHeader className="space-y-2 p-2 sm:p-4">

        <div className="flex items-start justify-between gap-2">

          {/* IMAGE */}
          <div className="h-8 w-8 sm:h-11 sm:w-11 shrink-0 rounded-md border bg-muted flex items-center justify-center">
            <span className="text-[8px] sm:text-[10px] text-muted-foreground">
              IMG
            </span>
          </div>

          {/* TITLE */}
          <div className="flex-1 min-w-0">
            <h2 className="max-w-[80px] sm:max-w-[150px] text-[11px] sm:text-sm font-semibold truncate">
              {product?.name}
            </h2>
            <p className="max-w-[80px] sm:max-w-[150px] text-[9px] sm:text-xs text-muted-foreground truncate">
              {product?.nameAr}
            </p>
          </div>

          {/* STATUS */}
          <Badge
            variant={isLowStock ? "destructive" : "secondary"}
            className="text-[9px] sm:text-[11px] px-1.5 py-0"
          >
            {isLowStock ? "Stock faible" : "OK"}
          </Badge>
        </div>

        {/* CATEGORY */}
        <div className="flex flex-wrap gap-1">
          {product?.categories?.map((c, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-[8px] sm:text-[10px] px-1 py-0"
            >
              {c.category.name}
            </Badge>
          ))}
        </div>
      </CardHeader>

      {/* BODY */}
      <CardContent className="space-y-1.5 p-2 sm:p-4 pt-0 text-[10px] sm:text-sm">

        <div className="flex justify-between">
          <span className="text-muted-foreground">Réf</span>
          <span className="font-medium">{product?.ref}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Prix</span>
          <span className="font-semibold">{product?.price} MAD</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Stock</span>
          <span className={isLowStock ? "text-red-500 font-semibold" : ""}>
            {product?.stock}
          </span>
        </div>

        <div className="flex justify-between text-[9px] sm:text-xs">
          <span className="text-muted-foreground">Réapprovisionné</span>
          <span className="text-muted-foreground">
            {formatCompactDate(product?.lastRestocked)}
          </span>
        </div>

      </CardContent>
    </Card>
  );
}