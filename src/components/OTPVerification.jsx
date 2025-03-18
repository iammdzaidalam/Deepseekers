"use client"

import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function OTPVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const voterId = location.state?.voterId || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [otpSent, setOtpSent] = useState(false)

  // References for OTP inputs
  const inputRefs = Array(6)
    .fill(0)
    .map(() => React.createRef())

  // Handle countdown for OTP resend
  useEffect(() => {
    let timer
    if (countdown > 0 && otpSent) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }

    return () => clearTimeout(timer)
  }, [countdown, otpSent])

  // Auto-focus first input on component mount
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus()
    }

    // Simulate sending OTP
    handleSendOTP()
  }, [])

  const handleSendOTP = async () => {
    setLoading(true)

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would send an OTP to the user's registered mobile number
      console.log("Sending OTP for voter ID:", voterId)

      setOtpSent(true)
      setCountdown(30)
    } catch (error) {
      console.error("Error sending OTP:", error)
      setError("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    // Update OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user types
    if (error) setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      inputRefs[5].current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if OTP is complete
    if (otp.some((digit) => !digit)) {
      setError("Please enter the complete 6-digit OTP")
      return
    }

    setLoading(true)

    try {
      // Simulate API call to verify OTP with blockchain
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would verify the OTP with your blockchain smart contract
      console.log("Verifying OTP:", otp.join(""), "for voter ID:", voterId)

      // For demo purposes, we'll just proceed to voting
      navigate("/voting", { state: { voterId } })
    } catch (error) {
      console.error("OTP verification error:", error)
      setError("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">OTP Verification</h2>
        <p className="text-gray-600 mt-2">Enter the 6-digit code sent to your registered mobile number</p>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      <form onSubmit={handleSubmit} onPaste={handlePaste}>
        <div className="flex justify-center space-x-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.some((digit) => !digit)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying OTP...
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {otpSent && countdown > 0 ? (
            `Resend OTP in ${countdown} seconds`
          ) : (
            <button
              onClick={handleSendOTP}
              disabled={loading || (otpSent && countdown > 0)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

export default OTPVerification

