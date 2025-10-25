// Wave QR Code Generator for Senegalese mobile payments
// This generates a valid Wave QR code format

export interface WavePaymentData {
  amount: number
  phone?: string
  description: string
  orderId: string
}

export function generateWaveQRCode(data: WavePaymentData): string {
  // Wave QR code format for Senegal
  // Format: wave://pay?amount=AMOUNT&phone=PHONE&description=DESC&order=ORDER_ID
  
  const params = new URLSearchParams({
    amount: data.amount.toString(),
    description: data.description,
    order: data.orderId,
  })
  
  if (data.phone) {
    params.set('phone', data.phone)
  }
  
  return `wave://pay?${params.toString()}`
}

export function generateWaveQRImageUrl(data: WavePaymentData): string {
  // Generate QR code image URL using a QR code service
  const qrData = generateWaveQRCode(data)
  
  // Using qr-server.com API for QR code generation
  const encodedData = encodeURIComponent(qrData)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`
}

// Orange Money QR Code Generator
export function generateOrangeMoneyQRCode(data: WavePaymentData): string {
  const params = new URLSearchParams({
    amount: data.amount.toString(),
    description: data.description,
    order: data.orderId,
  })
  
  if (data.phone) {
    params.set('phone', data.phone)
  }
  
  return `orange-money://pay?${params.toString()}`
}

export function generateOrangeMoneyQRImageUrl(data: WavePaymentData): string {
  const qrData = generateOrangeMoneyQRCode(data)
  const encodedData = encodeURIComponent(qrData)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`
}

// Free Money QR Code Generator
export function generateFreeMoneyQRCode(data: WavePaymentData): string {
  const params = new URLSearchParams({
    amount: data.amount.toString(),
    description: data.description,
    order: data.orderId,
  })
  
  if (data.phone) {
    params.set('phone', data.phone)
  }
  
  return `free-money://pay?${params.toString()}`
}

export function generateFreeMoneyQRImageUrl(data: WavePaymentData): string {
  const qrData = generateFreeMoneyQRCode(data)
  const encodedData = encodeURIComponent(qrData)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`
}

