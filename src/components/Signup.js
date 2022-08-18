

//import hooks and react
import React, { useRef, useState } from "react"

//react bootstarp import
import { Form, Button, Card, Alert } from "react-bootstrap"

//useAuth context import
import { useAuth } from "../contexts/AuthContext"

//react router imports
import { Link, useHistory } from "react-router-dom"

//import the custom css
import "./css/login.css";


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
    <div>
      <div class="login-wrapper">
        <div class="login">
          <h1>SignUp</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div class="login-credentials">
              <div class="email">
                <p for="">Email Address</p>
                <input
                  type="email"
                  ref={emailRef} required
                  class="email-validate"
                  placeholder="Enter Valid Email ID"
                />
              </div>
              <div class="password">
                <p for="">Password</p>
                <input type="password"
                  ref={passwordRef} required
                  class="pswrd-validate" />
              </div>
              <div class="password">
                <p for="">Confirm Password</p>
                <input type="password" ref={passwordConfirmRef} required class="pswrd-validate" />
              </div>
              <div class="reset-details">
                <div>
                  <input type="checkbox" class="checkbox" />I accept all the Terms
                  and conditions
                </div>
              </div>
              <button disabled={loading} type="submit" class="login-btn">Create Account</button>
              <p className="paragraph">OR</p>
              <button class="login-btn login-guest-btn center-flex">
                <img
                  src="google-icon.png"
                  alt=""
                  className="apex-avatar avatar-round-sm"
                />
                Continue with Google
              </button>
              <Link class="have-account-link" to="/">
                Already have Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
