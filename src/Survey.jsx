import { useState } from 'react'
import { supabase } from './supabaseClient'
import './Survey.css'

export default function Survey({ onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [inputValue, setInputValue] = useState('')

  const currencies = [
    { code: 'EUR', symbol: '€', label: 'EUR', country: 'Portugal' },
    { code: 'GBP', symbol: '£', label: 'GBP', country: 'United Kingdom' },
    { code: 'AED', symbol: 'د.إ', label: 'AED', country: 'Dubai' },
    { code: 'SGD', symbol: 'S$', label: 'SGD', country: 'Singapore' }
  ]

  const getInvestmentOptions = (currency) => {
    const curr = currencies.find(c => c.code === currency)
    const symbol = curr?.symbol || '€'

    return [
      { value: '500k-1m', label: `${symbol}500K - ${symbol}1M` },
      { value: '1m-3m', label: `${symbol}1M - ${symbol}3M` },
      { value: '3m-10m', label: `${symbol}3M - ${symbol}10M` },
      { value: '10m+', label: `${symbol}10M+` }
    ]
  }

  const questions = [
    {
      id: 'investment_range',
      question: 'What investment range are you considering for international real estate?',
      type: 'choice',
      hasCurrencySelector: true,
      options: getInvestmentOptions(selectedCurrency)
    },
    {
      id: 'investment_objective',
      question: 'What is your primary objective for this investment?',
      type: 'choice-detailed',
      options: [
        {
          value: 'yield',
          title: 'Yield Generation',
          description: 'Regular cash flows through rental income'
        },
        {
          value: 'growth',
          title: 'Capital Growth',
          description: 'Long-term appreciation and value increase'
        },
        {
          value: 'residency',
          title: 'Residency Benefits',
          description: 'Golden visa and residence programs'
        },
        {
          value: 'personal',
          title: 'Personal Use',
          description: 'Primary or secondary residence'
        }
      ]
    },
    {
      id: 'risk_tolerance',
      question: 'If a market experiences a temporary downturn, your preferred response would be:',
      type: 'choice-detailed',
      options: [
        {
          value: 'conservative',
          title: 'Maintain Positions in Stable Assets',
          description: 'Preserve capital in proven, established markets'
        },
        {
          value: 'moderate',
          title: 'Rebalance Toward Quality Opportunities',
          description: 'Selective adjustments to well-positioned markets'
        },
        {
          value: 'growth',
          title: 'Increase Allocation to Undervalued Markets',
          description: 'Strategic positioning for medium-term recovery'
        },
        {
          value: 'aggressive',
          title: 'Maximize Exposure to Recovery Potential',
          description: 'Capitalize on dislocation for optimal long-term gains'
        }
      ]
    },
    {
      id: 'real_estate_experience',
      question: 'Your experience with real estate investment:',
      type: 'choice-detailed',
      options: [
        {
          value: 'new',
          title: 'New to Real Estate Investment',
          description: 'Exploring real estate as an investment class'
        },
        {
          value: 'active',
          title: 'Active Investor',
          description: 'Portfolio of residential or commercial properties'
        },
        {
          value: 'experienced',
          title: 'Experienced Investor',
          description: 'Substantial holdings across multiple properties'
        },
        {
          value: 'professional',
          title: 'Professional Investor',
          description: 'Extensive portfolio with dedicated management'
        }
      ]
    },
    {
      id: 'international_experience',
      question: 'Your experience with cross-border real estate investments:',
      type: 'choice-detailed',
      options: [
        {
          value: 'exploring',
          title: 'Exploring International Markets',
          description: 'First venture into global real estate investment'
        },
        {
          value: 'initial',
          title: 'Initial Portfolio Diversification',
          description: 'One or two international properties acquired'
        },
        {
          value: 'established',
          title: 'Established International Presence',
          description: 'Multiple markets with active holdings'
        },
        {
          value: 'extensive',
          title: 'Extensive Global Portfolio',
          description: 'Significant cross-border investment experience'
        }
      ]
    },
    {
      id: 'tax_residency',
      question: 'Your primary tax residency:',
      type: 'choice',
      options: [
        { value: 'portugal', label: 'Portugal' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'dubai', label: 'Dubai' },
        { value: 'singapore', label: 'Singapore' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'home_market_yield',
      question: 'What is your current home market net rental yield?',
      type: 'input',
      inputType: 'number',
      placeholder: 'Enter percentage (e.g., 4.5)',
      suffix: '%'
    },
    {
      id: 'diversification_priority',
      question: 'Your perspective on international diversification when returns are comparable to your home market:',
      type: 'choice-detailed',
      options: [
        {
          value: 'diversification_priority',
          title: 'Diversification Priority',
          description: 'Geographic spread is essential, even with comparable yields'
        },
        {
          value: 'balanced',
          title: 'Balanced Approach',
          description: 'Consider if returns are within reasonable range of home market'
        },
        {
          value: 'return_focused',
          title: 'Return-Focused with Diversification',
          description: 'Require competitive advantage alongside portfolio spread'
        },
        {
          value: 'return_maximization',
          title: 'Return Maximization',
          description: 'Only invest where returns clearly exceed home market'
        }
      ]
    }
  ]

  const totalQuestions = questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleAnswer = async (questionId, value) => {
    setIsTransitioning(true)

    const newAnswers = {
      ...answers,
      [questionId]: value,
      currency: selectedCurrency
    }
    setAnswers(newAnswers)

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 400))

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setInputValue('')
      setIsTransitioning(false)
    } else {
      // Survey complete
      await saveSurvey(newAnswers)
      onComplete(newAnswers)
    }
  }

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      handleAnswer(currentQ.id, inputValue)
    }
  }

  const handleDontKnow = () => {
    handleAnswer(currentQ.id, 'unknown')
  }

  const saveSurvey = async (surveyAnswers) => {
    try {
      const { error } = await supabase
        .from('kyc_surveys')
        .insert({
          answers: surveyAnswers,
          completed_at: new Date().toISOString()
        })

      if (error) throw error
    } catch (err) {
      console.error('Error saving survey:', err)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="survey-overlay">
      <div className="survey-container">
        {/* Progress Bar */}
        <div className="survey-progress-bar">
          <div
            className="survey-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Header */}
        <div className="survey-header">
          {/* Back Button */}
          {currentQuestion > 0 && (
            <button className="survey-back-btn-top" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
          )}

          {/* Question Counter */}
          <div className="survey-counter">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>

          {/* Close Button */}
          <button className="survey-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Question Content */}
        <div className={`survey-content ${isTransitioning ? 'transitioning' : ''}`}>
          {/* Currency Selector */}
          {currentQ.hasCurrencySelector && (
            <div className="currency-selector">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  className={`currency-btn ${selectedCurrency === curr.code ? 'active' : ''}`}
                  onClick={() => setSelectedCurrency(curr.code)}
                >
                  <span className="currency-label">{curr.label}</span>
                  <span className="currency-symbol">{curr.symbol}</span>
                </button>
              ))}
            </div>
          )}

          <h2 className="survey-question">{currentQ.question}</h2>

          {currentQ.type === 'choice' && (
            <div className="survey-options">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  className="survey-option-card"
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                >
                  <span className="option-label">{option.label}</span>
                  <svg className="option-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'choice-detailed' && (
            <div className="survey-options-detailed">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  className="survey-option-detailed"
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                >
                  <div className="option-text">
                    <span className="option-title">{option.title}</span>
                    <span className="option-description">{option.description}</span>
                  </div>
                  <svg className="option-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'input' && (
            <div className="survey-input-section">
              <div className="survey-input-wrapper">
                <input
                  type={currentQ.inputType}
                  className="survey-input"
                  placeholder={currentQ.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleInputSubmit()
                    }
                  }}
                  autoFocus
                />
                {currentQ.suffix && (
                  <span className="input-suffix">{currentQ.suffix}</span>
                )}
              </div>
              <div className="survey-input-actions">
                <button
                  className="survey-input-btn dont-know"
                  onClick={handleDontKnow}
                >
                  I don't know
                </button>
                <button
                  className="survey-input-btn submit"
                  onClick={handleInputSubmit}
                  disabled={!inputValue.trim()}
                >
                  Continue
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
