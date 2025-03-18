import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  // Don't show navbar on success page
  if (location.pathname === "/success") {
    return null
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">BlockVote</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {location.pathname !== "/login" && (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
            )}
            {location.pathname !== "/register" && (
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

