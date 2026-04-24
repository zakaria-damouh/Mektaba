"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/helpers/date";
import { Product } from "@/types/productsType";
import { useRouter } from "next/navigation";

export default function ProductRow({ products }: { products: Product[] }) {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/user/products/${id}`);
  }
  return (
    <div className="rounded-xl border bg-background shadow-sm overflow-hidden">

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead>Réf</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Dernier réappro</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.map((product) => {
              const isLowStock = product?.stock <= product?.minStock;

              return (
                <TableRow
                  onClick={() => handleNavigate(product?.id)}
                  key={product?.id}
                  className="hover:bg-muted/40 transition cursor-pointer"
                >

                  <TableCell className="text-muted-foreground text-sm">
                    {product?.ref}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-muted border flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground">
                          IMG
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium">{product?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {product?.nameAr}
                        </span>
                      </div>
                    </div>
                  </TableCell>

               
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {product?.categories?.[0]?.category?.name}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {product?.price} MAD
                  </TableCell>

                  <TableCell className="text-right">
                    <span
                      className={
                        isLowStock
                          ? "text-red-500 font-semibold"
                          : "text-foreground"
                      }
                    >
                      {product?.stock}
                    </span>
                  </TableCell>

                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formatDate(product?.lastRestocked)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden divide-y">
        {products?.map((product) => {
          const isLowStock = product?.stock <= product?.minStock;

          return (
            <div key={product?.id} className="p-3 space-y-2">

              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-2 items-center">
                  <div className="h-9 w-9 rounded-md bg-muted border flex items-center justify-center">
                    <span className="text-[9px] text-muted-foreground">
                      IMG
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium">{product?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product?.nameAr}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={isLowStock ? "destructive" : "secondary"}
                  className="text-[10px]"
                >
                  {isLowStock ? "Faible" : "OK"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 text-xs gap-y-1">
                <span className="text-muted-foreground">Réf</span>
                <span>{product?.ref}</span>

                <span className="text-muted-foreground">Prix</span>
                <span className="font-medium">{product?.price} MAD</span>

                <span className="text-muted-foreground">Stock</span>
                <span className={isLowStock ? "text-red-500 font-semibold" : ""}>
                  {product?.stock}
                </span>

                <span className="text-muted-foreground">Catégorie</span>
                <span>{product?.categories?.[0]?.category?.name}</span>

                <span className="text-muted-foreground">Date</span>
                <span className="text-muted-foreground">
                  {formatDate(product?.lastRestocked)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}