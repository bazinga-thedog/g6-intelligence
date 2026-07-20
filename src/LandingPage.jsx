import { useState } from 'react'
import Survey from './Survey'
import { generateFreshGuid } from './prospectGuid'
import './LandingPage.css'

export default function LandingPage({ onSurveyComplete }) {
  const [selectedResponse, setSelectedResponse] = useState(null)
  const [showSurvey, setShowSurvey] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  const handleResponse = (response) => {
    setSelectedResponse(response)
    if (response === 'yes') {
      // Generate a fresh GUID every time "Yes" is clicked
      generateFreshGuid()
      setShowSurvey(true)
    } else {
      console.log('User selected:', response)
    }
  }

  const handleSurveyCompleteInternal = (answers) => {
    console.log('Survey completed:', answers)
    setShowSurvey(false)
    // Navigate to location showcase page
    if (onSurveyComplete) {
      onSurveyComplete()
    }
  }

  const handleSurveyClose = () => {
    setShowSurvey(false)
    setSelectedResponse(null)
  }

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="nav-header">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>G6<span>Intelligence</span></h1>
          </div>
          <div className="nav-actions">
            <button className="login-btn">Login</button>
            <button className="contact-btn">📞 Contact Us</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <div className="hero-badge">
              Global Intelligence • Residential Real Estate
            </div>
            <h1 className="hero-title">
              Looking to diversify your<br/>
              residential real estate portfolio <span className="highlight-italic">internationally</span>?
            </h1>
            <div className="hero-cta-buttons">
              <button
                className={`hero-btn-primary ${selectedResponse === 'yes' ? 'selected' : ''}`}
                onClick={() => handleResponse('yes')}
              >
                Yes
              </button>
              <button
                className={`hero-btn-secondary ${selectedResponse === 'maybe' ? 'selected' : ''}`}
                onClick={() => handleResponse('maybe')}
              >
                Maybe
              </button>
            </div>
          </div>

          <div className="preview-card">
            <button className="preview-btn" onClick={() => setShowVideoModal(true)}>
              <span className="play-icon">▶</span>
              <div className="preview-text">
                <strong>See Preview</strong>
                <span>G6 Intelligence have a full guide for profit and others, See it...</span>
              </div>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="feature-cards-bottom">
          <div className="feature-card-dark">
            <div className="feature-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18"/>
                <path d="M18 17V9"/>
                <path d="M13 17V5"/>
                <path d="M8 17v-3"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Real-Time Intelligence</h3>
              <p>Data generated on demand, instantly</p>
            </div>
          </div>
          <div className="feature-card-dark">
            <div className="feature-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>One-Stop Shop</h3>
              <p>No time for DIY? We handle it all</p>
            </div>
          </div>
          <div className="feature-card-dark">
            <div className="feature-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Global Network</h3>
              <p>58 advisors • 72 units • 14 cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="markets-section">
        <div className="section-header">
          <h2>Our Markets</h2>
          <p>Three strategic global locations for residential real estate investment</p>
        </div>
        <div className="markets-grid">
          <div className="market-card">
            <div className="market-image uk">
              <div className="market-overlay">
                <h3>United Kingdom</h3>
                <p>Established market with robust legal framework</p>
              </div>
            </div>
          </div>
          <div className="market-card">
            <div className="market-image portugal">
              <div className="market-overlay">
                <h3>Portugal</h3>
                <p>Growing opportunity with favorable conditions</p>
              </div>
            </div>
          </div>
          <div className="market-card">
            <div className="market-image dubai">
              <div className="market-overlay">
                <h3>Dubai</h3>
                <p>Dynamic market with exceptional growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>G6<span>Intelligence</span></h3>
              <p>Global Real Estate Platform</p>
            </div>
            <div className="footer-column">
              <h4>Markets</h4>
              <a href="#uk">United Kingdom</a>
              <a href="#pt">Portugal</a>
              <a href="#dubai">Dubai</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-mobile-contact">
            <button className="contact-btn">📞 Contact Us</button>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 G6 Intelligence. All rights reserved.</p>
            <div className="footer-locations">
              London • Lisbon • Dubai • Singapore
            </div>
          </div>
        </div>
      </footer>

      {/* Survey Modal */}
      {showSurvey && (
        <Survey
          onClose={handleSurveyClose}
          onComplete={handleSurveyCompleteInternal}
        />
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <video
              controls
              autoPlay
              className="video-player"
              src="https://res.cloudinary.com/dyoboavng/video/upload/v1784507108/G6-Intelligence_vs4mea.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}
