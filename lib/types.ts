export type UserRole = "client" | "mechanic" | "vendor" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  address?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface Mechanic {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  latitude: number
  longitude: number
  specialties: string[]
  rating: number
  reviewCount: number
  experience: number
  description: string
  image: string
  hourlyRate: number
  availability: string[]
}

export interface Review {
  id: string
  mechanicId: string
  clientName: string
  rating: number
  comment: string
  date: string
  service: string
}

export type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled"

export interface Reservation {
  id: string
  clientId: string
  clientName: string
  mechanicId: string
  mechanicName: string
  service: string
  date: string
  time: string
  status: ReservationStatus
  notes?: string
  vehicleInfo: {
    make: string
    model: string
    year: number
    plate: string
  }
  estimatedDuration: number
  estimatedPrice: number
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  image: string
  stock: number
  vendorId: string
  vendorName: string
  rating: number
  reviewCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface Order {
  id: string
  clientId: string
  clientName: string
  items: CartItem[]
  total: number
  status: OrderStatus
  shippingAddress: string
  paymentMethod?: "wave" | "orange-money" | "free-money" | "card" | "cash"
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: UserRole
  receiverId: string
  receiverName: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  clientId: string
  clientName: string
  mechanicId: string
  mechanicName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}
