import prisma from "../lib/prisma.js";

export async function getAllCategoriesService(params = {}) {
  const { search = "" } = params;

  const safeSearch = String(search).trim().slice(0, 50);

  const where = {};

  if (safeSearch) {
    where.name = { contains: safeSearch, mode: "insensitive" };
  }

  return prisma.category.findMany({
    where,
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryByIdService(id) {
  return prisma.category.findUnique({
    where: { id: Number(id) },
    include: {
      products: {
        include: { product: true },
      },
       _count: {
        select: { products: true },
      },
    },
  });
}