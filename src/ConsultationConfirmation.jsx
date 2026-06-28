import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ConsultationConfirmation.css'

export default function ConsultationConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state?.formData

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Redirect if no form data
  useEffect(() => {
    if (!formData) {
      navigate('/')
    }
  }, [formData, navigate])

  if (!formData) return null

  return (
    <div className="consultation-confirmation">
      {/* Header */}
      <div className="confirmation-header">
        <div className="confirmation-logo">
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="confirmation-container">
        <div className="confirmation-content">
          {/* Success Icon */}
          <div className="confirmation-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Thank You Message */}
          <div className="confirmation-message">
            <h1>Thank You, {formData.name}!</h1>
            <p className="confirmation-subtitle">
              Your consultation request has been received successfully.
            </p>
          </div>

          {/* Details Card */}
          <div className="confirmation-details-card">
            <h3>What Happens Next?</h3>
            <div className="confirmation-preferences">
              <div className="preference-item">
                <span className="preference-label">Language:</span>
                <span className="preference-value">{formData.language}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Timezone:</span>
                <span className="preference-value">{formData.timezone.replace(/_/g, ' ')}</span>
              </div>
            </div>
            <div className="confirmation-steps">
              <div className="confirmation-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Review Your Availability</h4>
                  <p>Our investment advisory team will review the {formData.selectedSlots.length} time slot{formData.selectedSlots.length !== 1 ? 's' : ''} you've selected.</p>
                </div>
              </div>
              <div className="confirmation-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Confirmation Call</h4>
                  <p>We'll contact you within 24 hours at {formData.email || formData.phone} to confirm your consultation time. Your consultation will be conducted in {formData.language}.</p>
                </div>
              </div>
              <div className="confirmation-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Expert Consultation</h4>
                  <p>Discuss your international real estate investment goals with our dedicated advisors who specialize in cross-border transactions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What We'll Discuss */}
          <div className="confirmation-topics-card">
            <h3>During Your Consultation</h3>
            <div className="topics-grid">
              <div className="topic-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <h5>Market Selection</h5>
                  <p>Identify the best markets aligned with your investment strategy across UK, Portugal, Dubai, and Singapore.</p>
                </div>
              </div>
              <div className="topic-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="M18 17V9"/>
                  <path d="M13 17V5"/>
                  <path d="M8 17v-3"/>
                </svg>
                <div>
                  <h5>Investment Strategy</h5>
                  <p>Develop a tailored approach based on your financial objectives, risk tolerance, and timeline.</p>
                </div>
              </div>
              <div className="topic-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <div>
                  <h5>Due Diligence Process</h5>
                  <p>Understand our comprehensive property vetting and legal verification procedures.</p>
                </div>
              </div>
              <div className="topic-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                </svg>
                <div>
                  <h5>Tax & Legal Structures</h5>
                  <p>Optimize your investment through proper entity structuring and tax-efficient planning.</p>
                </div>
              </div>
              <div className="topic-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <div>
                  <h5>Ongoing Management</h5>
                  <p>Explore property management solutions and strategies to maximize rental yields.</p>
                </div>
              </div>
              <div className="topic-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <div>
                  <h5>Timeline & Next Steps</h5>
                  <p>Map out the acquisition process timeline and immediate action items for your investment journey.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="confirmation-actions">
            <button
              className="confirmation-btn-primary"
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
            <button
              className="confirmation-btn-secondary"
              onClick={() => navigate('/locations')}
            >
              Explore Markets
            </button>
          </div>

          {/* Footer Note */}
          <p className="confirmation-footer-note">
            If you have any immediate questions, please contact us at{' '}
            <a href="mailto:invest@g6intelligence.com">invest@g6intelligence.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
