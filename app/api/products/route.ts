import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'name'

    const where: any = {}

    if (category && category !== 'all') {
      where.category = category
    }

    if (brand && brand !== 'all') {
      where.brand = brand
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ]
    }

    const orderBy: any = {}
    switch (sortBy) {
      case 'name':
        orderBy.name = 'asc'
        break
      case 'price-asc':
        orderBy.price = 'asc'
        break
      case 'price-desc':
        orderBy.price = 'desc'
        break
      case 'rating':
        orderBy.rating = 'desc'
        break
      default:
        orderBy.name = 'asc'
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json(products)

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    )
  }
}

