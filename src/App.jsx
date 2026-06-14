import { useState } from 'react'
import LandingPage from './LandingPage'
import LocationShowcase from './LocationShowcase'
import NeighborhoodShowcase from './NeighborhoodShowcase'
import NeighborhoodDetail from './NeighborhoodDetail'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)

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
