//import hooks and react
import React, { useRef, useState } from "react"

//react bootstarp import
import { Form, Button, Card, Alert } from "react-bootstrap"

//useAuth context import
import { useAuth } from "../contexts/AuthContext"

//react router imports
import { Link, useHistory } from "react-router-dom"


//signup component
export default function Signup() {
  //useRef is used to store and pass email passwd and 
  // confirmpasswd values
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()
  //states
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //handle submit functionality
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      //used to disable the submit button while processing
      //hence user will not create many accs accedently
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }
    //enble the submit button after proccessing the req
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn btn-warning" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
