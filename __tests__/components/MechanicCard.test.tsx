import { render, screen } from '@testing-library/react'
import { MechanicCard } from '@/components/mechanic-card'
import type { Mechanic } from '@/lib/types'

const mockMechanic: Mechanic = {
  id: '1',
  name: 'Garage Mouride',
  email: 'contact@garagemouride.sn',
  phone: '+221 77 123 45 67',
  address: 'Route de Rufisque, Parcelles Assainies',
  city: 'Dakar',
  latitude: 14.7645,
  longitude: -17.366,
  specialties: ['Vidange', 'Freins', 'Révision', 'Diagnostic'],
  rating: 4.8,
  reviewCount: 127,
  experience: 15,
  description: 'Garage familial avec plus de 15 ans d\'expérience. Spécialisé dans l\'entretien et la réparation de tous types de véhicules.',
  image: '/professional-mechanic-garage.jpg',
  hourlyRate: 5000,
  availability: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
}

describe('MechanicCard', () => {
  it('renders mechanic information correctly', () => {
    render(<MechanicCard mechanic={mockMechanic} />)
    
    expect(screen.getByText('Garage Mouride')).toBeInTheDocument()
    expect(screen.getByText('Dakar')).toBeInTheDocument()
    expect(screen.getByText('4.8')).toBeInTheDocument()
    expect(screen.getByText('(127)')).toBeInTheDocument()
    expect(screen.getByText('15 ans d\'exp.')).toBeInTheDocument()
    expect(screen.getByText('5 000 FCFA/h')).toBeInTheDocument()
  })

  it('renders specialties correctly', () => {
    render(<MechanicCard mechanic={mockMechanic} />)
    
    expect(screen.getByText('Vidange')).toBeInTheDocument()
    expect(screen.getByText('Freins')).toBeInTheDocument()
    expect(screen.getByText('Révision')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument() // +1 for the 4th specialty
  })

  it('renders distance when provided', () => {
    render(<MechanicCard mechanic={mockMechanic} distance={1.5} />)
    
    expect(screen.getByText('1.5 km')).toBeInTheDocument()
  })

  it('renders distance in meters when less than 1km', () => {
    render(<MechanicCard mechanic={mockMechanic} distance={0.5} />)
    
    expect(screen.getByText('500 m')).toBeInTheDocument()
  })

  it('renders "Voir le profil" button', () => {
    render(<MechanicCard mechanic={mockMechanic} />)
    
    expect(screen.getByText('Voir le profil')).toBeInTheDocument()
  })

  it('has correct link to mechanic profile', () => {
    render(<MechanicCard mechanic={mockMechanic} />)
    
    const link = screen.getByRole('link', { name: /voir le profil/i })
    expect(link).toHaveAttribute('href', '/mechanics/1')
  })
})