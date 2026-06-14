/**
 * SEGMENTATION CRITERIA CONFIGURATION
 *
 * All possible values for each prospect segmentation criterion.
 * Use these constants for decision-making, routing, personalization, and business logic.
 */

export const SEGMENTATION = {
  // 1. TAX RESIDENCY
  // Source: Q6 (direct answer)
  TAX_RESIDENCY: {
    PORTUGAL: 'portugal',
    UK: 'uk',
    DUBAI: 'dubai',
    SINGAPORE: 'singapore',
    OTHER: 'other',
    UNKNOWN: 'unknown'
  },

  // 2. NET WORTH
  // Source: Q1 (investment range converted to HNWI category)
  NET_WORTH: {
    EMERGING: 'Emerging HNWI',      // €500K-€750K, €750K-€1M, €1M-€1.25M
    ESTABLISHED: 'Established HNWI', // €1.25M-€1.5M
    HIGH: 'High HNWI',               // €1.5M-€5M
    ULTRA_HIGH: 'Ultra High HNWI',   // €5M+
    UNKNOWN: 'Unknown'
  },

  // 3. INVESTMENT OBJECTIVE
  // Source: Q2 (direct answer)
  INVESTMENT_OBJECTIVE: {
    YIELD: 'yield',           // Regular cash flows through rental income
    GROWTH: 'growth',         // Long-term appreciation and value increase
    RESIDENCY: 'residency',   // Golden visa and residence programs
    PERSONAL: 'personal',     // Primary or secondary residence
    UNKNOWN: 'unknown'
  },

  // 4. DRIVER
  // Source: Calculated from Q4 (RE Experience) + Q5 (International Experience) + Q8 (Focus)
  // Score range: -1 to 8
  // Classification: 0-3 = Delegate, 4-8 = Own Process
  DRIVER: {
    OWN_PROCESS: 'Own Process',  // Score 4-8: Experienced, hands-on, self-directed
    DELEGATE: 'Delegate',        // Score 0-3: Prefers done-for-you, managed service
    UNKNOWN: 'Unknown'
  }
}

/**
 * PROFILE CRITERIA CONFIGURATION
 *
 * Additional profile attributes for deeper KYC profiling
 */

export const PROFILE = {
  // 1. RISK TOLERANCE
  // Source: Q4 (direct answer)
  RISK_TOLERANCE: {
    VERY_CONSERVATIVE: 'very_conservative',
    CONSERVATIVE: 'conservative',
    MODERATE: 'moderate',
    GROWTH_ORIENTED: 'growth_oriented',
    AGGRESSIVE: 'aggressive',
    UNKNOWN: 'unknown'
  },

  // 2. INVESTMENT HORIZON
  // Source: Q3 (direct answer)
  INVESTMENT_HORIZON: {
    LESS_THAN_3: '<3',
    THREE_TO_FIVE: '3-5',
    FIVE_TO_SEVEN: '5-7',
    SEVEN_TO_TEN: '7-10',
    TEN_PLUS: '10+',
    UNKNOWN: 'unknown'
  },

  // 3. EXPERIENCE INVESTING ABROAD
  // Source: Q6 (direct answer)
  EXPERIENCE_ABROAD: {
    EXPLORING: 'exploring',
    INITIAL: 'initial',
    ESTABLISHED: 'established',
    EXTENSIVE: 'extensive',
    UNKNOWN: 'unknown'
  },

  // 4. REAL ESTATE EXPERIENCE
  // Source: Q5 (direct answer)
  RE_EXPERIENCE: {
    NEW: 'new',
    ACTIVE: 'active',
    EXPERIENCED: 'experienced',
    PROFESSIONAL: 'professional',
    UNKNOWN: 'unknown'
  },

  // 5. HOME MARKET YIELD ALIGNMENT
  // Source: Q8 (home market yield) compared to benchmark ranges
  // Benchmarks: PT 4-7%, UK 4-8%, Dubai 6-8%, Singapore 3-4%
  // Logic:
  //   - Honest: Answered "I don't know"
  //   - Aligned: Within country range
  //   - Misaligned: Within ±3% of range boundaries but outside
  //   - Delusional: Beyond ±3% of range boundaries
  YIELD_ALIGNMENT: {
    HONEST: 'Honest',           // Said "I don't know"
    ALIGNED: 'Aligned',         // Within country benchmark range
    MISALIGNED: 'Misaligned',   // Within ±3% of range, but outside
    DELUSIONAL: 'Delusional',   // Beyond ±3% of range boundaries
    NOT_APPLICABLE: 'N/A'       // Tax residency = Other
  },

  // 6. GEOGRAPHIC DIVERSIFICATION PRIORITY
  // Source: Q9 (direct answer)
  // Would they invest abroad even with lower yields/growth?
  DIVERSIFICATION_PRIORITY: {
    YES: 'yes',
    NO: 'no',
    UNKNOWN: 'unknown'
  }
}

/**
 * YIELD BENCHMARKS BY COUNTRY
 *
 * Net rental yield ranges by tax residency
 */
export const YIELD_BENCHMARKS = {
  portugal: { min: 4, max: 7 },
  uk: { min: 4, max: 8 },
  dubai: { min: 6, max: 8 },
  singapore: { min: 3, max: 4 },
  other: null  // Not applicable
}

/**
 * Helper: Get all values for a criterion as an array
 */
export const getSegmentationValues = (criterion) => {
  return Object.values(SEGMENTATION[criterion])
}

/**
 * Helper: Check if a value is valid for a criterion
 */
export const isValidSegmentValue = (criterion, value) => {
  return getSegmentationValues(criterion).includes(value)
}

/**
 * Example usage:
 *
 * import { SEGMENTATION } from './segmentation'
 *
 * // Decision logic based on segmentation
 * if (prospect.netWorth === SEGMENTATION.NET_WORTH.ULTRA_HIGH) {
 *   // Show premium offerings
 * }
 *
 * if (prospect.driver === SEGMENTATION.DRIVER.DELEGATE) {
 *   // Route to concierge service team
 * }
 *
 * if (prospect.taxResidency === SEGMENTATION.TAX_RESIDENCY.DUBAI) {
 *   // Show Dubai-specific tax advantages
 * }
 */
