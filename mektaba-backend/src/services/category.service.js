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

export async function createCategoryService(data) {
  const { name , nameAr } = data;

  return prisma.category.create({
    data: {
      name,
      nameAr,
    },
  });
}

export const deleteCategoryService = async (id) => {

  const isCategoryUsed = await prisma.productCategory.findFirst({
    where: { categoryId: Number(id) },
  });

  if (isCategoryUsed) {
    throw new Error("Cannot delete category that is associated with products");
  }
  
  return prisma.category.delete({
    where: { id: Number(id) },
  });
}

export async function updateCategoryService(id, data) {
  const { name, nameAr } = data;
  
  const existingCategory = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id: Number(id) },
    data: {
      name,
      nameAr,
    },
  });
}