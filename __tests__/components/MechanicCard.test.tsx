import { render, screen } from '@testing-library/react'
import { MechanicCard } from '@/components/mechanic-card'
import type { Mechanic } from '@/lib/types'

const mockMechanic: Mechanic = {
  id: '1',
  name: 'Garage Test',
  email: 'test@garage.com',
  phone: '+221 77 123 45 67',
  address: 'Test Address',
  city: 'Dakar',
  latitude: 14.7645,
  longitude: -17.366,
  specialties: ['Vidange', 'Freins'],
  rating: 4.5,
  reviewCount: 10,
  experience: 5,
  description: 'Test garage description',
  image: '/test-image.jpg',
  hourlyRate: 5000,
  availability: ['Lundi', 'Mardi'],
}

describe('MechanicCard', () => {
  it('renders mechanic information correctly', () => {
    render(<MechanicCard mechanic={mockMechanic} />)
    
    expect(screen.getByText('Garage Test')).toBeInTheDocument()
    expect(screen.getByText('Dakar')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('5 ans d\'exp.')).toBeInTheDocument()
    expect(screen.getByText('5,000 FCFA/h')).toBeInTheDocument()
  })

  it('displays distance when provided', () => {
    render(<MechanicCard mechanic={mockMechanic} distance={1.5} />)
    
    expect(screen.getByText('1.5 km')).toBeInTheDocument()
  })

  it('displays specialties correctly', () => {
    render(<MechanicCard mechanic={mockMechanic} />)
    
    expect(screen.getByText('Vidange')).toBeInTheDocument()
    expect(screen.getByText('Freins')).toBeInTheDocument()
  })
})

