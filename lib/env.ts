import { z } from "zod"

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  
  // NextAuth
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  
  // Payment APIs
  WAVE_API_KEY: z.string().optional(),
  WAVE_API_SECRET: z.string().optional(),
  ORANGE_MONEY_API_KEY: z.string().optional(),
  ORANGE_MONEY_API_SECRET: z.string().optional(),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional().transform(val => val ? parseInt(val) : 587),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  
  // Push Notifications
  VAPID_PUBLIC_KEY: z.string().optional(),
  VAPID_PRIVATE_KEY: z.string().optional(),
  
  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export const env = envSchema.parse(process.env)

export function validateEnv() {
  try {
    envSchema.parse(process.env)
    console.log("✅ Environment variables validated successfully")
  } catch (error) {
    console.error("❌ Environment validation failed:", error)
    process.exit(1)
  }
}

