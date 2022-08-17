//import useState hook and react
import React, { useState } from "react"

//react bootstap import
import { Card, Button, Alert } from "react-bootstrap"

//AuthContext import
import { useAuth } from "../contexts/AuthContext"

//react router import
import { Link, useHistory } from "react-router-dom"

//Dashboard component
export default function Dashboard() {
  //used to prompt error messages in case of malfunction
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()

  //logout functionality
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>Welcome to the <strong>ANVAY</strong>.</p>
          <p> A student-alumni connection platform</p>
          <Link to="/update-profile" className="btn btn-warning w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          LogOut
        </Button>
      </div>
    </>
  )
}
