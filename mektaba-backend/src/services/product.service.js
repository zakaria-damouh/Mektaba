import prisma from "../lib/prisma.js";

export async function getAllProductsService(params = {}) {
  const {
    categoryIds,
    page = 1,
    limit = 20,
    search = "",
    stock,
    sortBy,
  } = params;

  // ✅ pagination
  const take = Math.min(Number(limit) || 20, 100);
  const currentPage = Math.max(Number(page) || 1, 1);
  const skip = (currentPage - 1) * take;

  //  search sanitization
  const safeSearch = String(search).trim().slice(0, 50);

  //  category parsing
  const parsedIds = categoryIds
    ? String(categoryIds)
        .split(",")
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id))
    : [];

  // ✅ safe sorting (whitelist)
  const orderByMap = {
    name: { name: "asc" },
    "price-asc": { price: "asc" },
    "price-desc": { price: "desc" },
    "stock-asc": { stock: "asc" },
    "stock-desc": { stock: "desc" },
  };

  const orderBy = orderByMap[sortBy] || { ref: "asc" };

  //  IMPORTANT: initialize where
  const where = {};

  //  filters
  if (parsedIds.length) {
    where.categories = {
      some: { categoryId: { in: parsedIds } },
    };
  }

  if (safeSearch) {
    where.OR = [
      { name: { contains: safeSearch, mode: "insensitive" } },
      { ref: { contains: safeSearch, mode: "insensitive" } },
    ];
  }

  //  stock filters (DB side where possible)
  if (stock === "critical") {
    where.stock = 0;
  }

  if (stock === "low") {
    where.stock = { gt: 0 };
  }

  //  fetch + count
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        categories: {
          include: { category: true },
        },
      },
      orderBy,
      skip,
      take,
    }),
    prisma.product.count({ where }),
  ]);

  // ⚠️ refine stock logic (JS side)
  let data = products;

  if (stock === "ok") {
    data = products.filter((p) => p.stock > p.minStock);
  }

  if (stock === "low") {
    data = products.filter(
      (p) => p.stock > 0 && p.stock <= p.minStock
    );
  }

  // ⚠️ adjust total when filtering in JS
  const finalTotal =
    stock === "ok" || stock === "low" ? data.length : total;

  const totalPages = Math.ceil(finalTotal / take);

  return {
    data,
    total: finalTotal,
    totalPages,
    page: currentPage,
    limit: take,
  };
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