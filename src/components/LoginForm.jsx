"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginForm() {
  const navigate = useNavigate()
  const [voterId, setVoterId] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setVoterId(e.target.value)
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!voterId.trim()) {
      setError("Please enter your Voter ID")
      return
    }

    // Format validation (example: ABC1234567)
    if (!/^[A-Z]{3}[0-9]{7}$/.test(voterId)) {
      setError("Invalid Voter ID format. Please enter a valid ID")
      return
    }

    setLoading(true)

    try {
      // Simulate API call to blockchain backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would verify the Voter ID with your backend here
      console.log("Verifying voter ID:", voterId)

      // For demo purposes, we'll just proceed to fingerprint auth
      navigate("/fingerprint-auth", { state: { voterId } })
    } catch (error) {
      console.error("Login error:", error)
      setError("Failed to verify Voter ID. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Voter Authentication</h2>
        <p className="text-gray-600 mt-2">Enter your Voter ID to continue</p>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="voterId" className="block text-sm font-medium text-gray-700 mb-2">
            Voter ID
          </label>
          <input
            type="text"
            id="voterId"
            value={voterId}
            onChange={handleChange}
            placeholder="Enter your Voter ID (e.g. ABC1234567)"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
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
              Verifying...
            </span>
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Not registered yet? Please visit your local BLO office.
      </div>
    </div>
  )
}

export default LoginForm

