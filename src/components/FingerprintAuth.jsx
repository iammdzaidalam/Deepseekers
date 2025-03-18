"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function FingerprintAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const voterId = location.state?.voterId || ""

  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [countdown, setCountdown] = useState(null)

  // Reset countdown timer
  useEffect(() => {
    let timer
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      // When countdown reaches 0, reset the scanning state
      setScanning(false)
      setCountdown(null)
    }

    return () => clearTimeout(timer)
  }, [countdown])

  const handleScanFingerprint = async () => {
    if (scanning) return

    setScanning(true)
    setError("")

    try {
      // Simulate fingerprint scanning and blockchain verification
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real app, you would send the fingerprint data to your blockchain smart contract
      console.log("Verifying fingerprint for voter ID:", voterId)

      // For demo purposes, we'll simulate a failed verification after 3 attempts
      if (attempts >= 2) {
        // After 3 failed attempts, redirect to OTP verification
        navigate("/otp-verification", { state: { voterId } })
        return
      }

      // Simulate a 50% chance of success for demo purposes
      const success = Math.random() > 0.5

      if (success) {
        // Fingerprint verified successfully
        navigate("/voting", { state: { voterId } })
      } else {
        // Failed verification
        setAttempts((prev) => prev + 1)
        setError(`Fingerprint verification failed. Attempts remaining: ${3 - (attempts + 1)}`)
        setCountdown(3) // 3 second cooldown before next attempt
      }
    } catch (error) {
      console.error("Fingerprint verification error:", error)
      setError("An error occurred during fingerprint verification. Please try again.")
      setCountdown(3)
    } finally {
      if (countdown === null) {
        setScanning(false)
      }
    }
  }

  const handleFallbackToOTP = () => {
    navigate("/otp-verification", { state: { voterId } })
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Fingerprint Verification</h2>
        <p className="text-gray-600 mt-2">Please scan your fingerprint to verify your identity</p>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      <div className="flex flex-col items-center justify-center mb-8">
        <div
          className={`w-32 h-32 border-4 rounded-full flex items-center justify-center mb-4 ${
            scanning
              ? "border-blue-500 animate-pulse"
              : countdown !== null
                ? "border-gray-300"
                : "border-gray-300 hover:border-blue-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 ${scanning ? "text-blue-500" : "text-gray-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        </div>

        {countdown !== null ? (
          <p className="text-sm text-gray-600">Please wait {countdown} seconds before trying again</p>
        ) : scanning ? (
          <p className="text-sm text-blue-600 animate-pulse">Scanning fingerprint...</p>
        ) : (
          <p className="text-sm text-gray-600">Touch the sensor to scan</p>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={handleScanFingerprint}
          disabled={scanning || countdown !== null}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
        >
          {scanning ? "Scanning..." : "Scan Fingerprint"}
        </button>

        <button
          onClick={handleFallbackToOTP}
          className="w-full bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Use OTP Instead
        </button>
      </div>
    </div>
  )
}

export default FingerprintAuth

