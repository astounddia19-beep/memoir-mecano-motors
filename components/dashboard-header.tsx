"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Wrench,
  User,
  LogOut,
  ShoppingCart,
  Home,
  Calendar,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Package,
  ShoppingBag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { totalItems } = useCart()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/mechanics", label: "Mécaniciens", icon: Wrench },
    { href: "/shop", label: "Boutique", icon: ShoppingCart },
    { href: "/reservations", label: "Réservations", icon: Calendar },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ]

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Wrench className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Mecano Motor's</h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-4 flex-1 justify-center">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("gap-2", isActive && "bg-primary/10 text-primary")}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{link.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                    <span className="text-xs text-primary mt-1 capitalize">{user?.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="lg:hidden">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Mon Profil
                  </Link>
                </DropdownMenuItem>
                {user?.role === "client" && (
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                      <Package className="h-4 w-4" />
                      Mes Commandes
                    </Link>
                  </DropdownMenuItem>
                )}
                {user?.role === "vendor" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/vendor/products" className="flex items-center gap-2 cursor-pointer">
                        <Package className="h-4 w-4" />
                        Mes Produits
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/vendor/orders" className="flex items-center gap-2 cursor-pointer">
                        <ShoppingBag className="h-4 w-4" />
                        Mes Commandes
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
