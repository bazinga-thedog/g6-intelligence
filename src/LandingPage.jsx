import { useState } from 'react'
import CommentSystem from './CommentSystem'
import './LandingPage.css'

export default function LandingPage() {
  const [selectedResponse, setSelectedResponse] = useState(null)

  const handleResponse = (response) => {
    setSelectedResponse(response)
    console.log('User selected:', response)
  }

  return (
    <div className="landing">
      <CommentSystem />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="brand-name">G6 Intelligence</h1>
            <p className="brand-subtitle">Global Real Estate Platform</p>

            <div className="value-prop">
              <p>
                Clear, comparable intelligence on residential real estate across
                four global markets. Access vetted local advisors and comprehensive
                insights on legal frameworks, taxation, expected returns, and
                management requirements throughout the investment lifecycle.
              </p>
            </div>

            <div className="cta-section">
              <h2 className="cta-question">
                Looking to diversify your real estate portfolio internationally?
              </h2>
              <div className="cta-buttons">
                <button
                  className={`btn-primary ${selectedResponse === 'yes' ? 'selected' : ''}`}
                  onClick={() => handleResponse('yes')}
                >
                  Yes
                </button>
                <button
                  className={`btn-secondary ${selectedResponse === 'maybe' ? 'selected' : ''}`}
                  onClick={() => handleResponse('maybe')}
                >
                  Maybe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="markets-section">
        <div className="markets-grid">
          <div className="market-card">
            <div className="market-image uk">
              <h3>United Kingdom</h3>
            </div>
          </div>
          <div className="market-card">
            <div className="market-image portugal">
              <h3>Portugal</h3>
            </div>
          </div>
          <div className="market-card">
            <div className="market-image dubai">
              <h3>Dubai</h3>
            </div>
          </div>
          <div className="market-card">
            <div className="market-image singapore">
              <h3>Singapore</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Intelligence</h3>
              <p>Comprehensive market analysis and comparable data across jurisdictions.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3>Connection</h3>
              <p>Vetted local advisors who understand your investment objectives.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3>Support</h3>
              <p>Guidance through acquisition, management, and the complete investment lifecycle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>G6 Intelligence</h3>
              <p>Global Real Estate Platform</p>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#markets">Markets</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-contact">
              <p>Contact: [contact@g6intelligence.com]</p>
              <p>London • Lisbon • Dubai • Singapore</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 G6 Intelligence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
