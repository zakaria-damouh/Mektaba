"use client";

import { useState } from "react";
import {
  stockItems,
  stockByCategory,
  lowStockItems,
  totalStockValue,
  categories,
  type Category,
  type StockItem,
} from "@/data/mektaba-stock";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, BookOpen, Package, TrendingUp, Search } from "lucide-react";

// ── helpers ────────────────────────────────────────────────────────
function formatMAD(value: number) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 2,
  }).format(value);
}

function stockStatus(item: StockItem): "critical" | "low" | "ok" {
  if (item.stock === 0) return "critical";
  if (item.stock <= item.minStock) return "low";
  return "ok";
}

const statusConfig = {
  critical: { label: "Rupture", variant: "destructive" as const },
  low: { label: "Bas", variant: "secondary" as const, className: "bg-amber-100 text-amber-800 border-amber-300" },
  ok: { label: "OK", variant: "outline" as const, className: "bg-emerald-50 text-emerald-700 border-emerald-300" },
};

const categoryColors: Record<Category, string> = {
  Papeterie: "bg-blue-500",
  "Livres Scolaires": "bg-violet-500",
  "Fournitures Artistiques": "bg-rose-500",
  Bureautique: "bg-amber-500",
  Carterie: "bg-emerald-500",
};

// ── component ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = stockItems.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchStatus =
      filterStatus === "all" || stockStatus(item) === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <h1>Tableau de bord</h1>
    // <div className="min-h-screen bg-zinc-50 font-sans">
    //   {/* ── Header ── */}
    //   <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
    //     <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    //       <div className="flex items-center gap-3">
    //         <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white">
    //           <BookOpen size={18} />
    //         </div>
    //         <div>
    //           <h1 className="text-base font-semibold leading-none text-zinc-900">
    //             مكتبة — Mektaba Stock
    //           </h1>
    //           <p className="mt-0.5 text-xs text-zinc-500">
    //             Gestion des stocks
    //           </p>
    //         </div>
    //       </div>
    //       <span className="text-xs text-zinc-400">
    //         {new Date().toLocaleDateString("fr-MA", {
    //           day: "2-digit",
    //           month: "long",
    //           year: "numeric",
    //         })}
    //       </span>
    //     </div>
    //   </header>

    //   <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
    //     {/* ── KPI Cards ── */}
    //     <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    //       <Card className="border-zinc-200 shadow-sm">
    //         <CardHeader className="pb-1 pt-4">
    //           <CardTitle className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wide">
    //             <Package size={14} />
    //             Articles
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent className="pb-4">
    //           <p className="text-2xl font-bold text-zinc-900">{stockItems.length}</p>
    //           <p className="text-xs text-zinc-400">références actives</p>
    //         </CardContent>
    //       </Card>

    //       <Card className="border-zinc-200 shadow-sm">
    //         <CardHeader className="pb-1 pt-4">
    //           <CardTitle className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wide">
    //             <TrendingUp size={14} />
    //             Valeur stock
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent className="pb-4">
    //           <p className="text-2xl font-bold text-zinc-900">
    //             {formatMAD(totalStockValue)}
    //           </p>
    //           <p className="text-xs text-zinc-400">total estimé</p>
    //         </CardContent>
    //       </Card>

    //       <Card className="border-amber-100 bg-amber-50 shadow-sm">
    //         <CardHeader className="pb-1 pt-4">
    //           <CardTitle className="flex items-center gap-2 text-xs font-medium text-amber-700 uppercase tracking-wide">
    //             <AlertTriangle size={14} />
    //             Stock bas
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent className="pb-4">
    //           <p className="text-2xl font-bold text-amber-700">
    //             {lowStockItems.length}
    //           </p>
    //           <p className="text-xs text-amber-500">articles à réapprovisionner</p>
    //         </CardContent>
    //       </Card>

    //       <Card className="border-zinc-200 shadow-sm">
    //         <CardHeader className="pb-1 pt-4">
    //           <CardTitle className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wide">
    //             <BookOpen size={14} />
    //             Catégories
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent className="pb-4">
    //           <p className="text-2xl font-bold text-zinc-900">{categories.length}</p>
    //           <p className="text-xs text-zinc-400">rayons</p>
    //         </CardContent>
    //       </Card>
    //     </div>

    //     {/* ── Category breakdown ── */}
    //     <Card className="border-zinc-200 shadow-sm">
    //       <CardHeader>
    //         <CardTitle className="text-sm font-semibold text-zinc-700">
    //           Répartition par catégorie
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="space-y-3">
    //           {stockByCategory.map((cat) => {
    //             const pct = Math.round(
    //               (cat.totalItems /
    //                 stockItems.reduce((a, i) => a + i.stock, 0)) *
    //                 100
    //             );
    //             return (
    //               <div key={cat.category} className="space-y-1">
    //                 <div className="flex items-center justify-between text-sm">
    //                   <div className="flex items-center gap-2">
    //                     <span
    //                       className={`inline-block h-2.5 w-2.5 rounded-full ${categoryColors[cat.category as Category]}`}
    //                     />
    //                     <span className="font-medium text-zinc-700">
    //                       {cat.category}
    //                     </span>
    //                     <span className="text-zinc-400 text-xs">
    //                       ({cat.count} réf.)
    //                     </span>
    //                   </div>
    //                   <div className="flex items-center gap-4">
    //                     <span className="text-xs text-zinc-400">
    //                       {cat.totalItems} unités
    //                     </span>
    //                     <span className="w-24 text-right text-xs font-medium text-zinc-600">
    //                       {formatMAD(cat.value)}
    //                     </span>
    //                   </div>
    //                 </div>
    //                 <Progress value={pct} className="h-1.5" />
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </CardContent>
    //     </Card>

    //     {/* ── Stock table ── */}
    //     <Card className="border-zinc-200 shadow-sm">
    //       <CardHeader>
    //         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    //           <CardTitle className="text-sm font-semibold text-zinc-700">
    //             Inventaire complet
    //           </CardTitle>
    //           <div className="flex flex-wrap gap-2">
    //             {/* Search */}
    //             <div className="relative">
    //               <Search
    //                 size={13}
    //                 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
    //               />
    //               <Input
    //                 placeholder="Rechercher..."
    //                 value={search}
    //                 onChange={(e) => setSearch(e.target.value)}
    //                 className="h-8 pl-8 text-xs w-44"
    //               />
    //             </div>

    //             {/* Category filter */}
    //             <Select
    //               value={filterCategory}
    //               onValueChange={setFilterCategory}
    //             >
    //               <SelectTrigger className="h-8 text-xs w-44">
    //                 <SelectValue placeholder="Catégorie" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="all">Toutes catégories</SelectItem>
    //                 {categories.map((c) => (
    //                   <SelectItem key={c} value={c}>
    //                     {c}
    //                   </SelectItem>
    //                 ))}
    //               </SelectContent>
    //             </Select>

    //             {/* Status filter */}
    //             <Select value={filterStatus} onValueChange={setFilterStatus}>
    //               <SelectTrigger className="h-8 text-xs w-36">
    //                 <SelectValue placeholder="Statut" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="all">Tous statuts</SelectItem>
    //                 <SelectItem value="ok">OK</SelectItem>
    //                 <SelectItem value="low">Bas</SelectItem>
    //                 <SelectItem value="critical">Rupture</SelectItem>
    //               </SelectContent>
    //             </Select>
    //           </div>
    //         </div>
    //       </CardHeader>
    //       <CardContent className="p-0">
    //         <div className="overflow-x-auto">
    //           <Table>
    //             <TableHeader>
    //               <TableRow className="bg-zinc-50 text-xs">
    //                 <TableHead className="pl-6 font-semibold text-zinc-600">
    //                   Réf.
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600">
    //                   Article
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600">
    //                   Catégorie
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600 text-right">
    //                   Prix (MAD)
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600 text-right">
    //                   Stock
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600 text-right">
    //                   Min.
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600">
    //                   Fournisseur
    //                 </TableHead>
    //                 <TableHead className="font-semibold text-zinc-600 pr-6">
    //                   Statut
    //                 </TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {filtered.length === 0 ? (
    //                 <TableRow>
    //                   <TableCell
    //                     colSpan={8}
    //                     className="py-10 text-center text-sm text-zinc-400"
    //                   >
    //                     Aucun article trouvé.
    //                   </TableCell>
    //                 </TableRow>
    //               ) : (
    //                 filtered.map((item) => {
    //                   const status = stockStatus(item);
    //                   const cfg = statusConfig[status];
    //                   return (
    //                     <TableRow
    //                       key={item.id}
    //                       className={
    //                         status === "low" || status === "critical"
    //                           ? "bg-amber-50/40"
    //                           : ""
    //                       }
    //                     >
    //                       <TableCell className="pl-6 font-mono text-xs text-zinc-400">
    //                         {item.id}
    //                       </TableCell>
    //                       <TableCell>
    //                         <p className="text-sm font-medium text-zinc-800">
    //                           {item.name}
    //                         </p>
    //                         <p className="text-xs text-zinc-400 font-arabic" dir="rtl">
    //                           {item.nameAr}
    //                         </p>
    //                       </TableCell>
    //                       <TableCell>
    //                         <span className="flex items-center gap-1.5 text-xs text-zinc-600">
    //                           <span
    //                             className={`inline-block h-2 w-2 rounded-full ${categoryColors[item.category]}`}
    //                           />
    //                           {item.category}
    //                         </span>
    //                       </TableCell>
    //                       <TableCell className="text-right text-sm font-medium text-zinc-700">
    //                         {item.price.toFixed(2)}
    //                       </TableCell>
    //                       <TableCell className="text-right text-sm font-semibold text-zinc-900">
    //                         {item.stock}
    //                       </TableCell>
    //                       <TableCell className="text-right text-xs text-zinc-400">
    //                         {item.minStock}
    //                       </TableCell>
    //                       <TableCell className="text-xs text-zinc-500">
    //                         {item.supplier}
    //                       </TableCell>
    //                       <TableCell className="pr-6">
    //                         <Badge
    //                           variant={cfg.variant}
    //                           className={`text-xs ${"className" in cfg ? cfg.className : ""}`}
    //                         >
    //                           {cfg.label}
    //                         </Badge>
    //                       </TableCell>
    //                     </TableRow>
    //                   );
    //                 })
    //               )}
    //             </TableBody>
    //           </Table>
    //         </div>
    //         <div className="border-t border-zinc-100 px-6 py-3">
    //           <p className="text-xs text-zinc-400">
    //             {filtered.length} article{filtered.length !== 1 ? "s" : ""}{" "}
    //             affiché{filtered.length !== 1 ? "s" : ""} sur {stockItems.length}
    //           </p>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </main>
    // </div>
  );
}