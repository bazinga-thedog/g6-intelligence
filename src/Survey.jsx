import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { SEGMENTATION, PROFILE, YIELD_BENCHMARKS } from './segmentation'
import { getProspectGuid } from './prospectGuid'
import './Survey.css'

export default function Survey({ onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [inputValue, setInputValue] = useState('')
  const [prospectGuid, setProspectGuid] = useState(null)

  // Get prospect GUID on mount (already generated when "Yes" was clicked)
  useEffect(() => {
    const guid = getProspectGuid()
    setProspectGuid(guid)
    console.log('Survey started with Prospect GUID:', guid)
  }, [])

  const currencies = [
    { code: 'EUR', symbol: '€', label: 'EUR', country: 'Portugal', rate: 1.0 },
    { code: 'GBP', symbol: '£', label: 'GBP', country: 'United Kingdom', rate: 0.84 },
    { code: 'AED', symbol: 'د.إ', label: 'AED', country: 'Dubai', rate: 3.98 },
    { code: 'SGD', symbol: 'S$', label: 'SGD', country: 'Singapore', rate: 1.46 }
  ]

  const formatCurrency = (value, symbol) => {
    if (value >= 1000000) {
      const millions = value / 1000000
      // Check if it's a whole number
      if (millions % 1 === 0) {
        return `${symbol}${millions}M`
      }
      // Check if it needs 2 decimal places (like 1.25)
      const rounded1 = Math.round(millions * 10) / 10
      const rounded2 = Math.round(millions * 100) / 100
      if (rounded1 !== rounded2) {
        return `${symbol}${rounded2}M`
      }
      // Otherwise use 1 decimal place
      return `${symbol}${rounded1}M`
    }
    return `${symbol}${value / 1000}K`
  }

  const getInvestmentOptions = (currency) => {
    const curr = currencies.find(c => c.code === currency)
    const symbol = curr?.symbol || '€'
    const rate = curr?.rate || 1.0

    // EUR benchmark values
    const ranges = [
      { min: 500000, max: 750000, value: '500k-750k' },
      { min: 750000, max: 1000000, value: '750k-1m' },
      { min: 1000000, max: 1250000, value: '1m-1.25m' },
      { min: 1250000, max: 1500000, value: '1.25m-1.5m' },
      { min: 1500000, max: 5000000, value: '1.5m-5m' },
      { min: 5000000, max: null, value: '5m+' }
    ]

    return ranges.map(range => {
      const convertedMin = Math.round((range.min * rate) / 10000) * 10000
      const convertedMax = range.max ? Math.round((range.max * rate) / 10000) * 10000 : null

      const label = convertedMax
        ? `${formatCurrency(convertedMin, symbol)} - ${formatCurrency(convertedMax, symbol)}`
        : `${formatCurrency(convertedMin, symbol)}+`

      return { value: range.value, label }
    })
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
      question: 'Which of the following investment objectives is most important to you?',
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
          description: 'Value appreciation'
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
      id: 'investment_horizon',
      question: 'What is your investment time horizon?',
      type: 'choice',
      options: [
        { value: '<3', label: 'Less than 3 years' },
        { value: '3-5', label: '3 - 5 years' },
        { value: '5-7', label: '5 - 7 years' },
        { value: '7-10', label: '7 - 10 years' },
        { value: '10+', label: '10+ years' }
      ]
    },
    {
      id: 'risk_tolerance',
      question: 'If the market value of your residential property investment declined by 20% over a two-year period, while rental income remained stable, what would you most likely do?',
      type: 'choice-detailed',
      options: [
        {
          value: 'very_conservative',
          title: 'Sell the property as soon as possible to avoid further losses',
          description: ''
        },
        {
          value: 'conservative',
          title: 'Hold the property but avoid making any additional investments until the market stabilizes',
          description: ''
        },
        {
          value: 'growth_oriented',
          title: 'Look for opportunities to acquire additional properties at discounted prices',
          description: ''
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
      question: 'What is your current home market gross rental yield?',
      type: 'input',
      inputType: 'number',
      placeholder: 'Enter percentage (e.g., 4.5)',
      suffix: '%'
    },
    {
      id: 'diversification_priority',
      question: 'Would you still consider investing abroad for geographic diversification if the target market offered lower yields and growth potential than your home market?',
      type: 'choice',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
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

  const calculateYieldAlignment = (homeMarketYield, taxResidency) => {
    // If "I don't know" was selected
    if (homeMarketYield === 'unknown') {
      return PROFILE.YIELD_ALIGNMENT.HONEST
    }

    // If tax residency is "other", not applicable
    if (taxResidency === 'other') {
      return PROFILE.YIELD_ALIGNMENT.NOT_APPLICABLE
    }

    // Get benchmark for country
    const benchmark = YIELD_BENCHMARKS[taxResidency]
    if (!benchmark) {
      return PROFILE.YIELD_ALIGNMENT.NOT_APPLICABLE
    }

    const yieldValue = parseFloat(homeMarketYield)
    if (isNaN(yieldValue)) {
      return PROFILE.YIELD_ALIGNMENT.HONEST
    }

    const { min, max } = benchmark

    // Aligned: Within the range
    if (yieldValue >= min && yieldValue <= max) {
      return PROFILE.YIELD_ALIGNMENT.ALIGNED
    }

    // Calculate distance from range boundaries
    const distanceFromRange = yieldValue < min
      ? min - yieldValue
      : yieldValue - max

    // Misaligned: Within ±3% of boundaries but outside
    if (distanceFromRange <= 3) {
      return PROFILE.YIELD_ALIGNMENT.MISALIGNED
    }

    // Delusional: Beyond ±3% of boundaries
    return PROFILE.YIELD_ALIGNMENT.DELUSIONAL
  }

  const profileProspect = (surveyAnswers) => {
    // 1. RISK TOLERANCE - Direct from Q4
    const riskTolerance = surveyAnswers.risk_tolerance || PROFILE.RISK_TOLERANCE.UNKNOWN

    // 2. INVESTMENT HORIZON - Direct from Q3
    const investmentHorizon = surveyAnswers.investment_horizon || PROFILE.INVESTMENT_HORIZON.UNKNOWN

    // 3. EXPERIENCE INVESTING ABROAD - Direct from Q6
    const experienceAbroad = surveyAnswers.international_experience || PROFILE.EXPERIENCE_ABROAD.UNKNOWN

    // 4. REAL ESTATE EXPERIENCE - Direct from Q5
    const reExperience = surveyAnswers.real_estate_experience || PROFILE.RE_EXPERIENCE.UNKNOWN

    // 5. HOME MARKET YIELD ALIGNMENT - Calculated from Q8 vs benchmark
    const homeMarketYield = surveyAnswers.home_market_yield
    const taxResidency = surveyAnswers.tax_residency
    const yieldAlignment = calculateYieldAlignment(homeMarketYield, taxResidency)

    // 6. GEOGRAPHIC DIVERSIFICATION PRIORITY - Direct from Q9
    const diversificationPriority = surveyAnswers.diversification_priority || PROFILE.DIVERSIFICATION_PRIORITY.UNKNOWN

    return {
      riskTolerance,
      investmentHorizon,
      experienceAbroad,
      reExperience,
      yieldAlignment,
      diversificationPriority
    }
  }

  const segmentProspect = (surveyAnswers) => {
    // 1. TAX RESIDENCY - Direct from Q6
    const taxResidency = surveyAnswers.tax_residency || SEGMENTATION.TAX_RESIDENCY.UNKNOWN

    // 2. NET WORTH - Based on investment range (Q1)
    const investmentRange = surveyAnswers.investment_range
    let netWorth = SEGMENTATION.NET_WORTH.UNKNOWN

    if (investmentRange === '500k-750k' || investmentRange === '750k-1m' || investmentRange === '1m-1.25m') {
      netWorth = SEGMENTATION.NET_WORTH.EMERGING
    } else if (investmentRange === '1.25m-1.5m') {
      netWorth = SEGMENTATION.NET_WORTH.ESTABLISHED
    } else if (investmentRange === '1.5m-5m') {
      netWorth = SEGMENTATION.NET_WORTH.HIGH
    } else if (investmentRange === '5m+') {
      netWorth = SEGMENTATION.NET_WORTH.ULTRA_HIGH
    }

    // 3. INVESTMENT OBJECTIVE - Direct from Q2
    const investmentObjective = surveyAnswers.investment_objective || SEGMENTATION.INVESTMENT_OBJECTIVE.UNKNOWN

    // 4. DRIVER - Calculated from Q4, Q5, Q8
    // Logic:
    // - Higher RE experience (Q4) + Higher international experience (Q5) + Return-focused (Q8) = "Own Process"
    // - Lower experience + Diversification-focused = "Delegate"

    let driverScore = 0

    // Q4: Real Estate Experience
    const reExperience = surveyAnswers.real_estate_experience
    if (reExperience === 'professional') driverScore += 3
    else if (reExperience === 'experienced') driverScore += 2
    else if (reExperience === 'active') driverScore += 1
    else if (reExperience === 'new') driverScore += 0

    // Q5: International Experience
    const intlExperience = surveyAnswers.international_experience
    if (intlExperience === 'extensive') driverScore += 3
    else if (intlExperience === 'established') driverScore += 2
    else if (intlExperience === 'initial') driverScore += 1
    else if (intlExperience === 'exploring') driverScore += 0

    // Q8: Diversification vs Return Focus
    const divPriority = surveyAnswers.diversification_priority
    if (divPriority === 'return_maximization') driverScore += 2
    else if (divPriority === 'return_focused') driverScore += 1
    else if (divPriority === 'balanced') driverScore += 0
    else if (divPriority === 'diversification_priority') driverScore -= 1

    // Scoring: 0-3 = Delegate, 4-8 = Own Process
    const driver = driverScore >= 4 ? SEGMENTATION.DRIVER.OWN_PROCESS : SEGMENTATION.DRIVER.DELEGATE

    return {
      taxResidency,
      netWorth,
      investmentObjective,
      driver,
      driverScore // Include score for transparency
    }
  }

  const saveSurvey = async (surveyAnswers) => {
    try {
      // Generate segmentation and profile
      const segmentation = segmentProspect(surveyAnswers)
      const profile = profileProspect(surveyAnswers)

      // Log to console
      console.log('=== PROSPECT SEGMENTATION ===')
      console.log('Prospect GUID:', prospectGuid)
      console.log('\nSEGMENTATION:')
      console.log('  Tax Residency:', segmentation.taxResidency)
      console.log('  Net Worth:', segmentation.netWorth)
      console.log('  Investment Objective:', segmentation.investmentObjective)
      console.log('  Driver:', segmentation.driver, `(score: ${segmentation.driverScore})`)
      console.log('\nPROFILE:')
      console.log('  Risk Tolerance:', profile.riskTolerance)
      console.log('  Investment Horizon:', profile.investmentHorizon)
      console.log('  Experience Abroad:', profile.experienceAbroad)
      console.log('  RE Experience:', profile.reExperience)
      console.log('  Yield Alignment:', profile.yieldAlignment)
      console.log('  Diversification Priority:', profile.diversificationPriority)
      console.log('=============================')

      // Save to prospect_segmentation table
      const { error: segmentError } = await supabase
        .from('prospect_segmentation')
        .insert({
          prospect_guid: prospectGuid,
          tax_residency: segmentation.taxResidency,
          net_worth: segmentation.netWorth,
          investment_objective: segmentation.investmentObjective,
          driver: segmentation.driver,
          driver_score: segmentation.driverScore,
          risk_tolerance: profile.riskTolerance,
          investment_horizon: profile.investmentHorizon,
          experience_abroad: profile.experienceAbroad,
          re_experience: profile.reExperience,
          yield_alignment: profile.yieldAlignment,
          diversification_priority: profile.diversificationPriority,
          survey_answers: surveyAnswers,
          selected_currency: selectedCurrency
        })

      if (segmentError) {
        console.error('Error saving segmentation:', segmentError)
        throw segmentError
      }

      console.log('✓ Segmentation and profile saved successfully')
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

          <h2 className={`survey-question ${currentQ.id === 'risk_tolerance' ? 'risk-tolerance-question' : ''}`}>{currentQ.question}</h2>

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
                  className={`survey-option-detailed ${currentQ.id === 'risk_tolerance' ? 'risk-tolerance-option' : ''}`}
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
