import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { validateRequest } from '@/lib/validation-middleware'
import { handleError } from '@/lib/error-handler'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateRequest(registerSchema, body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { email, password, firstName, lastName, role, phone, address } = validation.data

    // Check if user already exists (seulement si email fourni)
    if (email && email.trim()) {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.trim() }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Un utilisateur avec cet email existe déjà' },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`, // Maintien pour compatibilité
        email: email && email.trim() ? email.trim() : null,
        password: hashedPassword,
        role,
        phone,
        address,
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
    const { message, statusCode } = handleError(error)
    return NextResponse.json(
      { error: message },
      { status: statusCode }
    )
  }
}

