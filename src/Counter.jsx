import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Counter ID - using a fixed ID for simplicity
  const COUNTER_ID = 1

  // Load counter value from Supabase on mount
  useEffect(() => {
    loadCounter()
  }, [])

  async function loadCounter() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('counters')
        .select('value')
        .eq('id', COUNTER_ID)
        .single()

      if (error) throw error

      if (data) {
        setCount(data.value)
      }
    } catch (err) {
      console.error('Error loading counter:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateCounter(newValue) {
    try {
      const { error } = await supabase
        .from('counters')
        .upsert({ id: COUNTER_ID, value: newValue })

      if (error) throw error

      setCount(newValue)
    } catch (err) {
      console.error('Error updating counter:', err)
      setError(err.message)
    }
  }

  const increment = () => updateCounter(count + 1)
  const decrement = () => updateCounter(count - 1)

  if (loading) {
    return <div className="counter-container">Loading...</div>
  }

  if (error) {
    return (
      <div className="counter-container">
        <div className="error">Error: {error}</div>
        <button onClick={loadCounter}>Retry</button>
      </div>
    )
  }

  return (
    <div className="counter-container">
      <h1>Counter App</h1>
      <div className="counter-display">{count}</div>
      <div className="button-group">
        <button onClick={decrement} className="btn btn-decrement">
          - Decrement
        </button>
        <button onClick={increment} className="btn btn-increment">
          + Increment
        </button>
      </div>
    </div>
  )
}
