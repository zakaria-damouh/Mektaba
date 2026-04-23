import prisma from "../lib/prisma.js";

export async function getAllProductsService(params) {
  const { categoryIds, page = 1, limit = 20, search = "", stock, sortBy } = params;

  const parsedIds = categoryIds
    ? String(categoryIds).split(",").map(Number).filter(Number.isFinite)
    : [];

  const orderBy = {
    name:         { name: "asc" },
    "price-asc":  { price: "asc" },
    "price-desc": { price: "desc" },
    "stock-asc":  { stock: "asc" },
    "stock-desc": { stock: "desc" },
  }[sortBy] ?? { ref: "asc" };

  const products = await prisma.product.findMany({
    where: {
      ...(parsedIds.length && {
        categories: { some: { categoryId: { in: parsedIds } } },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { ref: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      categories: { include: { category: true } },
    },
    orderBy,
  });

  // stock filter (JS side — needs column comparison)
  const filtered = products.filter((p) => {
    if (stock === "ok")       return p.stock > p.minStock;
    if (stock === "low")      return p.stock > 0 && p.stock <= p.minStock;
    if (stock === "critical") return p.stock === 0;
    return true;
  });

  const total = filtered.length;
  const start = (Number(page) - 1) * Number(limit);
  const data  = filtered.slice(start, start + Number(limit));
  const totalPages = Math.ceil(total / Number(limit));

  return { data, total, totalPages, page: Number(page), limit: Number(limit) };
}



export async function getProductByIdService(id) {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });
}