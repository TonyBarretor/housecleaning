import {
  AppointmentStatus,
  QuoteStatus,
  PaymentStatus,
  ServiceFrequency
} from '@prisma/client'

export interface BookingFormData {
  name: string
  email: string
  phone: string
  address: string
  preferredDate: Date
  preferredTime: string
  notes?: string
}

export interface QuoteData {
  id: string
  oneTimePrice: number
  monthlyPrice: number
  twiceMonthlyPrice: number
  status: QuoteStatus
  client: {
    name: string
    address: string
  }
}

export interface PriceEstimate {
  bedrooms: number
  bathrooms: number
  squareFeet?: number
  deepCleaning: boolean
  estimatedRange: {
    min: number
    max: number
  }
}

export interface ClientData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
  appointmentCount: number
  totalSpent: number
}

export interface DashboardStats {
  totalClients: number
  pendingAppointments: number
  pendingQuotes: number
  monthlyRevenue: number
  completedPayments: number
}

export {
  AppointmentStatus,
  QuoteStatus,
  PaymentStatus,
  ServiceFrequency
}
