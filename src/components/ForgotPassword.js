//hooks and react import
import React, { useRef, useState } from "react"

//react bootstrap imports
import { Form, Button, Card, Alert } from "react-bootstrap"

//AuthContext import
import { useAuth } from "../contexts/AuthContext"

//reacr router imports
import { Link } from "react-router-dom"


//ForgotPassword component
export default function ForgotPassword() {
  //useRef hook is used to store and pass email to the firebase as an object
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  //used for success message prompt
  const [message, setMessage] = useState("")
  //used to disable the submit button while processing
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    //prevent default behaviour of the browser
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Email sent successfuly")
    } catch {
      setError("Error occured! Please try again later")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
