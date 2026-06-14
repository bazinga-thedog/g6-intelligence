/**
 * Prospect GUID Management
 *
 * Generates and manages anonymous prospect identifiers before sign-up.
 * GUID is stored in localStorage and persists across sessions.
 */

const PROSPECT_GUID_KEY = 'g6_prospect_guid'

/**
 * Generate a UUID v4
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Get or create prospect GUID
 * Returns existing GUID from localStorage, or generates new one if not exists
 */
export const getProspectGuid = () => {
  let guid = localStorage.getItem(PROSPECT_GUID_KEY)

  if (!guid) {
    guid = generateUUID()
    localStorage.setItem(PROSPECT_GUID_KEY, guid)
    console.log('New prospect GUID generated:', guid)
  }

  return guid
}

/**
 * Generate a fresh GUID (replaces existing one)
 * Use when starting a new survey
 */
export const generateFreshGuid = () => {
  const guid = generateUUID()
  localStorage.setItem(PROSPECT_GUID_KEY, guid)
  console.log('Fresh prospect GUID generated:', guid)
  return guid
}

/**
 * Clear prospect GUID (e.g., after sign-up completion)
 */
export const clearProspectGuid = () => {
  localStorage.removeItem(PROSPECT_GUID_KEY)
}

/**
 * Check if prospect has a GUID (has visited before)
 */
export const hasProspectGuid = () => {
  return !!localStorage.getItem(PROSPECT_GUID_KEY)
}
