import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import FingerprintAuth from "./components/FingerprintAuth"
import OTPVerification from "./components/OTPVerification"
import VotingDashboard from "./components/VotingDashboard"
import SuccessPage from "./components/SuccessPage"
import Navbar from "./components/Navbar"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/fingerprint-auth" element={<FingerprintAuth />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/voting" element={<VotingDashboard />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

