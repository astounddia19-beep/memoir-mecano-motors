import nodemailer from 'nodemailer'
import webpush from 'web-push'

// Email configuration

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})


// Web Push configuration
webpush.setVapidDetails(
  'mailto:contact@mecanomotors.sn',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export interface NotificationData {
  title: string
  body: string
  icon?: string
  url?: string
}

export async function sendEmailNotification(
  to: string,
  subject: string,
  html: string
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    })
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export async function sendPushNotification(
  subscription: any,
  data: NotificationData
) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(data))
    console.log('Push notification sent successfully')
  } catch (error) {
    console.error('Error sending push notification:', error)
    throw error
  }
}

// Email templates
export const emailTemplates = {
  reservationConfirmed: (mechanicName: string, date: string, time: string) => ({
    subject: 'Réservation confirmée - Mecano Motor\'s',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27;">Réservation confirmée</h2>
        <p>Votre réservation a été confirmée avec <strong>${mechanicName}</strong>.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Heure:</strong> ${time}</p>
        <p>Merci d'utiliser Mecano Motor's !</p>
      </div>
    `
  }),

  orderShipped: (orderId: string, trackingNumber?: string) => ({
    subject: 'Commande expédiée - Mecano Motor\'s',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27;">Commande expédiée</h2>
        <p>Votre commande #${orderId} a été expédiée.</p>
        ${trackingNumber ? `<p><strong>Numéro de suivi:</strong> ${trackingNumber}</p>` : ''}
        <p>Merci pour votre achat !</p>
      </div>
    `
  }),

  newMessage: (senderName: string) => ({
    subject: 'Nouveau message - Mecano Motor\'s',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27;">Nouveau message</h2>
        <p>Vous avez reçu un nouveau message de <strong>${senderName}</strong>.</p>
        <p>Connectez-vous pour le lire.</p>
      </div>
    `
  })
}

