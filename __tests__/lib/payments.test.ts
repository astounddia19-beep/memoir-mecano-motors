import { processPayment } from '@/lib/payments'

// Mock environment variables
process.env.WAVE_API_KEY = 'test-wave-key'
process.env.WAVE_API_SECRET = 'test-wave-secret'
process.env.ORANGE_MONEY_API_KEY = 'test-orange-key'
process.env.ORANGE_MONEY_API_SECRET = 'test-orange-secret'

// Mock fetch
global.fetch = jest.fn()

describe('Payment Processing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('processes cash payment successfully', async () => {
    const request = {
      amount: 10000,
      phone: '+221771234567',
      description: 'Test payment',
      orderId: 'order-123',
    }

    const result = await processPayment('cash', request)
    
    expect(result.success).toBe(true)
    expect(result.transactionId).toMatch(/^cash_/)
  })

  it('handles wave payment', async () => {
    const request = {
      amount: 10000,
      phone: '+221771234567',
      description: 'Test payment',
      orderId: 'order-123',
    }

    // Mock successful Wave API response
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ transaction_id: 'wave_123' }),
    })

    const result = await processPayment('wave', request)
    
    expect(result.success).toBe(true)
    expect(result.transactionId).toBe('wave_123')
  })

  it('handles payment errors gracefully', async () => {
    const request = {
      amount: 10000,
      phone: '+221771234567',
      description: 'Test payment',
      orderId: 'order-123',
    }

    // Mock failed Wave API response
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    })

    const result = await processPayment('wave', request)
    
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})

