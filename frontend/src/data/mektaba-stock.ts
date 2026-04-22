export type Category =
  | "Papeterie"
  | "Livres Scolaires"
  | "Fournitures Artistiques"
  | "Bureautique"
  | "Carterie";

export interface StockItem {
  id: string;
  name: string;
  nameAr: string;
  category: Category;
  price: number; // MAD
  stock: number;
  minStock: number;
  supplier: string;
  lastRestocked: string; // ISO date
}

export const stockItems: StockItem[] = [
  // Papeterie
  {
    id: "PAP-001",
    name: "Cahier 200 pages",
    nameAr: "كراسة 200 صفحة",
    category: "Papeterie",
    price: 12.5,
    stock: 320,
    minStock: 50,
    supplier: "Roco Maroc",
    lastRestocked: "2025-03-15",
  },
  {
    id: "PAP-002",
    name: "Cahier 100 pages",
    nameAr: "كراسة 100 صفحة",
    category: "Papeterie",
    price: 7.0,
    stock: 410,
    minStock: 60,
    supplier: "Roco Maroc",
    lastRestocked: "2025-03-15",
  },
  {
    id: "PAP-003",
    name: "Stylo Bille Bleu",
    nameAr: "قلم جاف أزرق",
    category: "Papeterie",
    price: 2.0,
    stock: 980,
    minStock: 200,
    supplier: "Bic Maghreb",
    lastRestocked: "2025-04-01",
  },
  {
    id: "PAP-004",
    name: "Stylo Bille Rouge",
    nameAr: "قلم جاف أحمر",
    category: "Papeterie",
    price: 2.0,
    stock: 540,
    minStock: 100,
    supplier: "Bic Maghreb",
    lastRestocked: "2025-04-01",
  },
  {
    id: "PAP-005",
    name: "Crayon HB",
    nameAr: "قلم رصاص HB",
    category: "Papeterie",
    price: 1.5,
    stock: 750,
    minStock: 150,
    supplier: "Stabilo Maroc",
    lastRestocked: "2025-03-20",
  },
  {
    id: "PAP-006",
    name: "Gomme blanche",
    nameAr: "ممحاة بيضاء",
    category: "Papeterie",
    price: 1.0,
    stock: 430,
    minStock: 80,
    supplier: "Stabilo Maroc",
    lastRestocked: "2025-03-20",
  },
  {
    id: "PAP-007",
    name: "Règle 30cm",
    nameAr: "مسطرة 30 سم",
    category: "Papeterie",
    price: 3.5,
    stock: 210,
    minStock: 40,
    supplier: "Roco Maroc",
    lastRestocked: "2025-02-10",
  },
  {
    id: "PAP-008",
    name: "Taille-crayon",
    nameAr: "مبراة أقلام",
    category: "Papeterie",
    price: 2.5,
    stock: 38,
    minStock: 50,
    supplier: "Bic Maghreb",
    lastRestocked: "2025-01-18",
  },
  {
    id: "PAP-009",
    name: "Surligneur jaune",
    nameAr: "قلم تمييز أصفر",
    category: "Papeterie",
    price: 4.0,
    stock: 190,
    minStock: 60,
    supplier: "Stabilo Maroc",
    lastRestocked: "2025-03-05",
  },
  {
    id: "PAP-010",
    name: "Colle en bâton",
    nameAr: "غراء على شكل عصا",
    category: "Papeterie",
    price: 5.0,
    stock: 145,
    minStock: 40,
    supplier: "Roco Maroc",
    lastRestocked: "2025-03-05",
  },

  // Livres Scolaires
  {
    id: "LIV-001",
    name: "Manuel Maths 1ère Bac",
    nameAr: "كتاب الرياضيات أولى باك",
    category: "Livres Scolaires",
    price: 55.0,
    stock: 85,
    minStock: 20,
    supplier: "Dar Al Kitab",
    lastRestocked: "2025-02-01",
  },
  {
    id: "LIV-002",
    name: "Manuel Physique-Chimie 2ème Bac",
    nameAr: "كتاب الفيزياء والكيمياء ثانية باك",
    category: "Livres Scolaires",
    price: 60.0,
    stock: 62,
    minStock: 15,
    supplier: "Dar Al Kitab",
    lastRestocked: "2025-02-01",
  },
  {
    id: "LIV-003",
    name: "Atlas de Géographie Maroc",
    nameAr: "أطلس جغرافية المغرب",
    category: "Livres Scolaires",
    price: 75.0,
    stock: 28,
    minStock: 10,
    supplier: "Librairie Nationale",
    lastRestocked: "2024-11-15",
  },
  {
    id: "LIV-004",
    name: "Dictionnaire Français-Arabe",
    nameAr: "قاموس فرنسي-عربي",
    category: "Livres Scolaires",
    price: 120.0,
    stock: 41,
    minStock: 10,
    supplier: "Librairie Nationale",
    lastRestocked: "2025-01-10",
  },
  {
    id: "LIV-005",
    name: "Manuel SVT Collège",
    nameAr: "كتاب علوم الحياة والأرض للإعدادي",
    category: "Livres Scolaires",
    price: 45.0,
    stock: 14,
    minStock: 20,
    supplier: "Dar Al Kitab",
    lastRestocked: "2024-12-05",
  },

  // Fournitures Artistiques
  {
    id: "ART-001",
    name: "Boîte aquarelle 24 couleurs",
    nameAr: "صندوق ألوان مائية 24 لون",
    category: "Fournitures Artistiques",
    price: 85.0,
    stock: 55,
    minStock: 15,
    supplier: "Artiste Casablanca",
    lastRestocked: "2025-03-10",
  },
  {
    id: "ART-002",
    name: "Pinceaux set 6 pièces",
    nameAr: "مجموعة فراش 6 قطع",
    category: "Fournitures Artistiques",
    price: 35.0,
    stock: 72,
    minStock: 20,
    supplier: "Artiste Casablanca",
    lastRestocked: "2025-03-10",
  },
  {
    id: "ART-003",
    name: "Carnet de croquis A4",
    nameAr: "كراسة رسم A4",
    category: "Fournitures Artistiques",
    price: 28.0,
    stock: 93,
    minStock: 25,
    supplier: "Roco Maroc",
    lastRestocked: "2025-02-20",
  },
  {
    id: "ART-004",
    name: "Pâte à modeler 6 couleurs",
    nameAr: "صلصال ملون 6 ألوان",
    category: "Fournitures Artistiques",
    price: 22.0,
    stock: 110,
    minStock: 30,
    supplier: "Artiste Casablanca",
    lastRestocked: "2025-01-25",
  },
  {
    id: "ART-005",
    name: "Crayons de couleur 12 pcs",
    nameAr: "أقلام تلوين 12 قطعة",
    category: "Fournitures Artistiques",
    price: 18.0,
    stock: 230,
    minStock: 50,
    supplier: "Stabilo Maroc",
    lastRestocked: "2025-04-02",
  },

  // Bureautique
  {
    id: "BUR-001",
    name: "Ramette papier A4 500 feuilles",
    nameAr: "رزمة ورق A4 500 ورقة",
    category: "Bureautique",
    price: 48.0,
    stock: 160,
    minStock: 30,
    supplier: "CEPAC Maroc",
    lastRestocked: "2025-04-05",
  },
  {
    id: "BUR-002",
    name: "Chemise cartonnée bleue",
    nameAr: "ملف كرتوني أزرق",
    category: "Bureautique",
    price: 3.0,
    stock: 350,
    minStock: 80,
    supplier: "CEPAC Maroc",
    lastRestocked: "2025-03-22",
  },
  {
    id: "BUR-003",
    name: "Agrafeuse de bureau",
    nameAr: "دباسة مكتبية",
    category: "Bureautique",
    price: 32.0,
    stock: 25,
    minStock: 10,
    supplier: "Bureau Plus",
    lastRestocked: "2025-01-30",
  },
  {
    id: "BUR-004",
    name: "Scotch transparent 19mm",
    nameAr: "شريط لاصق شفاف 19 ملم",
    category: "Bureautique",
    price: 6.0,
    stock: 275,
    minStock: 60,
    supplier: "Bic Maghreb",
    lastRestocked: "2025-03-18",
  },
  {
    id: "BUR-005",
    name: "Post-it 76x76mm",
    nameAr: "ورق لاصق 76x76 ملم",
    category: "Bureautique",
    price: 14.0,
    stock: 9,
    minStock: 20,
    supplier: "Bureau Plus",
    lastRestocked: "2025-02-14",
  },

  // Carterie
  {
    id: "CAR-001",
    name: "Cartes de vœux Aïd",
    nameAr: "بطاقات تهنئة العيد",
    category: "Carterie",
    price: 8.0,
    stock: 180,
    minStock: 40,
    supplier: "Imprimerie Atlas",
    lastRestocked: "2025-03-25",
  },
  {
    id: "CAR-002",
    name: "Enveloppes blanches C5 (25 pcs)",
    nameAr: "مظاريف بيضاء C5 (25 قطعة)",
    category: "Carterie",
    price: 10.0,
    stock: 95,
    minStock: 30,
    supplier: "CEPAC Maroc",
    lastRestocked: "2025-02-28",
  },
  {
    id: "CAR-003",
    name: "Cartes anniversaire",
    nameAr: "بطاقات عيد الميلاد",
    category: "Carterie",
    price: 7.0,
    stock: 210,
    minStock: 40,
    supplier: "Imprimerie Atlas",
    lastRestocked: "2025-04-01",
  },
];

// ── Derived helpers ────────────────────────────────────────────────
export const categories: Category[] = [
  "Papeterie",
  "Livres Scolaires",
  "Fournitures Artistiques",
  "Bureautique",
  "Carterie",
];

export const lowStockItems = stockItems.filter(
  (item) => item.stock <= item.minStock
);

export const totalStockValue = stockItems.reduce(
  (acc, item) => acc + item.price * item.stock,
  0
);

export const stockByCategory = categories.map((cat) => {
  const items = stockItems.filter((i) => i.category === cat);
  return {
    category: cat,
    count: items.length,
    totalItems: items.reduce((a, i) => a + i.stock, 0),
    value: items.reduce((a, i) => a + i.price * i.stock, 0),
  };
});