//react import
import React from "react"

//components import
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
//protecting route to signed-in users
import PrivateRoute from "./PrivateRoute"

//react-bootstrap import
import { Container } from "react-bootstrap"

//AuthContext import
import { AuthProvider } from "../contexts/AuthContext"

//react router dom import
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


//App component
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center bg-dark"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router> {/* react router */}
          <AuthProvider>  {/* AuthProvider context */}
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
