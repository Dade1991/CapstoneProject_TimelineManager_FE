import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import MainBoard from "./MainBoard"
import { useNavigate } from "react-router-dom"
import "./Projects.css"

function Projects() {
  const navigateHome = useNavigate()
  const navigateSinglePJT = useNavigate()

  return (
    <>
      <Navbar expand="lg" className="projectNavbar frosted-glass-project">
        <Container fluid className="d-flex justify-content-end">
          {/* <Navbar.Brand href="#">Logo</Navbar.Brand> */}
          <Button
            className="homepageLink nav-link"
            onClick={() => {
              navigateHome("/Home")
            }}
          >
            <div className="d-flex flex-row justify-content-center align-items-center me-4">
              <p className="m-0 me-2">Hompage</p>
              <i className="bi bi-arrow-return-left"></i>
            </div>
          </Button>
        </Container>
      </Navbar>

      <Container fluid wrapper className="bg-info mt-4">
        <div className="me-4 ms-4 mb-4 m-0">
          <h3 className="projectText m-0 text-center">
            In this area <br />
            you can visualize your{" "}
            <strong className="highlightText">Projects</strong> <br /> &
            starting <strong className="highlightText">NEW ONES!</strong>
          </h3>
          <p className="projectJoke mt-4 text-center fst-italic">
            "If at first you don’t succeed, call it version 1.0."
          </p>
        </div>
        <Row className="flex-grow-1 p-3">
          <Col className="bg-warning" lg={8}>
            <h3>Your Projects:</h3>
            <div className="unorderListDiv frosted-glass bg-danger p-2">
              <ul className="unorderList">
                <li className="singleProjectList">Progetto1</li>
                <li className="singleProjectList">Progetto2</li>
                <li className="singleProjectList">Progetto3</li>
                <li className="singleProjectList">Progetto4</li>
                <li className="singleProjectList">Progetto5</li>
              </ul>
            </div>
          </Col>
          <Col
            className="bg-success d-flex flex-column justify-content-center align-items-center"
            lg={4}
          >
            <div className="searchBox frosted-glass p-3 px-5 text-center">
              <h3>Search Project</h3>
              <Form className="homeSearchForm d-flex pb-3">
                <Form.Control
                  type="search"
                  placeholder="Project name here..."
                  className="homeSearchField"
                  aria-label="Search"
                />
                <Button className="homeSearchButton d-flex justify-content-center align-items-center">
                  <i className="homeSearchIcon bi bi-search"></i>
                </Button>
              </Form>
              <div>
                <p>OR...</p>
              </div>
              <Button
                className="newProjectButton frosted-glass-newProject p-3 px-5 text-center m-0"
                onClick={() => {
                  navigateSinglePJT("/Project")
                }}
                to="/Project"
              >
                START <br /> a brend new ONE!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Projects
