import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const specialty = searchParams.get('specialty')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'rating'

    const where: any = {}

    if (city && city !== 'all') {
      where.city = city
    }

    if (specialty && specialty !== 'all') {
      where.specialties = {
        has: specialty
      }
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { city: { contains: search, mode: 'insensitive' } },
        { specialties: { has: search } }
      ]
    }

    const orderBy: any = {}
    switch (sortBy) {
      case 'rating':
        orderBy.rating = 'desc'
        break
      case 'reviews':
        orderBy.reviewCount = 'desc'
        break
      case 'price':
        orderBy.hourlyRate = 'asc'
        break
      case 'experience':
        orderBy.experience = 'desc'
        break
      default:
        orderBy.rating = 'desc'
    }

    const mechanics = await prisma.mechanic.findMany({
      where,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          }
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            client: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(mechanics)

  } catch (error) {
    console.error('Error fetching mechanics:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des mécaniciens' },
      { status: 500 }
    )
  }
}

