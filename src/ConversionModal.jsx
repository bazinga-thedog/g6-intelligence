import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ConversionModal.css'

export default function ConversionModal({ isOpen, onClose, context }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleMonthlySubmit = () => {
    // TODO: Handle monthly membership signup
    console.log('Monthly membership signup')
  }

  const handleFullServiceSubmit = () => {
    // Navigate to scheduling page
    onClose()
    navigate('/schedule-consultation')
  }

  return (
    <div className="conversion-modal-overlay" onClick={onClose}>
      <div className="conversion-modal" onClick={(e) => e.stopPropagation()}>
        <button className="conversion-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="conversion-modal-content">
          {/* Left Column - Monthly Membership */}
          <div className="conversion-column">
            <div className="conversion-badge">Monthly Membership</div>
            <h3 className="conversion-title">Access to 3 Verified Networks</h3>
            <div className="conversion-price">€99<span>/month</span></div>
            <p className="conversion-description">
              Get instant access to verified broker contacts and 2 additional professional networks of your choice.
              Additional networks available at €99 each.
            </p>

            <div className="conversion-benefits">
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Verified broker network access</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Choose 2 additional networks</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Direct contact information</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Monthly market updates</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>

            <button
              className="conversion-cta conversion-cta-outlined"
              onClick={handleMonthlySubmit}
            >
              Start Membership
            </button>
          </div>

          {/* Right Column - Full Service */}
          <div className="conversion-column conversion-column-recommended">
            <h3 className="conversion-title">Complete Investment Support</h3>
            <p className="conversion-description">
              Full hands-on guidance through your entire investment journey with dedicated advisor support.
            </p>

            {/* Three-column service breakdown */}
            <div className="service-columns">
              <div className="service-column">
                <h4 className="service-column-title">Buy</h4>
                <p className="service-column-description">€1,180/year refundable if you buy</p>
                <p className="service-column-description">1% commission on successful acquisition</p>
              </div>
              <div className="service-column">
                <h4 className="service-column-title">Hold</h4>
                <p className="service-column-description">10% annual rent + costs of fixing</p>
              </div>
              <div className="service-column">
                <h4 className="service-column-title">Sell</h4>
                <p className="service-column-description">1% commission on successful sale</p>
              </div>
            </div>

            <div className="conversion-benefits">
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Dedicated investment advisor</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Step-by-step acquisition guidance</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Document preparation & review</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Negotiation support</span>
              </div>
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Extensive Monthly Report Updates</span>
              </div>
            </div>

            <button
              className="conversion-cta conversion-cta-filled"
              onClick={handleFullServiceSubmit}
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
