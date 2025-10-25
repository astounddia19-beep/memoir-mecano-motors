import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        // Include mechanic profile if exists
        // Note: This would need to be added to the Prisma schema
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // In a real app, you'd verify the password here
    // const isValidPassword = await bcrypt.compare(password, user.password)
    // if (!isValidPassword) {
    //   return NextResponse.json(
    //     { error: 'Email ou mot de passe incorrect' },
    //     { status: 401 }
    //   )
    // }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address,
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    )
  }
}

