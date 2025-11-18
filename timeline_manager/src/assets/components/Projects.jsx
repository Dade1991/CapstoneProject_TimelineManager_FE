import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../AuthContext"
import ProjectModalForm from "./ProjectModalForm"
import ProjectModalUpdate from "./ProjectModalUpdate"
import "./Projects.css"

function Projects() {
  const navigateHome = useNavigate()
  const navigateProject = useNavigate()

  const { token } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)

  const [showProjectModal, setShowProjectModal] = useState(false)

  const [selectedProject, setSelectedProject] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const handleShowProject = () => setShowProjectModal(true)
  const handleCloseProject = () => setShowProjectModal(false)

  const handleShowUpdate = (proj) => {
    setSelectedProject(proj)
    setShowUpdateModal(true)
  }
  const handleCloseUpdate = () => {
    setSelectedProject(null)
    setShowUpdateModal(false)
  }

  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      return JSON.parse(atob(base64))
    } catch {
      return null
    }
  }

  const payload = token ? parseJwt(token) : null
  const userId = payload?.sub

  // PRIMO MONTAGGIO

  useEffect(() => {
    if (!token || !userId) return

    fetch(`http://localhost:3001/api/users/${userId}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text()
          throw new Error(err || "Failed to fetch projects")
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)

        setProjects(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
  }, [token, userId])

  // SAVE PROJECT

  const handleProjectSubmit = (projectData) => {
    fetch("http://localhost:3001/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        projectName: projectData.title,
        projectDescription: projectData.description,
        expiryDate: projectData.expiryDate || null,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(errorText || "Failed to create project")
        }
        return res.json()
      })
      .then((newProject) => {
        console.log(newProject)

        setProjects((prev) => [newProject, ...prev])
        handleCloseProject()
      })
      .catch((err) => {
        alert("Error during project initializing: " + err.message)
      })
  }

  // UPDATE PROJECT

  const handleProjectUpdate = (updatedData) => {
    if (!selectedProject) return

    const bodyPayload = {
      projectName: updatedData.title,
      projectDescription: updatedData.description,
      expiryDate: updatedData.expiryDate || null,
    }

    fetch(`http://localhost:3001/api/projects/${selectedProject.projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyPayload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text()
          throw new Error(err || "Failed to update project")
        }
        return res.json()
      })
      .then((updatedProject) => {
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.projectId === updatedProject.projectId ? updatedProject : proj
          )
        )

        handleCloseUpdate()
      })
      .catch((err) => {
        alert("Error updating project: " + err.message)
      })
  }

  // DELETE PROJECT

  const handleProjectDelete = (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return
    }

    fetch(`http://localhost:3001/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete project")
        }
        setProjects((prev) =>
          prev.filter((proj) => proj.projectId !== projectId)
        )
      })
      .catch((err) => {
        alert("Error deleting project: " + err.message)
      })
  }

  // OPEN PROJECT

  const handleOpenProject = (projectId) => {
    navigateProject(`/project/${projectId}`)
  }
  // COMPONENT

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

      <Container fluid className="wrapper mt-4">
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
        <hr className="brInterruption my-5" />
        <h3 className="projectListTextTitle ps-3">Your Projects:</h3>
        <Row className="flex-grow-1 p-3">
          <Col className="" lg={8}>
            <div className="unorderListDiv p-2">
              {error && <p className="text-danger">{error}</p>}
              <ul className="unorderList ps-4 mt-3">
                {projects.length === 0 && !error && (
                  <li className="singleProjectList p-1">
                    No projects found. :(
                  </li>
                )}
                {projects.map((proj) => (
                  <li
                    key={proj.projectId}
                    className="singleProjectList py-1 d-flex flex-row align-items-center mb-5 p-1"
                  >
                    <div className="flex-grow-1 projectLi">
                      <div className="d-flex flex-column">
                        <strong
                          className="d-flex align-items-center projectSingleTitle"
                          onClick={() => handleOpenProject(proj.projectId)}
                        >
                          <i className="bulletPoint bi bi-folder2-open me-3"></i>{" "}
                          {proj.projectName}{" "}
                          {proj.isOverdue && (
                            <span style={{ color: "red" }}> [OVERDUE]</span>
                          )}
                        </strong>
                        <div>{proj.projectDescription} </div>
                      </div>
                      <hr className="brInterruption" />
                      <div>
                        <strong className="memberTaskCounters">Members:</strong>{" "}
                        {proj.memberCount} |{" "}
                        <strong className="memberTaskCounters">Tasks: </strong>
                        {proj.taskCount}
                        <hr className="brInterruption" />
                        <div className="d-flex flex-column">
                          <strong className="creationExpiryDates">
                            Creation Date:
                          </strong>{" "}
                          {proj.creationDate}
                          <strong className="creationExpiryDates">
                            Expiry Date
                          </strong>{" "}
                          {proj.expiryDate}
                        </div>
                      </div>
                      <hr className="divisionBar" />
                    </div>
                    <div className="d-flex flex-row px-4">
                      <Button
                        className="modalSaveButton me-2"
                        onClick={() => handleShowUpdate(proj)}
                      >
                        Update
                      </Button>
                      <Button
                        className="modalDeleteButton me-2"
                        onClick={() => handleProjectDelete(proj.projectId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col
            className="sticky-sideBar d-flex flex-column justify-content-start"
            lg={4}
          >
            <div className="searchBox frosted-glass py-5 px-5 text-center">
              <h3>Search your Project here</h3>
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
                onClick={handleShowProject}
                // onClick={() => {
                //   navigateSinglePJT("/Project")
                // }}
                // to="/Project"
              >
                START <br /> a brend new ONE!
              </Button>
              <ProjectModalForm
                show={showProjectModal}
                handleClose={handleCloseProject}
                onSubmit={handleProjectSubmit}
              />
              {showUpdateModal && (
                <ProjectModalUpdate
                  show={showUpdateModal}
                  handleClose={handleCloseUpdate}
                  onSubmit={handleProjectUpdate}
                  project={selectedProject}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Projects

// <Nav.Link className="newProjectLink" onClick={handleShowProject}>
//   New Project
// </Nav.Link>
//
