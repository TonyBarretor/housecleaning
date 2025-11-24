import nodemailer from 'nodemailer'
import {
  bookingConfirmationEmail,
  quoteEmail,
  paymentConfirmationEmail,
  type BookingConfirmationEmailData,
  type QuoteEmailData,
  type PaymentConfirmationEmailData,
} from '@/emails/templates'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendBookingConfirmation(data: BookingConfirmationEmailData, to: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Premium Cleaning <noreply@premiumcleaning.com>',
      to,
      subject: 'Booking Confirmed - Premium House Cleaning',
      html: bookingConfirmationEmail(data),
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export async function sendQuote(data: QuoteEmailData, to: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Premium Cleaning <noreply@premiumcleaning.com>',
      to,
      subject: 'Your Personalized Quote - Premium House Cleaning',
      html: quoteEmail(data),
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export async function sendPaymentConfirmation(data: PaymentConfirmationEmailData, to: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Premium Cleaning <noreply@premiumcleaning.com>',
      to,
      subject: 'Payment Confirmed - Welcome to Premium House Cleaning',
      html: paymentConfirmationEmail(data),
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}
