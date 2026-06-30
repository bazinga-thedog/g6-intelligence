import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import LandingPage from './LandingPage'
import LocationShowcase from './LocationShowcase'
import NeighborhoodShowcase from './NeighborhoodShowcase'
import NeighborhoodDetail from './NeighborhoodDetail'
import InvestmentDetails from './InvestmentDetails'
import ScheduleConsultation from './ScheduleConsultation'
import ConsultationConfirmation from './ConsultationConfirmation'
import './App.css'

function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSurveyComplete = () => {
    navigate('/locations')
  }

  const handleCitySelect = (city) => {
    navigate(`/neighborhoods/${city.city}`, { state: { city } })
  }

  const handleBackToCities = () => {
    navigate('/locations')
  }

  const handleNeighborhoodSelect = (neighborhood) => {
    const city = location.state?.city
    navigate(`/neighborhoods/${city.city}/${neighborhood.name}`, {
      state: { neighborhood, city }
    })
  }

  const handleBackToNeighborhoods = () => {
    navigate(-1) // Go back to previous page
  }

  return (
    <Routes>
        <Route
          path="/"
          element={<LandingPage onSurveyComplete={handleSurveyComplete} />}
        />
        <Route
          path="/locations"
          element={<LocationShowcase onCitySelect={handleCitySelect} />}
        />
        <Route
          path="/neighborhoods/:cityName"
          element={
            <NeighborhoodShowcase
              selectedCity={location.state?.city}
              onBack={handleBackToCities}
              onNeighborhoodSelect={handleNeighborhoodSelect}
            />
          }
        />
        <Route
          path="/neighborhoods/:cityName/:neighborhoodName"
          element={
            <NeighborhoodDetail
              neighborhood={location.state?.neighborhood}
              cityName={location.state?.city?.city}
              onBack={handleBackToNeighborhoods}
            />
          }
        />
        <Route
          path="/neighborhoods/:cityName/:neighborhoodName/investment"
          element={<InvestmentDetails />}
        />
        <Route
          path="/schedule-consultation"
          element={<ScheduleConsultation />}
        />
        <Route
          path="/consultation-confirmation"
          element={<ConsultationConfirmation />}
        />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
