import prisma from "../lib/prisma.js";

export async function getAllCategoriesService() {
  return prisma.category.findMany({
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