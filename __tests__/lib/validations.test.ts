import { describe, it, expect } from '@jest/globals'
import {
  loginSchema,
  registerSchema,
  reservationSchema,
  productSchema,
  orderSchema,
  messageSchema,
  mechanicProfileSchema,
  reviewSchema
} from '@/lib/validations'

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123'
      }
      expect(() => loginSchema.parse(validData)).not.toThrow()
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123'
      }
      expect(() => loginSchema.parse(invalidData)).toThrow()
    })

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123'
      }
      expect(() => loginSchema.parse(invalidData)).toThrow()
    })
  })

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'CLIENT',
        phone: '+221701234567',
        address: '123 Rue de la Paix, Dakar'
      }
      expect(() => registerSchema.parse(validData)).not.toThrow()
    })

    it('should reject mismatched passwords', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'DifferentPassword',
        role: 'CLIENT'
      }
      expect(() => registerSchema.parse(invalidData)).toThrow()
    })

    it('should reject weak password', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak',
        confirmPassword: 'weak',
        role: 'CLIENT'
      }
      expect(() => registerSchema.parse(invalidData)).toThrow()
    })
  })

  describe('reservationSchema', () => {
    it('should validate correct reservation data', () => {
      const validData = {
        mechanicId: 'mechanic123',
        service: 'Vidange moteur',
        date: '2025-01-20',
        time: '14:00',
        notes: 'Huile synthétique préférée',
        vehicleMake: 'Renault',
        vehicleModel: 'Clio',
        vehicleYear: 2019,
        vehiclePlate: 'AB-123-CD',
        estimatedDuration: 60,
        estimatedPrice: 15000
      }
      expect(() => reservationSchema.parse(validData)).not.toThrow()
    })

    it('should reject invalid vehicle year', () => {
      const invalidData = {
        mechanicId: 'mechanic123',
        service: 'Vidange moteur',
        date: '2025-01-20',
        time: '14:00',
        vehicleMake: 'Renault',
        vehicleModel: 'Clio',
        vehicleYear: 1800, // Too old
        vehiclePlate: 'AB-123-CD',
        estimatedDuration: 60,
        estimatedPrice: 15000
      }
      expect(() => reservationSchema.parse(invalidData)).toThrow()
    })
  })

  describe('productSchema', () => {
    it('should validate correct product data', () => {
      const validData = {
        name: 'Filtre à huile premium',
        description: 'Filtre à huile haute performance pour tous types de véhicules',
        price: 7500,
        category: 'Filtres',
        brand: 'Bosch',
        image: 'https://example.com/image.jpg',
        stock: 45
      }
      expect(() => productSchema.parse(validData)).not.toThrow()
    })

    it('should reject negative price', () => {
      const invalidData = {
        name: 'Filtre à huile premium',
        description: 'Filtre à huile haute performance',
        price: -100, // Negative price
        category: 'Filtres',
        brand: 'Bosch',
        stock: 45
      }
      expect(() => productSchema.parse(invalidData)).toThrow()
    })
  })

  describe('orderSchema', () => {
    it('should validate correct order data', () => {
      const validData = {
        items: [
          { productId: 'product1', quantity: 2 },
          { productId: 'product2', quantity: 1 }
        ],
        shippingAddress: '123 Rue de la Paix, Dakar, Sénégal',
        paymentMethod: 'WAVE'
      }
      expect(() => orderSchema.parse(validData)).not.toThrow()
    })

    it('should reject empty items array', () => {
      const invalidData = {
        items: [], // Empty array
        shippingAddress: '123 Rue de la Paix, Dakar, Sénégal',
        paymentMethod: 'WAVE'
      }
      expect(() => orderSchema.parse(invalidData)).toThrow()
    })
  })

  describe('messageSchema', () => {
    it('should validate correct message data', () => {
      const validData = {
        receiverId: 'user123',
        content: 'Bonjour, je souhaiterais prendre rendez-vous.'
      }
      expect(() => messageSchema.parse(validData)).not.toThrow()
    })

    it('should reject empty content', () => {
      const invalidData = {
        receiverId: 'user123',
        content: '' // Empty content
      }
      expect(() => messageSchema.parse(invalidData)).toThrow()
    })
  })

  describe('mechanicProfileSchema', () => {
    it('should validate correct mechanic profile data', () => {
      const validData = {
        phone: '+221701234567',
        address: '123 Rue de la Paix, Dakar',
        city: 'Dakar',
        latitude: 14.7645,
        longitude: -17.366,
        specialties: ['Vidange', 'Freins', 'Révision'],
        experience: 5,
        description: 'Mécanicien expérimenté avec plus de 5 ans d\'expérience',
        image: 'https://example.com/mechanic.jpg',
        hourlyRate: 5000,
        availability: ['Lundi', 'Mardi', 'Mercredi']
      }
      expect(() => mechanicProfileSchema.parse(validData)).not.toThrow()
    })

    it('should reject invalid coordinates', () => {
      const invalidData = {
        phone: '+221701234567',
        address: '123 Rue de la Paix, Dakar',
        city: 'Dakar',
        latitude: 200, // Invalid latitude
        longitude: -17.366,
        specialties: ['Vidange'],
        experience: 5,
        description: 'Mécanicien expérimenté',
        hourlyRate: 5000,
        availability: ['Lundi']
      }
      expect(() => mechanicProfileSchema.parse(invalidData)).toThrow()
    })
  })

  describe('reviewSchema', () => {
    it('should validate correct review data', () => {
      const validData = {
        mechanicId: 'mechanic123',
        rating: 5,
        comment: 'Excellent service, très professionnel!',
        service: 'Vidange moteur'
      }
      expect(() => reviewSchema.parse(validData)).not.toThrow()
    })

    it('should reject invalid rating', () => {
      const invalidData = {
        mechanicId: 'mechanic123',
        rating: 6, // Invalid rating (should be 1-5)
        comment: 'Excellent service!',
        service: 'Vidange moteur'
      }
      expect(() => reviewSchema.parse(invalidData)).toThrow()
    })
  })
})

