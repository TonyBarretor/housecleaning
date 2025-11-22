'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths, isBefore, startOfToday } from 'date-fns'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Button } from '@/components/ui/button'

interface BookingCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = startOfToday()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get the day of week for the first day (0 = Sunday)
  const startDayOfWeek = monthStart.getDay()

  // Fill in empty days before the start of the month
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i)

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => {
    const newMonth = subMonths(currentMonth, 1)
    // Don't allow going to months before current month
    if (!isBefore(endOfMonth(newMonth), today)) {
      setCurrentMonth(newMonth)
    }
  }

  const isPastDate = (date: Date) => {
    return isBefore(date, today) && !isSameDay(date, today)
  }

  return (
    <div className="bg-white rounded-xl border-2 border-[var(--champagne-300)] p-6">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--navy-900)]">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            className="h-8 w-8"
            disabled={isBefore(endOfMonth(subMonths(currentMonth, 1)), today)}
          >
            <FiChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="h-8 w-8"
          >
            <FiChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-[var(--navy-600)] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells before month start */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days */}
        {daysInMonth.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isCurrentDay = isToday(day)
          const isPast = isPastDate(day)
          const isAvailable = !isPast

          return (
            <motion.button
              key={day.toString()}
              type="button"
              onClick={() => isAvailable && onSelectDate(day)}
              disabled={isPast}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.01 }}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[var(--champagne-100)]'}
                ${isSelected ? 'bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] text-white shadow-lg scale-105' : ''}
                ${isCurrentDay && !isSelected ? 'border-2 border-[var(--gold-500)]' : ''}
                ${!isSelected && !isPast ? 'text-[var(--navy-900)]' : ''}
              `}
            >
              {format(day, 'd')}
            </motion.button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-[var(--champagne-300)] flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--gold-500)] rounded"></div>
          <span className="text-[var(--navy-600)]">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] rounded"></div>
          <span className="text-[var(--navy-600)]">Selected</span>
        </div>
      </div>
    </div>
  )
}
