import { Container } from "react-bootstrap"
import "./Home.css"

function Home() {
  return (
    <>
      <Container className="homeBanner d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="homeBannerTitle">TIMELINE</h1>
        <h2 className="homeBannerUnderTitle">Manager</h2>
      </Container>
    </>
  )
}

export default Home
