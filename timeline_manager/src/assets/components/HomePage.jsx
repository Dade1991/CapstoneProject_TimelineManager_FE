import { Container, Row, Col } from "react-bootstrap"
import SidebarBanner from "./SidebarBanner"
import HomeNavbar from "./HomeNavbar"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import HowItWorksPage from "./HowItWorksPage"

function HomePage() {
  return (
    <>
      <SidebarBanner />
      <Container fluid className="">
        <Row className="bg-success vh-100 d-flex flex-row">
          <Col lg={5} className="text-black bg-info p-0">
            <div className="homeDivNavbar d-flex justify-content-center align-items-center h-100">
              <HomeNavbar />
            </div>
          </Col>
          <Col
            lg={7}
            className="text-black bg-info d-flex justify-content-end align-items-center p-0"
          >
            <Col lg={12} className="homePageMenuDisplay">
              {/* <LoginForm /> */}
              {/* <SignUpForm /> */}
              <HowItWorksPage />
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
