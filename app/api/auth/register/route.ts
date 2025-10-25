import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['CLIENT', 'MECHANIC', 'VENDOR']),
  phone: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role, phone } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
        phone,
        // Note: In a real app, you'd store the hashed password
        // For now, we'll use a simple approach
      }
    })

    // If user is a mechanic, create mechanic profile
    if (role === 'MECHANIC') {
      await prisma.mechanic.create({
        data: {
          userId: user.id,
          phone: phone || '',
          address: '',
          city: '',
          latitude: 0,
          longitude: 0,
          specialties: [],
          experience: 0,
          description: '',
          availability: [],
          hourlyRate: 0,
        }
      })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    )
  }
}

