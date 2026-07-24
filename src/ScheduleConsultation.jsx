import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ScheduleConsultation.css'

export default function ScheduleConsultation() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'English',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    selectedSlots: [] // Array of {date, time} objects
  })
  const [expandedDates, setExpandedDates] = useState([])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const languages = [
    'English',
    'Portuguese',
    'Arabic',
    'Mandarin'
  ]

  // Generate common timezones
  const getTimezoneOptions = () => {
    return [
      'Europe/Lisbon',
      'Europe/London',
      'Asia/Dubai',
      'Asia/Singapore',
      'America/New_York',
      'America/Los_Angeles',
      'America/Chicago',
      'Europe/Paris',
      'Europe/Berlin',
      'Asia/Hong_Kong',
      'Asia/Tokyo',
      'Australia/Sydney'
    ]
  }

  // Generate next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      full: date.toISOString().split('T')[0]
    }
  }

  const handleSlotToggle = (date, time) => {
    const slotKey = `${date}-${time}`
    const existingSlotIndex = formData.selectedSlots.findIndex(
      slot => `${slot.date}-${slot.time}` === slotKey
    )

    let newSlots
    if (existingSlotIndex >= 0) {
      // Remove the slot
      newSlots = formData.selectedSlots.filter((_, index) => index !== existingSlotIndex)
    } else {
      // Add the slot
      newSlots = [...formData.selectedSlots, { date, time }]
    }

    setFormData({ ...formData, selectedSlots: newSlots })
  }

  const isSlotSelected = (date, time) => {
    return formData.selectedSlots.some(
      slot => slot.date === date && slot.time === time
    )
  }

  const getSelectedDates = () => {
    return [...new Set(formData.selectedSlots.map(slot => slot.date))]
  }

  const toggleDateExpansion = (date) => {
    if (expandedDates.includes(date)) {
      setExpandedDates(expandedDates.filter(d => d !== date))
    } else {
      setExpandedDates([...expandedDates, date])
    }
  }

  const getSelectedTimesForDate = (date) => {
    return formData.selectedSlots.filter(slot => slot.date === date).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Determine API URL based on environment
      const apiUrl = import.meta.env.DEV
        ? 'http://localhost:3001/api/send-appointment-email'
        : '/api/send-appointment-email'

      // Send appointment data to the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Failed to send appointment email:', result)
        // Still navigate to confirmation even if email fails
      } else {
        console.log('Appointment email sent successfully:', result)
      }
    } catch (error) {
      console.error('Error sending appointment email:', error)
      // Still navigate to confirmation even if email fails
    }

    // Navigate to confirmation page with form data
    navigate('/consultation-confirmation', { state: { formData } })
  }

  const isFormValid = () => {
    return formData.name && (formData.email || formData.phone) && formData.selectedSlots.length > 0
  }

  return (
    <div className="schedule-consultation">
      {/* Header */}
      <div className="schedule-header">
        <button className="schedule-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <div className="schedule-logo">
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="schedule-container">
        <div className="schedule-content">
          <div className="schedule-intro">
            <h1>Schedule Your Consultation</h1>
            <p>Let's discuss how we can support your international real estate investment journey. Please select your preferred availability windows, and our team will confirm the most suitable time.</p>
          </div>

          <form onSubmit={handleSubmit} className="schedule-form">
            {/* Contact Information */}
            <div className="form-section">
              <h3>Your Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alexander Hamilton"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander.hamilton@company.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7123 4567"
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="language">Preferred Language</label>
                  <select
                    id="language"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timezone">Your Timezone</label>
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    {getTimezoneOptions().map((tz) => (
                      <option key={tz} value={tz}>
                        {tz.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="form-note">* Please provide either email or phone number</p>
            </div>

            {/* Date & Time Selection */}
            <div className="form-section">
              <h3>Select Your Availability</h3>
              <p className="form-instruction">Please select multiple date and time combinations when you're available. We'll reach out to confirm the final appointment.</p>
              <div className="availability-grid">
                {generateDates().map((date, dateIndex) => {
                  const formatted = formatDate(date)
                  const selectedCount = getSelectedTimesForDate(formatted.full)
                  const isExpanded = expandedDates.includes(formatted.full)

                  return (
                    <div key={dateIndex} className="date-section">
                      <div
                        className={`date-header ${selectedCount > 0 ? 'has-selection' : ''}`}
                        onClick={() => toggleDateExpansion(formatted.full)}
                      >
                        <div className="date-header-info">
                          <span className="date-header-day">{formatted.day}</span>
                          <span className="date-header-number">{formatted.date}</span>
                          <span className="date-header-month">{formatted.month}</span>
                        </div>
                        {selectedCount > 0 && (
                          <span className="date-selection-badge">{selectedCount} selected</span>
                        )}
                        <svg
                          className={`date-expand-icon ${isExpanded ? 'expanded' : ''}`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                      {isExpanded && (
                        <div className="time-slots-grid">
                          {timeSlots.map((time, timeIndex) => {
                            const isSelected = isSlotSelected(formatted.full, time)
                            return (
                              <button
                                key={timeIndex}
                                type="button"
                                className={`time-slot-compact ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSlotToggle(formatted.full, time)}
                              >
                                {time}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selected Slots Summary */}
            {formData.selectedSlots.length > 0 && (
              <div className="form-section">
                <h3>Your Selected Availability ({formData.selectedSlots.length} slot{formData.selectedSlots.length !== 1 ? 's' : ''})</h3>
                <div className="selected-slots-summary">
                  {formData.selectedSlots.map((slot, index) => (
                    <div key={index} className="selected-slot-tag">
                      {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {slot.time}
                      <button
                        type="button"
                        className="remove-slot-btn"
                        onClick={() => handleSlotToggle(slot.date, slot.time)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="schedule-submit-btn"
              disabled={!isFormValid()}
            >
              Confirm Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
