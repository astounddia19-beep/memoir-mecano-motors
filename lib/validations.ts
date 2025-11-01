import { z } from "zod"

// Schémas d'authentification
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide").optional().or(z.literal("")).or(z.undefined()),
  // Exigence assouplie: minimum 6 caractères, pas d'obligation de majuscule/chiffre
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string().optional(),
  // Accepte majuscules/minuscules et normalise en MAJ pour la base
  role: z
    .union([
      z.enum(["CLIENT", "MECHANIC", "VENDOR", "ADMIN"]),
      z.enum(["client", "mechanic", "vendor", "admin"]) as unknown as z.ZodEnum<
        ["client", "mechanic", "vendor", "admin"]
      >,
    ])
    .transform((v) => v.toString().toUpperCase())
    .default("CLIENT"),
  phone: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => {
  if (typeof data.confirmPassword === "undefined") return true
  return data.password === data.confirmPassword
}, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

// Schémas de réservation
export const reservationSchema = z.object({
  mechanicId: z.string().min(1, "Mécanicien requis"),
  service: z.string().min(1, "Service requis"),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  notes: z.string().optional(),
  vehicleMake: z.string().min(1, "Marque du véhicule requise"),
  vehicleModel: z.string().min(1, "Modèle du véhicule requis"),
  vehicleYear: z.number().min(1900).max(new Date().getFullYear() + 1),
  vehiclePlate: z.string().min(1, "Plaque d'immatriculation requise"),
  estimatedDuration: z.number().min(30).max(480), // 30 min à 8h
  estimatedPrice: z.number().min(0),
})

// Schémas de produit
export const productSchema = z.object({
  name: z.string().min(1, "Nom du produit requis"),
  description: z.string().min(10, "Description trop courte"),
  price: z.number().min(0, "Prix invalide"),
  category: z.string().min(1, "Catégorie requise"),
  brand: z.string().min(1, "Marque requise"),
  image: z.string().url("URL d'image invalide").optional(),
  stock: z.number().min(0, "Stock invalide"),
})

// Schémas de commande
export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1, "Quantité invalide"),
  })).min(1, "Au moins un produit requis"),
  shippingAddress: z.string().min(10, "Adresse de livraison trop courte"),
  paymentMethod: z.enum(["WAVE", "ORANGE_MONEY", "FREE_MONEY", "CARD", "CASH"]),
})

// Schémas de message
export const messageSchema = z.object({
  receiverId: z.string().min(1, "Destinataire requis"),
  content: z.string().min(1, "Message requis").max(1000, "Message trop long"),
})

// Schémas de profil mécanicien
export const mechanicProfileSchema = z.object({
  phone: z.string().min(1, "Téléphone requis"),
  address: z.string().min(10, "Adresse requise"),
  city: z.string().min(1, "Ville requise"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  specialties: z.array(z.string()).min(1, "Au moins une spécialité requise"),
  experience: z.number().min(0).max(50),
  description: z.string().min(20, "Description trop courte"),
  image: z.string().url("URL d'image invalide").optional(),
  hourlyRate: z.number().min(1000).max(50000), // 1000 à 50000 FCFA/h
  availability: z.array(z.string()).min(1, "Disponibilités requises"),
})

// Schémas de review
export const reviewSchema = z.object({
  mechanicId: z.string().min(1, "Mécanicien requis"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Commentaire trop court").max(500, "Commentaire trop long"),
  service: z.string().min(1, "Service requis"),
})

// Types TypeScript dérivés
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ReservationInput = z.infer<typeof reservationSchema>
export type ProductInput = z.infer<typeof productSchema>
export type OrderInput = z.infer<typeof orderSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type MechanicProfileInput = z.infer<typeof mechanicProfileSchema>
export type ReviewInput = z.infer<typeof reviewSchema>

