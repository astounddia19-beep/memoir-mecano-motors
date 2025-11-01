import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 12)

  // Create users
  const client = await prisma.user.create({
    data: {
      firstName: 'Awa',
      lastName: 'Diop',
      name: 'Awa Diop', // Maintien pour compatibilité
      email: 'awa.diop@example.com',
      password: hashedPassword,
      role: 'CLIENT',
      phone: '+221 77 123 45 67',
      address: 'Dakar, Sénégal',
    },
  })

  const vendor = await prisma.user.create({
    data: {
      firstName: 'Souleymane',
      lastName: 'Mbaye',
      name: 'Souleymane Mbaye', // Maintien pour compatibilité
      email: 'souleymane.mbaye@example.com',
      password: hashedPassword,
      role: 'VENDOR',
      phone: '+221 77 234 56 78',
      address: 'Dakar, Sénégal',
    },
  })

  const mechanicUser = await prisma.user.create({
    data: {
      firstName: 'Ndeye',
      lastName: 'Sarr',
      name: 'Ndeye Sarr', // Maintien pour compatibilité
      email: 'ndeye.sarr@example.com',
      password: hashedPassword,
      role: 'MECHANIC',
      phone: '+221 77 345 67 89',
      address: 'Route de Rufisque, Parcelles Assainies',
    },
  })

  // Create mechanic profile
  const mechanic = await prisma.mechanic.create({
    data: {
      userId: mechanicUser.id,
      phone: '+221 77 345 67 89',
      address: 'Route de Rufisque, Parcelles Assainies',
      city: 'Dakar',
      latitude: 14.7645,
      longitude: -17.366,
      specialties: ['Vidange', 'Freins', 'Révision', 'Diagnostic'],
      experience: 15,
      description: 'Garage familial avec plus de 15 ans d\'expérience. Spécialisé dans l\'entretien et la réparation de tous types de véhicules.',
      image: '/professional-mechanic-garage.jpg',
      hourlyRate: 5000,
      availability: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      isVerified: true,
    },
  })

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Filtre à huile premium',
        description: 'Filtre à huile haute performance pour tous types de véhicules.',
        price: 7500,
        category: 'Filtres',
        brand: 'Bosch',
        image: '/oil-filter-product.jpg',
        stock: 45,
        vendorId: vendor.id,
        rating: 4.7,
        reviewCount: 89,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Plaquettes de frein avant',
        description: 'Plaquettes de frein céramique pour une performance optimale.',
        price: 28000,
        category: 'Freinage',
        brand: 'Brembo',
        image: '/brake-pads-product.jpg',
        stock: 28,
        vendorId: vendor.id,
        rating: 4.9,
        reviewCount: 156,
      },
    }),
  ])

  // Create reservation
  const reservation = await prisma.reservation.create({
    data: {
      clientId: client.id,
      mechanicId: mechanic.id,
      service: 'Vidange moteur',
      date: new Date('2025-01-15'),
      time: '14:00',
      status: 'CONFIRMED',
      notes: 'Huile synthétique préférée',
      vehicleMake: 'Renault',
      vehicleModel: 'Clio',
      vehicleYear: 2019,
      vehiclePlate: 'AB-123-CD',
      estimatedDuration: 60,
      estimatedPrice: 85,
    },
  })

  // Create order
  const order = await prisma.order.create({
    data: {
      clientId: client.id,
      total: 35500, // 7500 + 28000
      status: 'PENDING',
      shippingAddress: 'Dakar, Sénégal',
      paymentMethod: 'WAVE',
    },
  })

  // Create order items
  await prisma.orderItem.createMany({
    data: [
      {
        orderId: order.id,
        productId: products[0].id,
        quantity: 1,
        price: 7500,
      },
      {
        orderId: order.id,
        productId: products[1].id,
        quantity: 1,
        price: 28000,
      },
    ],
  })

  // Create review
  await prisma.review.create({
    data: {
      clientId: client.id,
      mechanicId: mechanic.id,
      rating: 5,
      comment: 'Service impeccable, très professionnel. Je recommande vivement!',
      service: 'Vidange',
    },
  })

  // Create messages
  await prisma.message.createMany({
    data: [
      {
        senderId: client.id,
        receiverId: mechanicUser.id,
        content: 'Bonjour, je souhaiterais prendre rendez-vous pour une vidange.',
      },
      {
        senderId: mechanicUser.id,
        receiverId: client.id,
        content: 'Bonjour! Bien sûr, nous avons des disponibilités demain à 14h. Cela vous convient?',
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Created ${await prisma.user.count()} users`)
  console.log(`🔧 Created ${await prisma.mechanic.count()} mechanics`)
  console.log(`📦 Created ${await prisma.product.count()} products`)
  console.log(`📅 Created ${await prisma.reservation.count()} reservations`)
  console.log(`🛒 Created ${await prisma.order.count()} orders`)
  console.log(`⭐ Created ${await prisma.review.count()} reviews`)
  console.log(`💬 Created ${await prisma.message.count()} messages`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

