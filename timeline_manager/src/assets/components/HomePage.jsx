import { Container, Row, Col } from "react-bootstrap"
import SidebarBanner from "./SidebarBanner"
import HomeNavbar from "./HomeNavbar"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import HowItWorksPage from "./HowItWorksPage"
import ContactUsPage from "./ContactUsPage"
import NotFoundPage from "./NotFoundPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function HomePage() {
  return (
    <>
      <SidebarBanner />
      <Container fluid className="">
        <Row className="vh-100 d-flex flex-row">
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
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route path="/HowItWorks" element={<HowItWorksPage />} />
                <Route path="/SignUpForm" element={<SignUpForm />} />
                <Route path="/ContactUs" element={<ContactUsPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
