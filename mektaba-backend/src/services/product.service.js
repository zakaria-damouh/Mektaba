import prisma from "../lib/prisma";

export async function getAllProductsService() {
  return prisma.product.findMany({
    include: {
      categories: {
        include: { category: true },
      },
    },
    orderBy: { ref: "asc" },
  });
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