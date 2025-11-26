import { Container } from "react-bootstrap"
import React, { useContext } from "react"
import { AuthContext } from "../../AuthContext"

import "./Home.css"

function Home() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Container className="homeBanner d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="homeBannerTitle">TIMELINE</h1>
        <h2 className="homeBannerUnderTitle">Manager</h2>
        {user && (
          <div className="mt-5">
            <p className="welcomeBackText m-0">
              Welcome back:{" "}
              <strong className="welcomeBacNickname">{user?.nickname}</strong>
            </p>
          </div>
        )}
      </Container>
    </>
  )
}

export default Home
