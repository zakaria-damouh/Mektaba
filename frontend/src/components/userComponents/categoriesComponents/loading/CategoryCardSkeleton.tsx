import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCardSkeleton() {
  return (
    <Card className="rounded-2xl border border-border/50 bg-background">
      <CardContent className="p-5 sm:p-6 flex flex-col gap-5">
        
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md ml-auto" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Divider */}
        <Skeleton className="h-px w-full" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          <Skeleton className="h-4 w-6 rounded" />
        </div>

      </CardContent>
    </Card>
  );
}