//hooks and react import
import React, { useContext, useState, useEffect } from "react"
//auth import from firebase.js
import { auth } from "../firebase"

//create context
const AuthContext = React.createContext()

//export context
export function useAuth() {
  return useContext(AuthContext)
}

//context component
export function AuthProvider({ children }) {
  //state's
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  //signup functionality
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  //login finctionality
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  //logout functionality
  function logout() {
    return auth.signOut()
  }

  //resetpassword func
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  //update email
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  //update passwd /update-proflle
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  //load on component mounting
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      //set the currentUser as logged in used
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  //object of values to pass with context
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
