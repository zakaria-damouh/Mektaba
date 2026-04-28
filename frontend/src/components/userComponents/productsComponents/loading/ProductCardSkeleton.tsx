"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden border bg-background shadow-sm">
      
      {/* HEADER */}
      <CardHeader className="space-y-2 p-2 sm:p-4">

        <div className="flex items-start justify-between gap-2">

          {/* IMAGE */}
          <Skeleton className="h-8 w-8 sm:h-11 sm:w-11 rounded-md shrink-0" />

          {/* TITLE */}
          <div className="flex-1 min-w-0 space-y-1">
            <Skeleton className="h-3 sm:h-4 w-20 sm:w-32" />
            <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-24" />
          </div>

          {/* STATUS */}
          <Skeleton className="h-4 sm:h-5 w-10 sm:w-14 rounded-full" />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-3 sm:h-4 w-12 rounded-full" />
          <Skeleton className="h-3 sm:h-4 w-10 rounded-full" />
        </div>
      </CardHeader>

      {/* BODY */}
      <CardContent className="space-y-2 p-2 sm:p-4 pt-0 text-[10px] sm:text-sm">

        <div className="flex justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-16" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-14" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-8" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

      </CardContent>
    </Card>
  );
}