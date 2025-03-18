"use client"
import { useNavigate, useLocation } from "react-router-dom"

function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { voterId, candidate, txHash } = location.state || {}

  // Format transaction hash for display
  const formattedTxHash = txHash ? `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 10)}` : ""

  // Get current date and time
  const timestamp = new Date().toLocaleString()

  const handleLogout = () => {
    navigate("/login")
  }

  // If no vote data is available, redirect to login
  if (!voterId || !candidate || !txHash) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-red-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Vote Information</h2>
        <p className="text-gray-600 mb-6">No voting information was found. Please log in to cast your vote.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <div className="text-green-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Thank You for Voting!</h2>
        <p className="text-gray-600 mt-2">Your vote has been successfully recorded on the blockchain</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Vote Details</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Voter ID:</span>
            <span className="font-medium text-gray-900">{voterId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Candidate:</span>
            <span className="font-medium text-gray-900">{candidate.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Party:</span>
            <span className="font-medium text-gray-900">{candidate.party}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium text-gray-900">{timestamp}</span>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-1">Blockchain Transaction:</p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">{formattedTxHash}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          This receipt has been securely stored on the blockchain. You may now exit.
        </p>

        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Exit
        </button>
      </div>
    </div>
  )
}

export default SuccessPage

