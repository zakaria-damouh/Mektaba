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

  // pagination
  const take = Math.min(Number(limit) || 20, 100);
  const currentPage = Math.max(Number(page) || 1, 1);
  const skip = (currentPage - 1) * take;

  // search sanitization
  const safeSearch = String(search).trim().slice(0, 50);

  // category parsing
  const parsedIds = categoryIds
    ? String(categoryIds)
        .split(",")
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id))
    : [];

  // safe sorting (whitelist)
  const orderByMap = {
    name: { name: "asc" },
    "price-asc": { price: "asc" },
    "price-desc": { price: "desc" },
    "stock-asc": { stock: "asc" },
    "stock-desc": { stock: "desc" },
  };

  const orderBy = orderByMap[sortBy] || { ref: "asc" };

  const where = {};

  // category filter
  if (parsedIds.length) {
    where.categories = {
      some: { categoryId: { in: parsedIds } },
    };
  }

  // search filter
  if (safeSearch) {
    where.OR = [
      { name: { contains: safeSearch, mode: "insensitive" } },
      { ref: { contains: safeSearch, mode: "insensitive" } },
    ];
  }

  // stock filter — only "critical" is safe to do fully on DB side
  // "low" and "ok" require column-to-column comparison (stock vs minStock)
  // so we fetch and filter in JS, but WITHOUT skip/take to keep count accurate
  const needsJsFilter = stock === "low" || stock === "ok";

  if (stock === "critical") {
    where.stock = 0;
  }

  let data, finalTotal;

  if (needsJsFilter) {
    // fetch all matching rows (no skip/take) then filter + paginate in JS
    const allProducts = await prisma.product.findMany({
      where,
      include: {
        categories: { include: { category: true } },
      },
      orderBy,
    });

    const filtered =
      stock === "low"
        ? allProducts.filter((p) => p.stock > 0 && p.stock <= p.minStock)
        : allProducts.filter((p) => p.stock > p.minStock); // ok

    finalTotal = filtered.length;
    data = filtered.slice(skip, skip + take);
  } else {
    // fully DB-side: pagination + count are accurate
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          categories: { include: { category: true } },
        },
        orderBy,
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    data = products;
    finalTotal = total;
  }

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
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      categories: { include: { category: true } },
    },
  });

  if (!product) throw new Error(`Product with id ${id} not found`);

  return product;
}

export async function createProductService(data) {
  const {
    name,
    nameAr,
    ref,
    price,
    stock,
    minStock,
    supplier,
    lastRestocked,
    categoryIds = [],
  } = data;

  if (ref ) {
    const existingProduct = await prisma.product.findUnique({
      where: { ref },
    });
    if (existingProduct) {
      throw new Error(`Product with reference ${ref} already exists`);
    }
  }

  if (categoryIds.length) {
    const existingCategories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true },
    });

    const existingIds = existingCategories.map((c) => c.id);
    const invalidIds = categoryIds.filter((id) => !existingIds.includes(id));

    if (invalidIds.length) {
      throw new Error(`Invalid category IDs: ${invalidIds.join(", ")}`);
    }
  }

  return prisma.product.create({
    data: {
      name,
      nameAr,
      ref,
      price,
      stock,
      minStock,
      supplier,
      lastRestocked: lastRestocked ?? new Date(),
      categories: {
        create: categoryIds.map((id) => ({ categoryId: id })),
      },
    },
    include: {
      categories: { include: { category: true } },
    },
  });
}