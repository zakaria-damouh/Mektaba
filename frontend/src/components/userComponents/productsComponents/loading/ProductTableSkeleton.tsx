"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
      
      {/* DESKTOP */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead>Réf</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Dernier réappro</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />

                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>

                <TableCell className="text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </TableCell>

                <TableCell className="text-right">
                  <Skeleton className="h-4 w-10 ml-auto" />
                </TableCell>

                <TableCell className="text-right">
                  <Skeleton className="h-4 w-24 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-3 space-y-3">
            
            <div className="flex items-start justify-between">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-9 w-9 rounded-md" />

                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <Skeleton className="h-5 w-10 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />

              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />

              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />

              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />

              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}