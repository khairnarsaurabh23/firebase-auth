
//hooks and react import
import React, { useRef, useState } from "react"

//react bootstrap import
import { Form, Button, Card, Alert } from "react-bootstrap"

//useAuth context import
import { useAuth } from "../contexts/AuthContext"

//react router import
import { Link, useHistory, useNavigate } from "react-router-dom"
// imported css 
import "./css/login.css";

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
  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

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
    <div>
      <div class="login-wrapper">
        <div class="login">
          <h1>Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="danger">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div class="login-credentials">
              <div class="email">
                <p for="email-label">Email Address</p>
                <input
                  type="email"
                  ref={emailRef}
                  class="email-validate"
                  id="email-label"
                  placeholder="Enter Valid Email ID"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div class="password">
                <p for="password-label">Password</p>
                <input
                  type="password"
                  ref={passwordRef}
                  class="pswrd-validate"
                  id="password-label"
                  onChange={(e) => setUser({ ...user, pass: e.target.value })}
                  required
                />
              </div>
              <div class="reset-details">
                <Link to="/forget-password" class="forgot-pswrd-link">
                  Forget Password?
                </Link>
              </div>
              <button disabled={loading} type="submit" class="login-btn">Login</button>
              <p className="paragraph">OR</p>
              <button class="login-btn login-guest-btn center-flex">
                <img
                  src="google-icon.png"
                  alt=""
                  className="apex-avatar avatar-round-sm"
                />
                Continue with Google
              </button>
{/* 
              <Link class="have-account-link" to="/signup">
                Create new Account?
              </Link> */}
            </div>
          </form>
        </div>
          {/* {message} && <Alert variant="danger">{message}</Alert>
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
          </div> */}
      <div className="w-100 text-center">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div >
  </div>
  )
}

