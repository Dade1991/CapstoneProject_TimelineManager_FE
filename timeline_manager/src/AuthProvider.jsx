import React, { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  )

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
    console.log("Token in AuthProvider:", token)
  }, [token])

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
