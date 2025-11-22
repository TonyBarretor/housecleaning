'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatPrice } from '@/lib/utils'
import { FiCalendar, FiDollarSign, FiUsers, FiCheckCircle } from 'react-icons/fi'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [appointments, setAppointments] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalClients: 0,
    pendingAppointments: 0,
    pendingQuotes: 0,
    monthlyRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [quoteForm, setQuoteForm] = useState({
    oneTimePrice: '',
    monthlyPrice: '',
    twiceMonthlyPrice: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchData()
    }
  }, [status, router])

  const fetchData = async () => {
    try {
      const [appointmentsRes, statsRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/stats'),
      ])

      if (appointmentsRes.ok) {
        const data = await appointmentsRes.json()
        setAppointments(data.appointments || [])
      }

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateQuote = async (appointmentId: string) => {
    if (!quoteForm.oneTimePrice || !quoteForm.monthlyPrice || !quoteForm.twiceMonthlyPrice) {
      alert('Please fill in all price fields')
      return
    }

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId,
          oneTimePrice: parseFloat(quoteForm.oneTimePrice),
          monthlyPrice: parseFloat(quoteForm.monthlyPrice),
          twiceMonthlyPrice: parseFloat(quoteForm.twiceMonthlyPrice),
        }),
      })

      if (response.ok) {
        alert('Quote created and sent to client!')
        setSelectedAppointment(null)
        setQuoteForm({ oneTimePrice: '', monthlyPrice: '', twiceMonthlyPrice: '' })
        fetchData()
      } else {
        alert('Failed to create quote')
      }
    } catch (error) {
      console.error('Quote creation error:', error)
      alert('An error occurred')
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--champagne-50)] to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--navy-900)] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[var(--navy-600)]">
            Welcome back, {session?.user?.name}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--navy-600)] mb-1">Total Clients</p>
                  <p className="text-3xl font-bold text-[var(--navy-900)]">
                    {stats.totalClients}
                  </p>
                </div>
                <FiUsers className="w-10 h-10 text-[var(--gold-500)]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--navy-600)] mb-1">Pending Appointments</p>
                  <p className="text-3xl font-bold text-[var(--navy-900)]">
                    {stats.pendingAppointments}
                  </p>
                </div>
                <FiCalendar className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--navy-600)] mb-1">Pending Quotes</p>
                  <p className="text-3xl font-bold text-[var(--navy-900)]">
                    {stats.pendingQuotes}
                  </p>
                </div>
                <FiDollarSign className="w-10 h-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--navy-600)] mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-[var(--navy-900)]">
                    {formatPrice(stats.monthlyRevenue)}
                  </p>
                </div>
                <FiCheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-center text-[var(--navy-600)] py-8">
                  No appointments yet
                </p>
              ) : (
                appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border border-[var(--champagne-300)] rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-[var(--navy-900)] mb-1">
                          {apt.client.name}
                        </h3>
                        <p className="text-sm text-[var(--navy-600)]">{apt.client.email}</p>
                        <p className="text-sm text-[var(--navy-600)]">{apt.client.phone}</p>
                      </div>
                      <Badge variant={apt.status === 'PENDING' ? 'secondary' : 'default'}>
                        {apt.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-[var(--navy-600)] mb-1">Date & Time</p>
                        <p className="text-sm font-medium">
                          {formatDate(apt.preferredDate)} at {apt.preferredTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--navy-600)] mb-1">Address</p>
                        <p className="text-sm font-medium">{apt.client.address}</p>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="mb-4">
                        <p className="text-xs text-[var(--navy-600)] mb-1">Notes</p>
                        <p className="text-sm">{apt.notes}</p>
                      </div>
                    )}

                    {!apt.quote && selectedAppointment?.id !== apt.id && (
                      <Button
                        onClick={() => setSelectedAppointment(apt)}
                        variant="premium"
                        size="sm"
                      >
                        Create Quote
                      </Button>
                    )}

                    {selectedAppointment?.id === apt.id && (
                      <div className="mt-4 p-4 bg-[var(--champagne-50)] rounded-lg">
                        <h4 className="font-semibold mb-4">Create Custom Quote</h4>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              One-Time Price
                            </label>
                            <input
                              type="number"
                              value={quoteForm.oneTimePrice}
                              onChange={(e) =>
                                setQuoteForm({ ...quoteForm, oneTimePrice: e.target.value })
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="150"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Monthly Price
                            </label>
                            <input
                              type="number"
                              value={quoteForm.monthlyPrice}
                              onChange={(e) =>
                                setQuoteForm({ ...quoteForm, monthlyPrice: e.target.value })
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="135"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Twice-Monthly Price
                            </label>
                            <input
                              type="number"
                              value={quoteForm.twiceMonthlyPrice}
                              onChange={(e) =>
                                setQuoteForm({
                                  ...quoteForm,
                                  twiceMonthlyPrice: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="127"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleCreateQuote(apt.id)}
                            variant="premium"
                          >
                            Send Quote to Client
                          </Button>
                          <Button
                            onClick={() => setSelectedAppointment(null)}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {apt.quote && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 font-medium mb-2">
                          Quote Sent - Status: {apt.quote.status}
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-green-700">One-Time:</span>{' '}
                            {formatPrice(apt.quote.oneTimePrice)}
                          </div>
                          <div>
                            <span className="text-green-700">Monthly:</span>{' '}
                            {formatPrice(apt.quote.monthlyPrice)}
                          </div>
                          <div>
                            <span className="text-green-700">Twice-Monthly:</span>{' '}
                            {formatPrice(apt.quote.twiceMonthlyPrice)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
