import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider as NextAuthProvider } from "@/lib/auth-provider"
import { AuthProvider as AppAuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mecano Motor's - Plateforme de Services Automobiles au Sénégal",
  description:
    "Trouvez des mécaniciens qualifiés, réservez des services et achetez des pièces détachées partout au Sénégal",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} font-sans antialiased`}>
        <NextAuthProvider>
          <AppAuthProvider>
            <CartProvider>{children}</CartProvider>
          </AppAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
