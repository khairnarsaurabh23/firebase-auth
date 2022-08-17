//hooks and react import
import React, { useRef, useState } from "react"

//react bootstrap import
import { Form, Button, Card, Alert } from "react-bootstrap"

//useAuth context import
import { useAuth } from "../contexts/AuthContext"

//react router import
import { Link, useHistory } from "react-router-dom"

//login component
export default function Login() {
  //useRef is used to store and pass email and passwd to the firebase
  const emailRef = useRef()
  const passwordRef = useRef()
  const { currentUser, login } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //handle submit functionality
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setMessage(`Logged in as ${currentUser.mail}`)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message} && <Alert variant="danger">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn btn-warning" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}

