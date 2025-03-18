"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RegistrationForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    voterId: "",
    fingerprint: null,
    photo: null,
    bloOfficerId: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData({
      ...formData,
      [name]: files[0],
    })

    // Clear error when user selects a file
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.age) newErrors.age = "Age is required"
    else if (Number.parseInt(formData.age) < 18) newErrors.age = "Voter must be at least 18 years old"

    if (!formData.voterId.trim()) newErrors.voterId = "Voter ID is required"
    else if (!/^[A-Z]{3}[0-9]{7}$/.test(formData.voterId)) {
      newErrors.voterId = "Invalid Voter ID format"
    }

    if (!formData.fingerprint) newErrors.fingerprint = "Fingerprint scan is required"
    if (!formData.photo) newErrors.photo = "Live photo is required"
    if (!formData.bloOfficerId.trim()) newErrors.bloOfficerId = "BLO Officer ID is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call to blockchain backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would send the data to your backend here
      console.log("Submitting voter data to blockchain:", formData)

      // Redirect to success or login page
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ submit: "Failed to register voter. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Voter Registration</h2>
      <p className="text-gray-600 mb-6 text-center">This form is to be filled by the BLO Officer only</p>

      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
          </div>

          <div>
            <label htmlFor="voterId" className="block text-sm font-medium text-gray-700 mb-1">
              Voter ID
            </label>
            <input
              type="text"
              id="voterId"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              placeholder="e.g. ABC1234567"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.voterId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.voterId && <p className="mt-1 text-sm text-red-600">{errors.voterId}</p>}
          </div>

          <div>
            <label htmlFor="bloOfficerId" className="block text-sm font-medium text-gray-700 mb-1">
              BLO Officer ID
            </label>
            <input
              type="text"
              id="bloOfficerId"
              name="bloOfficerId"
              value={formData.bloOfficerId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bloOfficerId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.bloOfficerId && <p className="mt-1 text-sm text-red-600">{errors.bloOfficerId}</p>}
          </div>

          <div>
            <label htmlFor="fingerprint" className="block text-sm font-medium text-gray-700 mb-1">
              Fingerprint Scan
            </label>
            <input
              type="file"
              id="fingerprint"
              name="fingerprint"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fingerprint ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fingerprint && <p className="mt-1 text-sm text-red-600">{errors.fingerprint}</p>}
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              Live Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
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
                Registering Voter...
              </span>
            ) : (
              "Register Voter"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm

