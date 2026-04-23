import prisma from "../lib/prisma.js";

export async function getAllProductsService(params) {
  const { categoryIds, page = 1, limit = 50, search = "", stock, sortBy } = params;

  const parsedIds = categoryIds
    ? String(categoryIds).split(",").map(Number).filter(Number.isFinite)
    : [];

  const orderBy = {
    name:        { name: "asc" },
    "price-asc":  { price: "asc" },
    "price-desc": { price: "desc" },
    "stock-asc":  { stock: "asc" },
    "stock-desc": { stock: "desc" },
  }[sortBy] ?? { ref: "asc" }; // default

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

  const filtered = products.filter((p) => {
    if (stock === "ok")       return p.stock > p.minStock;
    if (stock === "low")      return p.stock > 0 && p.stock <= p.minStock;
    if (stock === "critical") return p.stock === 0;
    return true;
  });

  const start = (Number(page) - 1) * Number(limit);
  return filtered.slice(start, start + Number(limit));
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