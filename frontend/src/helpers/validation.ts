import * as z from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom ne doit pas dépasser 100 caractères")
      .trim(),

    nameAr: z
      .string()
      .min(1, "Le nom en arabe est requis")
      .min(2, "Le nom en arabe doit contenir au moins 2 caractères")
      .max(100, "Le nom en arabe ne doit pas dépasser 100 caractères")
      .trim(),

    ref: z
      .string()
      .min(1, "La référence est requise")
      .regex(/^[A-Z]{2,10}-\d{3,6}$/, {
        message:
          'La référence doit suivre le format "XXX-000" (ex: BUR-002)',
      })
      .trim(),

    price: z.coerce
      .number()
      .positive( "Le prix doit être un nombre positif "),

    stock: z.coerce
      .number()
      .int("Le stock doit être un entier")
      .positive("Le stock doit êtreun nombre positif"),

    minStock: z.coerce
      .number()
      .int("Le stock minimum doit être un entier")
      .positive("Le stock minimum doit être un nombre positif"),

    supplier: z
      .string()
      .min(1, "Le fournisseur est requis")
      .min(2, "Le fournisseur doit contenir au moins 2 caractères")
      .max(100, "Le fournisseur ne doit pas dépasser 100 caractères")
      .trim(),

    categoryIds: z.array(z.string()).min(1, "Choisir au moins une catégorie"),
  })
  .refine((data) => data.minStock <= data.stock, {
    message: "Le stock minimum ne peut pas être supérieur au stock",
    path: ["minStock"],
  });


export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne doit pas dépasser 100 caractères")
    .trim(),

  nameAr: z
    .string()
    .min(1, "Le nom en arabe est requis")
    .min(2, "Le nom en arabe doit contenir au moins 2 caractères")
    .max(100, "Le nom en arabe ne doit pas dépasser 100 caractères")
    .trim(),
});