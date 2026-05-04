import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Moroccan Maktaba products...');

  // ─── Categories ───────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({ where: { name: 'Books' }, update: {}, create: { name: 'Books', nameAr: 'كتب' } }),
    prisma.category.upsert({ where: { name: 'Stationery' }, update: {}, create: { name: 'Stationery', nameAr: 'قرطاسية' } }),
    prisma.category.upsert({ where: { name: 'School Supplies' }, update: {}, create: { name: 'School Supplies', nameAr: 'لوازم مدرسية' } }),
    prisma.category.upsert({ where: { name: 'Art & Drawing' }, update: {}, create: { name: 'Art & Drawing', nameAr: 'فنون ورسم' } }),
    prisma.category.upsert({ where: { name: 'Religious Books' }, update: {}, create: { name: 'Religious Books', nameAr: 'كتب دينية' } }),
    prisma.category.upsert({ where: { name: 'Office Supplies' }, update: {}, create: { name: 'Office Supplies', nameAr: 'لوازم مكتبية' } }),
    prisma.category.upsert({ where: { name: 'Children Books' }, update: {}, create: { name: 'Children Books', nameAr: 'كتب أطفال' } }),
  ]);

  const cat = Object.fromEntries(categories.map(c => [c.name, c]));
  console.log(`✅ ${categories.length} categories created`);

  // ─── Products ─────────────────────────────────────────────────
  const products = [
    // Religious Books
    { ref: 'BK-REL-001', name: 'Holy Quran - Warsh Recitation (Large)', nameAr: 'المصحف الشريف - رواية ورش - حجم كبير', price: 85.0, stock: 120, minStock: 20, supplier: 'Dar Al Hadith Casablanca', lastRestocked: new Date('2025-03-10'), categories: ['Religious Books', 'Books'] },
    { ref: 'BK-REL-002', name: 'Quran Tajweed Rules - Moroccan Edition', nameAr: 'أحكام التجويد - الطبعة المغربية', price: 45.0, stock: 60, minStock: 10, supplier: 'Dar Al Hadith Casablanca', lastRestocked: new Date('2025-02-20'), categories: ['Religious Books', 'Books'] },
    { ref: 'BK-REL-003', name: 'Riyad al-Salihin - Arabic', nameAr: 'رياض الصالحين - عربي', price: 55.0, stock: 45, minStock: 8, supplier: 'Maktabat Al Irshad Rabat', lastRestocked: new Date('2025-01-15'), categories: ['Religious Books', 'Books'] },
    { ref: 'BK-REL-004', name: 'Al-Murshid Al-Muin - Ibn Ashir', nameAr: 'المرشد المعين - ابن عاشر', price: 30.0, stock: 80, minStock: 15, supplier: 'Dar Al Hadith Casablanca', lastRestocked: new Date('2025-03-01'), categories: ['Religious Books', 'Books'] },
    // Arabic Literature & Education
    { ref: 'BK-LIT-001', name: 'Moroccan Arabic Grammar - Nahw', nameAr: 'النحو الواضح للمدارس المغربية', price: 40.0, stock: 95, minStock: 15, supplier: 'Dar Al Nashr Al Maghribia', lastRestocked: new Date('2025-02-01'), categories: ['Books', 'School Supplies'] },
    { ref: 'BK-LIT-002', name: 'Moroccan Darija Phrasebook', nameAr: 'قاموس الدارجة المغربية', price: 35.0, stock: 50, minStock: 10, supplier: 'Dar Al Nashr Al Maghribia', lastRestocked: new Date('2025-01-20'), categories: ['Books'] },
    { ref: 'BK-LIT-003', name: 'Alf Layla wa Layla - Complete Edition', nameAr: 'ألف ليلة وليلة - الطبعة الكاملة', price: 120.0, stock: 25, minStock: 5, supplier: 'Maktabat Al Irshad Rabat', lastRestocked: new Date('2025-01-05'), categories: ['Books'] },
    // Children Books
    { ref: 'BK-CHD-001', name: 'Moroccan Folktales for Children', nameAr: 'حكايات مغربية للأطفال', price: 28.0, stock: 70, minStock: 12, supplier: 'Dar Al Nashr Al Maghribia', lastRestocked: new Date('2025-03-05'), categories: ['Children Books', 'Books'] },
    { ref: 'BK-CHD-002', name: "Learn Arabic Alphabet - Children's Book", nameAr: 'تعلم الحروف العربية - كتاب الأطفال', price: 22.0, stock: 110, minStock: 20, supplier: 'Dar Al Nashr Al Maghribia', lastRestocked: new Date('2025-03-12'), categories: ['Children Books', 'Books', 'School Supplies'] },
    { ref: 'BK-CHD-003', name: 'Colouring Book - Moroccan Patterns', nameAr: 'كتاب التلوين - الزخارف المغربية', price: 18.0, stock: 85, minStock: 15, supplier: 'Matbaa Al Watan Fes', lastRestocked: new Date('2025-02-14'), categories: ['Children Books', 'Art & Drawing'] },
    // Notebooks & Writing
    { ref: 'ST-NB-001', name: 'Spiral Notebook A4 - 100 sheets', nameAr: 'دفتر حلزوني A4 - 100 ورقة', price: 12.0, stock: 300, minStock: 50, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-15'), categories: ['Stationery', 'School Supplies'] },
    { ref: 'ST-NB-002', name: 'Moroccan Leather Journal - Handmade', nameAr: 'دفتر جلد مغربي - صناعة يدوية', price: 75.0, stock: 40, minStock: 8, supplier: 'Artisanat Marrakech', lastRestocked: new Date('2025-02-10'), categories: ['Stationery', 'Office Supplies'] },
    { ref: 'ST-NB-003', name: 'Exercise Book - Arabic Lines (Pack of 10)', nameAr: 'كراسة السطور العربية - عبوة 10', price: 20.0, stock: 200, minStock: 40, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-10'), categories: ['Stationery', 'School Supplies'] },
    // Pens & Pencils
    { ref: 'ST-PEN-001', name: 'Ballpoint Pen Blue - Box of 12', nameAr: 'قلم حبر جاف أزرق - علبة 12', price: 15.0, stock: 400, minStock: 60, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-18'), categories: ['Stationery', 'School Supplies', 'Office Supplies'] },
    { ref: 'ST-PEN-002', name: 'Calligraphy Pen Set - Arabic Script', nameAr: 'طقم أقلام الخط العربي', price: 55.0, stock: 30, minStock: 5, supplier: 'Matbaa Al Watan Fes', lastRestocked: new Date('2025-01-25'), categories: ['Stationery', 'Art & Drawing'] },
    { ref: 'ST-PEN-003', name: 'HB Pencil - Box of 20', nameAr: 'قلم رصاص HB - علبة 20', price: 18.0, stock: 350, minStock: 50, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-20'), categories: ['Stationery', 'School Supplies'] },
    // Art & Drawing
    { ref: 'ART-001', name: 'Watercolour Paint Set - 24 colours', nameAr: 'طقم ألوان مائية - 24 لون', price: 48.0, stock: 55, minStock: 10, supplier: 'Dar Al Fan Casablanca', lastRestocked: new Date('2025-02-28'), categories: ['Art & Drawing', 'School Supplies'] },
    { ref: 'ART-002', name: 'Sketching Charcoal Set', nameAr: 'طقم فحم الرسم', price: 32.0, stock: 40, minStock: 8, supplier: 'Dar Al Fan Casablanca', lastRestocked: new Date('2025-02-05'), categories: ['Art & Drawing'] },
    { ref: 'ART-003', name: 'Zellige Pattern Drawing Template Set', nameAr: 'مجموعة قوالب نقش الزليج', price: 65.0, stock: 20, minStock: 4, supplier: 'Artisanat Marrakech', lastRestocked: new Date('2025-01-10'), categories: ['Art & Drawing'] },
    { ref: 'ART-004', name: 'Drawing Pad A3 - 50 sheets', nameAr: 'كتلة رسم A3 - 50 ورقة', price: 25.0, stock: 80, minStock: 15, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-08'), categories: ['Art & Drawing', 'Stationery'] },
    // Office Supplies
    { ref: 'OFF-001', name: 'Stapler + 1000 Staples', nameAr: 'دباسة + 1000 دبوس', price: 35.0, stock: 60, minStock: 10, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-02-22'), categories: ['Office Supplies'] },
    { ref: 'OFF-002', name: 'A4 Printer Paper - Ream 500 sheets', nameAr: 'ورق طباعة A4 - رزمة 500 ورقة', price: 45.0, stock: 250, minStock: 50, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-22'), categories: ['Office Supplies'] },
    { ref: 'OFF-003', name: 'Correction Fluid - White', nameAr: 'سائل التصحيح - أبيض', price: 8.0, stock: 150, minStock: 25, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-01'), categories: ['Office Supplies', 'Stationery'] },
    { ref: 'OFF-004', name: 'Rubber Stamp - Arabic Date', nameAr: 'ختم مطاطي - تاريخ عربي', price: 22.0, stock: 35, minStock: 6, supplier: 'Matbaa Al Watan Fes', lastRestocked: new Date('2025-01-30'), categories: ['Office Supplies'] },
    // School Supplies
    { ref: 'SCH-001', name: 'School Backpack - Moroccan Blue', nameAr: 'حقيبة مدرسية - أزرق مغربي', price: 95.0, stock: 45, minStock: 8, supplier: 'Artisanat Marrakech', lastRestocked: new Date('2025-02-15'), categories: ['School Supplies'] },
    { ref: 'SCH-002', name: 'Geometry Set - Compass + Ruler + Protractor', nameAr: 'طقم هندسة - برجل + مسطرة + منقلة', price: 28.0, stock: 120, minStock: 20, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-03-05'), categories: ['School Supplies'] },
    { ref: 'SCH-003', name: 'Arabic-French Dictionary - School Edition', nameAr: 'قاموس عربي-فرنسي - الطبعة المدرسية', price: 60.0, stock: 75, minStock: 12, supplier: 'Maktabat Al Irshad Rabat', lastRestocked: new Date('2025-01-18'), categories: ['Books', 'School Supplies'] },
    { ref: 'SCH-004', name: 'Scientific Calculator', nameAr: 'آلة حاسبة علمية', price: 85.0, stock: 65, minStock: 10, supplier: 'Papeterie Al Amal Casablanca', lastRestocked: new Date('2025-02-25'), categories: ['School Supplies'] },
  ];

  // ─── Insert Products + Relations ──────────────────────────────
  let productCount = 0;

  for (const p of products) {
    const { categories: catNames, ...data } = p;

    const product = await prisma.product.upsert({
      where: { ref: data.ref },
      update: {},
      create: data,
    });

    for (const catName of catNames) {
      const category = cat[catName];
      if (!category) continue;

      await prisma.productCategory.upsert({
        where: { productId_categoryId: { productId: product.id, categoryId: category.id } },
        update: {},
        create: { productId: product.id, categoryId: category.id },
      });
    }

    productCount++;
    console.log(`  ✔ ${data.ref} — ${data.name}`);
  }

  console.log(`\n✅ Done! ${productCount} products seeded across ${categories.length} categories.`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });