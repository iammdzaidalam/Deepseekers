"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function VotingDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const voterId = location.state?.voterId || ""

  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [candidates, setCandidates] = useState([])
  const [loadingCandidates, setLoadingCandidates] = useState(true)

  // Fetch candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoadingCandidates(true)

      try {
        // Simulate API call to fetch candidates from blockchain
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // In a real app, you would fetch candidates from your blockchain
        const mockCandidates = [
          { id: 1, name: "John Smith", party: "Democratic Party", symbol: "🌊" },
          { id: 2, name: "Jane Doe", party: "Republican Party", symbol: "🐘" },
          { id: 3, name: "Alex Johnson", party: "Green Party", symbol: "🌿" },
          { id: 4, name: "Sarah Williams", party: "Libertarian Party", symbol: "🗽" },
          { id: 5, name: "NOTA", party: "None of the Above", symbol: "❌" },
        ]

        setCandidates(mockCandidates)
      } catch (error) {
        console.error("Error fetching candidates:", error)
      } finally {
        setLoadingCandidates(false)
      }
    }

    fetchCandidates()
  }, [])

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate)
  }

  const handleVoteClick = () => {
    if (!selectedCandidate) return
    setShowConfirmation(true)
  }

  const handleConfirmVote = async () => {
    setLoading(true)

    try {
      // Simulate API call to submit vote to blockchain
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real app, you would submit the vote to your blockchain smart contract
      console.log("Submitting vote for candidate:", selectedCandidate.id, "by voter:", voterId)

      // Generate a mock transaction hash
      const txHash =
        "0x" +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")

      // Navigate to success page with vote details
      navigate("/success", {
        state: {
          voterId,
          candidate: selectedCandidate,
          txHash,
        },
      })
    } catch (error) {
      console.error("Error submitting vote:", error)
    } finally {
      setLoading(false)
      setShowConfirmation(false)
    }
  }

  const handleCancelVote = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Cast Your Vote</h2>
        <p className="text-gray-600 mt-2">Select a candidate and submit your vote</p>
      </div>

      {loadingCandidates ? (
        <div className="flex justify-center items-center py-12">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
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
          <span className="ml-3 text-lg text-gray-600">Loading candidates...</span>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => handleSelectCandidate(candidate)}
              className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                selectedCandidate?.id === candidate.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                    {candidate.symbol}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-500">{candidate.party}</p>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full border ${
                      selectedCandidate?.id === candidate.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {selectedCandidate?.id === candidate.id && (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleVoteClick}
          disabled={!selectedCandidate || loadingCandidates}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
        >
          Cast Vote
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Your Vote</h3>
            <p className="text-gray-600 mb-6">
              You are about to cast your vote for{" "}
              <span className="font-medium text-gray-900">{selectedCandidate.name}</span> ({selectedCandidate.party}).
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleCancelVote}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmVote}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Vote"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VotingDashboard

