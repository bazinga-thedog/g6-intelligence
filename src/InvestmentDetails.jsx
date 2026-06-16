import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import ConversionModal from './ConversionModal'
import './InvestmentDetails.css'

export default function InvestmentDetails() {
  const { cityName, neighborhoodName } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const neighborhood = location.state?.neighborhood
  const city = location.state?.city

  const [activePhase, setActivePhase] = useState(null)
  const [activeSubStep, setActiveSubStep] = useState(null)
  const [closingSubStep, setClosingSubStep] = useState(null)
  const [showConversionModal, setShowConversionModal] = useState(false)
  const [modalContext, setModalContext] = useState(null)

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Investment lifecycle roadmap data
  const roadmapData = {
    acquisition: {
      title: 'Acquisition',
      icon: 'search',
      description: 'Find, validate, and purchase your investment property',
      color: '#10b981',
      subSteps: [
        {
          id: 'sourcing',
          title: 'Sourcing',
          description: 'Identify and evaluate potential properties',
          activities: [
            {
              title: 'Property Search',
              description: 'Browse available properties using trusted online real estate portals, work with renowned local real estate agents, or explore off-market opportunities through direct outreach. Define your criteria upfront: neighborhood, property type (apartment, villa), size, budget range, and desired rental yield. You can do this independently using listing websites, but working with verified local agents familiar with the neighborhood can provide access to properties before they are publicly listed and offer insights on pricing trends. Consider viewing 5-10 properties to understand the market before making decisions.',
              cta: {
                text: 'Help me find verified brokers',
                type: 'lead_gen',
                service: 'broker_connection'
              }
            }
          ]
        },
        {
          id: 'validate',
          title: 'Validation',
          description: 'Conduct thorough due diligence',
          activities: [
            { title: 'Technical Due Diligence', description: 'Inspect structure, systems, compliance, defects', duration: '1-2 weeks' },
            { title: 'Legal Due Diligence', description: 'Verify ownership, liens, permits, zoning', duration: '1-2 weeks' },
            { title: 'Financial Analysis', description: 'Calculate ROI, cash flow, taxes, costs', duration: '3-5 days' },
            { title: 'Comparative Market Analysis', description: 'Validate price against comparable properties', duration: '2-3 days' }
          ]
        },
        {
          id: 'contract',
          title: 'Contract',
          description: 'Negotiate and formalize the purchase',
          activities: [
            { title: 'Offer & Negotiation', description: 'Submit offer, negotiate price and terms', duration: '1-2 weeks' },
            { title: 'CPCV (Promissory Contract)', description: 'Sign preliminary purchase agreement, pay deposit', duration: '1 week' },
            { title: 'Mortgage Finalization', description: 'Complete loan application and approval', duration: '2-4 weeks' },
            { title: 'Final Contract Review', description: 'Legal review of final deed (escritura)', duration: '1 week' }
          ]
        },
        {
          id: 'close',
          title: 'Close',
          description: 'Complete the purchase transaction',
          activities: [
            { title: 'Pay Transfer Tax (IMT)', description: 'Calculate and pay property transfer tax', duration: '1-2 days' },
            { title: 'Pay Stamp Duty', description: 'Pay 0.8% stamp duty on purchase price', duration: '1 day' },
            { title: 'Sign Deed (Escritura)', description: 'Sign final deed at notary, transfer ownership', duration: '1 day' },
            { title: 'Register Property', description: 'Register new ownership with land registry', duration: '1-2 weeks' },
            { title: 'Set Up Utilities', description: 'Transfer or activate water, electricity, gas, internet', duration: '1 week' }
          ]
        }
      ]
    },
    hold: {
      title: 'Hold',
      icon: 'home',
      description: 'Manage, maintain, and optimize your investment',
      color: '#3b82f6',
      subSteps: [
        {
          id: 'setup',
          title: 'Setup',
          description: 'Prepare property for rental or use',
          activities: [
            { title: 'Property Refurbishment', description: 'Renovations, painting, repairs if needed', duration: '2-8 weeks' },
            { title: 'Furnishing (if applicable)', description: 'Purchase and install furniture for rental', duration: '1-2 weeks' },
            { title: 'Insurance Setup', description: 'Secure property and liability insurance', duration: '1 week' },
            { title: 'HOA Registration', description: 'Register with condo association if applicable', duration: '1 week' },
            { title: 'Tax Registration', description: 'Register for rental income tax purposes', duration: '1 week' }
          ]
        },
        {
          id: 'rent',
          title: 'Rent',
          description: 'Find tenants and generate income',
          activities: [
            { title: 'Marketing Property', description: 'List on portals, create listing, take photos', duration: '1 week' },
            { title: 'Tenant Screening', description: 'Vet applicants, check references, income', duration: '1-3 weeks' },
            { title: 'Lease Agreement', description: 'Draft and sign rental contract', duration: '1 week' },
            { title: 'Deposit Collection', description: 'Collect security deposit (typically 2-3 months)', duration: '1 day' },
            { title: 'Handover & Inventory', description: 'Document property condition, handover keys', duration: '1 day' }
          ]
        },
        {
          id: 'maintain',
          title: 'Maintain',
          description: 'Ongoing property upkeep and management',
          activities: [
            { title: 'Regular Maintenance', description: 'HVAC servicing, cleaning, repairs', duration: 'Ongoing' },
            { title: 'Tenant Relations', description: 'Handle requests, renewals, issues', duration: 'Ongoing' },
            { title: 'HOA Fees', description: 'Pay monthly/quarterly condo fees', duration: 'Monthly' },
            { title: 'Property Tax (IMI)', description: 'Annual property tax payment', duration: 'Annually' },
            { title: 'Income Tax Returns', description: 'Report rental income, file taxes', duration: 'Annually' },
            { title: 'Insurance Renewal', description: 'Review and renew insurance annually', duration: 'Annually' }
          ]
        },
        {
          id: 'optimize',
          title: 'Optimize',
          description: 'Maximize returns and property value',
          activities: [
            { title: 'Rent Review', description: 'Adjust rent to market rates annually', duration: 'Annually' },
            { title: 'Value-Add Improvements', description: 'Strategic upgrades to increase value', duration: 'As needed' },
            { title: 'Expense Optimization', description: 'Review and reduce operating costs', duration: 'Quarterly' },
            { title: 'Portfolio Rebalancing', description: 'Assess if property still fits strategy', duration: 'Annually' }
          ]
        }
      ]
    },
    sell: {
      title: 'Sell',
      icon: 'trending-up',
      description: 'Exit your investment and realize gains',
      color: '#f59e0b',
      subSteps: [
        {
          id: 'prepare',
          title: 'Prepare',
          description: 'Get property ready for market',
          activities: [
            { title: 'Market Timing Analysis', description: 'Assess market conditions for optimal exit', duration: '1-2 weeks' },
            { title: 'Property Staging', description: 'Declutter, depersonalize, minor repairs', duration: '2-4 weeks' },
            { title: 'Valuation', description: 'Get professional appraisal', duration: '1 week' },
            { title: 'Seller Documentation', description: 'Gather title, tax certificates, permits', duration: '1-2 weeks' },
            { title: 'Agent Selection', description: 'Interview and hire real estate agent', duration: '1-2 weeks' }
          ]
        },
        {
          id: 'market',
          title: 'Market',
          description: 'List and promote the property',
          activities: [
            { title: 'Professional Photography', description: 'High-quality photos and virtual tour', duration: '3-5 days' },
            { title: 'Listing Creation', description: 'Write compelling description, set price', duration: '1 week' },
            { title: 'Multi-Channel Marketing', description: 'List on portals, social media, network', duration: '1 week' },
            { title: 'Open Houses & Viewings', description: 'Schedule and conduct property showings', duration: '4-8 weeks' },
            { title: 'Feedback & Adjustments', description: 'Adjust strategy based on market response', duration: 'Ongoing' }
          ]
        },
        {
          id: 'negotiate',
          title: 'Negotiate',
          description: 'Accept offers and finalize terms',
          activities: [
            { title: 'Offer Evaluation', description: 'Review offers, verify buyer qualification', duration: '1-2 weeks' },
            { title: 'Price Negotiation', description: 'Counter-offer, agree on final price', duration: '1-2 weeks' },
            { title: 'Terms Negotiation', description: 'Closing date, contingencies, repairs', duration: '1 week' },
            { title: 'Accept Offer', description: 'Sign promissory contract, receive deposit', duration: '1 week' }
          ]
        },
        {
          id: 'close-sale',
          title: 'Close Sale',
          description: 'Complete the transaction',
          activities: [
            { title: 'Final Property Inspection', description: 'Buyer conducts final walkthrough', duration: '1 day' },
            { title: 'Clear Liens & Charges', description: 'Pay off mortgage, settle HOA fees', duration: '1 week' },
            { title: 'Capital Gains Tax Calc', description: 'Calculate tax liability (28% on gains)', duration: '1 week' },
            { title: 'Sign Deed (Escritura)', description: 'Transfer ownership at notary', duration: '1 day' },
            { title: 'Receive Payment', description: 'Get sale proceeds minus taxes/fees', duration: '1 day' },
            { title: 'Deregister Property', description: 'Cancel insurance, utilities, tax registration', duration: '1-2 weeks' }
          ]
        }
      ]
    }
  }

  const handlePhaseClick = (phase) => {
    if (activePhase === phase) {
      setActivePhase(null)
      setActiveSubStep(null)
    } else {
      setActivePhase(phase)
      setActiveSubStep(null)
    }
  }

  const handleSubStepClick = (subStepId) => {
    if (activeSubStep === subStepId) {
      setClosingSubStep(subStepId)
      setTimeout(() => {
        setActiveSubStep(null)
        setClosingSubStep(null)
      }, 400)
    } else {
      setClosingSubStep(null)
      setActiveSubStep(subStepId)
    }
  }

  const getIcon = (iconName) => {
    const icons = {
      search: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      home: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      'trending-up': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      )
    }
    return icons[iconName]
  }

  return (
    <div className="investment-details">
      {/* Navigation Header */}
      <div className="detail-nav">
        <button className="detail-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to {neighborhoodName}
        </button>
        <div className="detail-logo">
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* Neighborhood Overview */}
      {neighborhood && (
        <div className="neighborhood-overview">
          <div className="overview-image">
            <img src={neighborhood.image} alt={neighborhoodName} />
            <div className="overview-image-overlay">
              <h3 className="overview-location">{neighborhoodName}</h3>
              <p className="overview-city">{cityName}</p>
            </div>
          </div>
          <div className="overview-metrics">
            <div className="overview-metric">
              <div className="overview-metric-label">Price per m²</div>
              <div className="overview-metric-value">
                €{neighborhood.metrics.pricePerSqm.EUR.min.toLocaleString()} - €{neighborhood.metrics.pricePerSqm.EUR.max.toLocaleString()}
              </div>
            </div>
            <div className="overview-metric">
              <div className="overview-metric-label">Rental Yield</div>
              <div className="overview-metric-value highlight">
                {neighborhood.metrics.rentalYield.min}% - {neighborhood.metrics.rentalYield.max}%
              </div>
            </div>
            <div className="overview-metric">
              <div className="overview-metric-label">Avg Holding Time</div>
              <div className="overview-metric-value">
                {neighborhood.metrics.avgHoldingTime} years
              </div>
            </div>
            <div className="overview-metric">
              <div className="overview-metric-label">Days to Rent</div>
              <div className="overview-metric-value">
                {neighborhood.metrics.daysToRent.avg} days
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="investment-hero">
        <div className="investment-hero-content">
          <h1 className="investment-title">Investment Roadmap</h1>
          <p className="investment-description">
            Your complete guide to acquiring, holding, and selling property abroad.
            Click each phase to explore the detailed steps and activities required for successful real estate investment.
          </p>
        </div>
      </div>

      {/* Main Roadmap - Horizontal Timeline */}
      <div className="roadmap-container">
        {/* Horizontal Phase Timeline */}
        <div className="horizontal-timeline">
          {Object.entries(roadmapData).map(([key, phase], index) => (
            <div key={key} className="timeline-phase-wrapper">
              <div
                className={`timeline-phase ${activePhase === key ? 'active' : ''}`}
                onClick={() => handlePhaseClick(key)}
                style={{ '--phase-color': phase.color }}
              >
                <div className="timeline-phase-icon">{getIcon(phase.icon)}</div>
                <h3 className="timeline-phase-title">{phase.title}</h3>
                <p className="timeline-phase-description">{phase.description}</p>
                <div className="timeline-phase-badge">
                  {phase.subSteps.length} steps
                </div>
              </div>

              {/* Connector Arrow */}
              {index < Object.keys(roadmapData).length - 1 && (
                <div className="timeline-arrow">
                  <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                    <path d="M0 12h55M48 5l7 7-7 7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expanded Phase Roadmap - Vertical */}
        {activePhase && (
          <div className="phase-roadmap-expanded">
            {/* Vertical Sub-steps Accordion */}
            <div className="substeps-vertical">
              {roadmapData[activePhase].subSteps.map((subStep, subIndex) => (
                <div key={subStep.id} className="substep-accordion-wrapper">
                  {/* Sub-step Accordion Header */}
                  <div
                    className={`substep-accordion-header ${activeSubStep === subStep.id ? 'active' : ''}`}
                    onClick={() => handleSubStepClick(subStep.id)}
                    style={{ '--phase-color': roadmapData[activePhase].color }}
                  >
                    <div className="substep-accordion-number">{subIndex + 1}</div>
                    <div className="substep-accordion-content">
                      <h4 className="substep-accordion-title">{subStep.title}</h4>
                      <p className="substep-accordion-description">{subStep.description}</p>
                    </div>
                    <div className="substep-accordion-badge">
                      {subStep.activities.length} activities
                    </div>
                    <div className="substep-accordion-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Activities - Expanded when active */}
                  {(activeSubStep === subStep.id || closingSubStep === subStep.id) && (
                    <div className={`activities-accordion-content ${closingSubStep === subStep.id ? 'closing' : ''}`}>
                      {/* Example: First 2 activities in parallel (first sub-step only) */}
                      {subIndex === 0 && subStep.activities.length >= 2 && (
                        <div className="activities-parallel-row">
                          <div className="activity-accordion-item parallel">
                            <div className="activity-accordion-bullet"></div>
                            <div className="activity-accordion-details">
                              <h5 className="activity-accordion-title">{subStep.activities[0].title}</h5>
                              <p className="activity-accordion-description">{subStep.activities[0].description}</p>
                              {subStep.activities[0].duration && (
                                <span className="activity-accordion-duration">{subStep.activities[0].duration}</span>
                              )}
                              {subStep.activities[0].cta && (
                                <button
                                  className="activity-cta-button"
                                  onClick={() => {
                                    setModalContext(subStep.activities[0].cta)
                                    setShowConversionModal(true)
                                  }}
                                >
                                  {subStep.activities[0].cta.text}
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="activity-accordion-item parallel">
                            <div className="activity-accordion-bullet"></div>
                            <div className="activity-accordion-details">
                              <h5 className="activity-accordion-title">{subStep.activities[1].title}</h5>
                              <p className="activity-accordion-description">{subStep.activities[1].description}</p>
                              {subStep.activities[1].duration && (
                                <span className="activity-accordion-duration">{subStep.activities[1].duration}</span>
                              )}
                              {subStep.activities[1].cta && (
                                <button
                                  className="activity-cta-button"
                                  onClick={() => {
                                    setModalContext(subStep.activities[1].cta)
                                    setShowConversionModal(true)
                                  }}
                                >
                                  {subStep.activities[1].cta.text}
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Remaining activities (sequential) */}
                      {subStep.activities.map((activity, actIndex) => {
                        // Skip first 2 activities in first sub-step if they were shown in parallel row
                        if (subIndex === 0 && subStep.activities.length >= 2 && actIndex < 2) return null

                        return (
                          <div key={actIndex} className="activity-accordion-item">
                            <div className="activity-accordion-bullet"></div>
                            <div className="activity-accordion-details">
                              <h5 className="activity-accordion-title">{activity.title}</h5>
                              <p className="activity-accordion-description">{activity.description}</p>
                              {activity.duration && (
                                <span className="activity-accordion-duration">{activity.duration}</span>
                              )}
                              {activity.cta && (
                                <button
                                  className="activity-cta-button"
                                  onClick={() => {
                                    setModalContext(activity.cta)
                                    setShowConversionModal(true)
                                  }}
                                >
                                  {activity.cta.text}
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Vertical Connector Line */}
                  {subIndex < roadmapData[activePhase].subSteps.length - 1 && (
                    <div className="substep-vertical-connector" style={{ '--phase-color': roadmapData[activePhase].color }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary CTA */}
      <div className="roadmap-footer">
        <div className="footer-content">
          <h3>Questions about the investment process?</h3>
          <p>Our team can guide you through each step and help you navigate the complexities of investing abroad.</p>
        </div>
        <button className="footer-cta">
          Schedule a Consultation
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

      {/* Conversion Modal */}
      <ConversionModal
        isOpen={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        context={modalContext}
      />
    </div>
  )
}
