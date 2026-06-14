import { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import LocationShowcase from './LocationShowcase'
import NeighborhoodShowcase from './NeighborhoodShowcase'
import NeighborhoodDetail from './NeighborhoodDetail'
import AdminPanel from './AdminPanel'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)

  // Check if URL contains /admin to show admin panel
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setCurrentPage('admin')
    }
  }, [])

  const handleSurveyComplete = () => {
    setCurrentPage('locations')
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setCurrentPage('neighborhoods')
  }

  const handleBackToCities = () => {
    setCurrentPage('locations')
    setSelectedCity(null)
  }

  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood)
    setCurrentPage('neighborhoodDetail')
  }

  const handleBackToNeighborhoods = () => {
    setCurrentPage('neighborhoods')
    setSelectedNeighborhood(null)
  }

  return (
    <>
      {currentPage === 'admin' && (
        <AdminPanel />
      )}
      {currentPage === 'landing' && (
        <LandingPage onSurveyComplete={handleSurveyComplete} />
      )}
      {currentPage === 'locations' && (
        <LocationShowcase onCitySelect={handleCitySelect} />
      )}
      {currentPage === 'neighborhoods' && (
        <NeighborhoodShowcase
          selectedCity={selectedCity}
          onBack={handleBackToCities}
          onNeighborhoodSelect={handleNeighborhoodSelect}
        />
      )}
      {currentPage === 'neighborhoodDetail' && (
        <NeighborhoodDetail
          neighborhood={selectedNeighborhood}
          cityName={selectedCity?.city}
          onBack={handleBackToNeighborhoods}
        />
      )}
    </>
  )
}

export default App
