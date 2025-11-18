import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../AuthContext"
import "./HomeNavbar.css"

function HomeNavbar() {
  const { token, logout } = useContext(AuthContext)
  const navigatePJT = useNavigate()
  const navigateHome = useNavigate()
  const isAuthenticated = Boolean(token)

  return (
    <Navbar
      expand="lg"
      className="homeNavbar frosted-glass-homeNavbar ms-5 py-4 ps-5 pe-3"
    >
      <Container>
        <Navbar.Brand className="d-lg-none" href="#">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="d-flex flex-column" id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 d-flex flex-column" navbarScroll>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-house"></i>
              <Button
                onClick={() => {
                  navigateHome("/Home")
                }}
                className="homeLink nav-link"
                to="/Home"
              >
                Home
              </Button>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-gear-wide-connected"></i>
              <Link className="howItWorksLink nav-link" to="/HowItWorks">
                How it works?!
              </Link>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-people-fill"></i>
              <Link className="contact_usLink nav-link" to="/ContactUs">
                Contact us
              </Link>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-box-arrow-in-right"></i>
              {isAuthenticated ? (
                <Button
                  className="logoutLink nav-link"
                  onClick={() => {
                    logout()
                    navigateHome("/LoginForm")
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link className="loginLink nav-link" to="/LoginForm">
                  Login
                </Link>
              )}
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-person-circle"></i>
              <Link className="yourAreaLink nav-link" to="/YourArea">
                Your Area
              </Link>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-diagram-3"></i>
              <Button
                onClick={() => {
                  navigatePJT("/Projects")
                }}
                className="projectsLink nav-link"
                to="/Projects"
              >
                Projects
              </Button>
            </div>
          </Nav>
          {/* <Form className="homeSearchForm d-flex mt-5 pb-3">
            <Form.Control
              type="search"
              placeholder="Search here..."
              className="homeSearchField"
              aria-label="Search"
            />
            <Button className="homeSearchButton d-flex justify-content-center align-items-center">
              <i className="homeSearchIcon bi bi-search"></i>
            </Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HomeNavbar
