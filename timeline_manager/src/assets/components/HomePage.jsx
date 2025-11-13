import { Container, Row, Col } from "react-bootstrap"
import SidebarBanner from "./SidebarBanner"
import HomeNavbar from "./HomeNavbar"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import HowItWorksPage from "./HowItWorksPage"
import ContactUsPage from "./ContactUsPage"
import NotFoundPage from "./NotFoundPage"
import HomeFooter from "./HomeFooter"
import Home from "./Home"
import YourArea from "./YourArea"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function HomePage() {
  return (
    <>
      <Container fluid className="p-0">
        <Row className="vh-100 d-flex">
          <SidebarBanner />
          <div className="d-flex flex-row flex-grow-1">
            <Col lg={5} className="p-0">
              <div className="homeDivNavbar d-flex justify-content-center align-items-center h-100">
                <HomeNavbar />
              </div>
            </Col>
            <Col
              lg={7}
              className="d-flex justify-content-end align-items-center p-0"
            >
              <Col lg={12} className="homePageMenuDisplay wrapper">
                <Routes>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/LoginForm" element={<LoginForm />} />
                  <Route path="/HowItWorks" element={<HowItWorksPage />} />
                  <Route path="/SignUpForm" element={<SignUpForm />} />
                  <Route path="/ContactUs" element={<ContactUsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/YourArea" element={<YourArea />} />
                </Routes>
              </Col>
            </Col>
          </div>
          <HomeFooter className="homeFooterContainer" />
        </Row>
      </Container>
    </>
  )
}

export default HomePage
