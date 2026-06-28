import { useState } from 'react'
import './ConversionModal.css'

export default function ConversionModal({ isOpen, onClose, context }) {
  const [monthlyForm, setMonthlyForm] = useState({
    name: '',
    email: '',
    paymentInfo: ''
  })
  const [fullServiceEmail, setFullServiceEmail] = useState('')

  if (!isOpen) return null

  const handleMonthlySubmit = (e) => {
    e.preventDefault()
    // TODO: Handle monthly membership signup
    console.log('Monthly membership:', monthlyForm)
  }

  const handleFullServiceSubmit = (e) => {
    e.preventDefault()
    // TODO: Handle full service request
    console.log('Full service request:', fullServiceEmail)
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
            <div className="conversion-price">€99<span>/month</span></div>
            <h3 className="conversion-title">Access to 3 Verified Networks</h3>
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

            <form className="conversion-form" onSubmit={handleMonthlySubmit}>
              <div className="form-group">
                <label htmlFor="monthly-name">Full Name</label>
                <input
                  type="text"
                  id="monthly-name"
                  value={monthlyForm.name}
                  onChange={(e) => setMonthlyForm({...monthlyForm, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthly-email">Email Address</label>
                <input
                  type="email"
                  id="monthly-email"
                  value={monthlyForm.email}
                  onChange={(e) => setMonthlyForm({...monthlyForm, email: e.target.value})}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthly-payment">Payment Information</label>
                <input
                  type="text"
                  id="monthly-payment"
                  value={monthlyForm.paymentInfo}
                  onChange={(e) => setMonthlyForm({...monthlyForm, paymentInfo: e.target.value})}
                  placeholder="Card number"
                  required
                />
              </div>
              <button type="submit" className="conversion-cta conversion-cta-outlined">
                Start Membership
              </button>
            </form>
          </div>

          {/* Right Column - Full Service */}
          <div className="conversion-column conversion-column-recommended">
            <div className="conversion-badge conversion-badge-recommended">Recommended</div>
            <div className="conversion-price">€1,180<span>/year</span></div>
            <h3 className="conversion-title">Complete Investment Support</h3>
            <p className="conversion-description">
              Full hands-on guidance through your entire investment journey with dedicated advisor support.
            </p>
            <div className="conversion-pricing-note">
              <p>Annual fee of €1,180 includes complete investment support throughout the acquisition or sale process.</p>
              <p className="conversion-pricing-highlight">Upon successful close, we charge an additional 1% commission on the transaction value.</p>
            </div>

            <div className="conversion-benefits">
              <div className="conversion-benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Everything in Monthly plan</span>
              </div>
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
                <span>1% commission on successful close</span>
              </div>
            </div>

            <form className="conversion-form" onSubmit={handleFullServiceSubmit}>
              <div className="form-group">
                <label htmlFor="fullservice-email">Email Address</label>
                <input
                  type="email"
                  id="fullservice-email"
                  value={fullServiceEmail}
                  onChange={(e) => setFullServiceEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button type="submit" className="conversion-cta conversion-cta-filled">
                Request Access
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
