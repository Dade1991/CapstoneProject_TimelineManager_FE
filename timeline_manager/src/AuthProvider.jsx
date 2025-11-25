import React, { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }) {
  // stato token JWT

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  )

  // nuovo stato per dati utente (nickname, avatarUrl, ecc)

  const [user, setUser] = useState(() => {
    // puoi inizializzare da localStorage se li salvi lì, oppure null

    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  // salva token e sincronizza localStorage

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      fetchUserProfile(token)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // reset dati utente se logout

      setUser(null)
    }
    console.log("Token in AuthProvider >>>", token)
  }, [token])

  // funzione per recuperare dati profilo utente dal backend

  const fetchUserProfile = async (currentToken) => {
    try {
      const res = await fetch("http://localhost:3001/api/users/profile", {
        headers: { Authorization: `Bearer ${currentToken}` },
      })
      if (!res.ok) throw new Error("Failed to fetch user profile")
      const profile = await res.json()
      setUser(profile)
      localStorage.setItem("user", JSON.stringify(profile))
    } catch (error) {
      console.error("Error fetching user profile:", error)

      // se fallisce, rimuovi dati utente

      setUser(null)
      localStorage.removeItem("user")
    }
  }

  // logout e pulizia

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
