import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import "./HomeNavbar.css"

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="homeNavbar bg-body-tertiary p-4 ps-5 pe-3">
      <Container fluid>
        <Navbar.Brand className="d-lg-none" href="#">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="d-flex flex-column" id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 d-flex flex-column" navbarScroll>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-house"></i>
              <Nav.Link className="homeLink" href="#action1">
                Home
              </Nav.Link>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-gear-wide-connected"></i>
              <Nav.Link className="functionalityLink" href="#action2">
                How it works?!
              </Nav.Link>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-people-fill"></i>
              <Nav.Link className="contact_usLink" href="#action2">
                Contact us
              </Nav.Link>
            </div>
            <div className="d-flex flex-row align-items-center my-2">
              <i className="linkIconSymbol bi bi-box-arrow-in-right"></i>
              <Nav.Link className="loginLink" href="#action2">
                Login
              </Nav.Link>
            </div>
          </Nav>
          <Form className="homeSearchForm d-flex mt-5 pb-3">
            <Form.Control
              type="search"
              placeholder="Search here..."
              className="homeSearchField"
              aria-label="Search"
            />
            <Button className="homeSearchButton d-flex justify-content-center align-items-center">
              <i className="homeSearchIcon bi bi-search"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavScrollExample
