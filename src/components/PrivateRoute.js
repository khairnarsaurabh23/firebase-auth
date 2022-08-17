//import react
import React from "react"

//react router import
import { Route, Redirect } from "react-router-dom"

//useAuth context import
import { useAuth } from "../contexts/AuthContext"


//PrivateRoute component

/* if current user exist then load the associated component
          else redirect user to the login page */ 
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    >
    </Route>
  )
}
