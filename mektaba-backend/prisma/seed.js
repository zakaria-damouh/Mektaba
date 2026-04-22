import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
 
const prisma = new PrismaClient({ adapter });
 
const categories = [
  { name: "Papeterie",               nameAr: "قرطاسية" },
  { name: "Livres Scolaires",        nameAr: "الكتب المدرسية" },
  { name: "Fournitures Artistiques", nameAr: "لوازم فنية" },
  { name: "Bureautique",             nameAr: "مستلزمات مكتبية" },
  { name: "Carterie",                nameAr: "بطاقات ومظاريف" },
  { name: "Informatique",            nameAr: "معلوميات" },
];
 
const products = [
  // Papeterie
  {
    ref: "PAP-001", name: "Cahier 200 pages",    nameAr: "كراسة 200 صفحة",
    price: 12.50, stock: 320, minStock: 50,
    supplier: "Roco Maroc",   lastRestocked: new Date("2025-03-15"),
    category: "Papeterie",
  },
  {
    ref: "PAP-002", name: "Stylo Bille Bleu",    nameAr: "قلم جاف أزرق",
    price: 2.00,  stock: 980, minStock: 200,
    supplier: "Bic Maghreb",  lastRestocked: new Date("2025-04-01"),
    category: "Papeterie",
  },
  {
    ref: "PAP-003", name: "Crayon HB",           nameAr: "قلم رصاص HB",
    price: 1.50,  stock: 750, minStock: 150,
    supplier: "Stabilo Maroc", lastRestocked: new Date("2025-03-20"),
    category: "Papeterie",
  },
  {
    ref: "PAP-004", name: "Gomme blanche",        nameAr: "ممحاة بيضاء",
    price: 1.00,  stock: 38,  minStock: 80,
    supplier: "Stabilo Maroc", lastRestocked: new Date("2025-01-18"),
    category: "Papeterie",
  },
 
  // Livres Scolaires
  {
    ref: "LIV-001", name: "Manuel Maths 1ère Bac",         nameAr: "كتاب الرياضيات أولى باك",
    price: 55.00, stock: 85,  minStock: 20,
    supplier: "Dar Al Kitab",       lastRestocked: new Date("2025-02-01"),
    category: "Livres Scolaires",
  },
  {
    ref: "LIV-002", name: "Manuel Physique-Chimie 2ème Bac", nameAr: "كتاب الفيزياء والكيمياء ثانية باك",
    price: 60.00, stock: 62,  minStock: 15,
    supplier: "Dar Al Kitab",       lastRestocked: new Date("2025-02-01"),
    category: "Livres Scolaires",
  },
  {
    ref: "LIV-003", name: "Dictionnaire Français-Arabe",   nameAr: "قاموس فرنسي-عربي",
    price: 120.00, stock: 41, minStock: 10,
    supplier: "Librairie Nationale", lastRestocked: new Date("2025-01-10"),
    category: "Livres Scolaires",
  },
  {
    ref: "LIV-004", name: "Manuel SVT Collège",            nameAr: "كتاب علوم الحياة والأرض للإعدادي",
    price: 45.00, stock: 14,  minStock: 20,
    supplier: "Dar Al Kitab",       lastRestocked: new Date("2024-12-05"),
    category: "Livres Scolaires",
  },
 
  // Fournitures Artistiques
  {
    ref: "ART-001", name: "Boîte aquarelle 24 couleurs", nameAr: "صندوق ألوان مائية 24 لون",
    price: 85.00, stock: 55,  minStock: 15,
    supplier: "Artiste Casablanca", lastRestocked: new Date("2025-03-10"),
    category: "Fournitures Artistiques",
  },
  {
    ref: "ART-002", name: "Pinceaux set 6 pièces",       nameAr: "مجموعة فراش 6 قطع",
    price: 35.00, stock: 72,  minStock: 20,
    supplier: "Artiste Casablanca", lastRestocked: new Date("2025-03-10"),
    category: "Fournitures Artistiques",
  },
  {
    ref: "ART-003", name: "Crayons de couleur 12 pcs",  nameAr: "أقلام تلوين 12 قطعة",
    price: 18.00, stock: 230, minStock: 50,
    supplier: "Stabilo Maroc",      lastRestocked: new Date("2025-04-02"),
    category: "Fournitures Artistiques",
  },
 
  // Bureautique
  {
    ref: "BUR-001", name: "Ramette papier A4 500 feuilles", nameAr: "رزمة ورق A4 500 ورقة",
    price: 48.00, stock: 160, minStock: 30,
    supplier: "CEPAC Maroc",  lastRestocked: new Date("2025-04-05"),
    category: "Bureautique",
  },
  {
    ref: "BUR-002", name: "Agrafeuse de bureau",           nameAr: "دباسة مكتبية",
    price: 32.00, stock: 25,  minStock: 10,
    supplier: "Bureau Plus",  lastRestocked: new Date("2025-01-30"),
    category: "Bureautique",
  },
  {
    ref: "BUR-003", name: "Scotch transparent 19mm",      nameAr: "شريط لاصق شفاف 19 ملم",
    price: 6.00,  stock: 275, minStock: 60,
    supplier: "Bic Maghreb",  lastRestocked: new Date("2025-03-18"),
    category: "Bureautique",
  },
  {
    ref: "BUR-004", name: "Post-it 76x76mm",              nameAr: "ورق لاصق 76x76 ملم",
    price: 14.00, stock: 9,   minStock: 20,
    supplier: "Bureau Plus",  lastRestocked: new Date("2025-02-14"),
    category: "Bureautique",
  },
 
  // Carterie
  {
    ref: "CAR-001", name: "Cartes de vœux Aïd",          nameAr: "بطاقات تهنئة العيد",
    price: 8.00,  stock: 180, minStock: 40,
    supplier: "Imprimerie Atlas", lastRestocked: new Date("2025-03-25"),
    category: "Carterie",
  },
  {
    ref: "CAR-002", name: "Enveloppes blanches C5 (25 pcs)", nameAr: "مظاريف بيضاء C5",
    price: 10.00, stock: 95,  minStock: 30,
    supplier: "CEPAC Maroc",      lastRestocked: new Date("2025-02-28"),
    category: "Carterie",
  },
 
  // Informatique
  {
    ref: "INF-001", name: "Clé USB 32GB",                nameAr: "ذاكرة USB 32 جيغا",
    price: 75.00, stock: 60,  minStock: 15,
    supplier: "TechStore Maroc", lastRestocked: new Date("2025-03-01"),
    category: "Informatique",
  },
  {
    ref: "INF-002", name: "Souris optique filaire",      nameAr: "فأرة بصرية سلكية",
    price: 55.00, stock: 42,  minStock: 10,
    supplier: "TechStore Maroc", lastRestocked: new Date("2025-02-20"),
    category: "Informatique",
  },
  {
    ref: "INF-003", name: "Tapis de souris",             nameAr: "لوحة الفأرة",
    price: 25.00, stock: 88,  minStock: 20,
    supplier: "TechStore Maroc", lastRestocked: new Date("2025-03-12"),
    category: "Informatique",
  },
];
 
async function main() {
  console.log("🌱 Seeding database...");
 
  // Clear existing data (junction table first)
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
 
  console.log("🗑️  Cleared existing data");
 
  // Seed categories
  const createdCategories = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.name] = created;
    console.log(`  ✅ Category: ${cat.name}`);
  }
 
  // Seed products + junction
  for (const { category, ...productData } of products) {
    const product = await prisma.product.create({ data: productData });
    await prisma.productCategory.create({
      data: {
        productId:  product.id,
        categoryId: createdCategories[category].id,
      },
    });
    console.log(`  📦 Product: ${product.ref} — ${product.name}`);
  }
 
  console.log(`\n✅ Done! Seeded ${categories.length} categories and ${products.length} products.`);
}
 
main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });