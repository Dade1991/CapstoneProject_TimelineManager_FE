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

        setProjects((prev) => [...prev, newProject])
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
              <p className="homepageText m-0 me-2">Hompage</p>
              <i className="homepageReturnIcon bi bi-arrow-return-left"></i>
            </div>
          </Button>
        </Container>
      </Navbar>

      <Container fluid className="wrapperMainBoard">
        <div className="me-4 ms-4 mb-4 m-0">
          <h3 className="projectsListTextTitle py-3 text-center">
            <strong className="highlightText">PROJECTs SECTION</strong>
          </h3>
          <p className="projectJoke mt-2 text-center fst-italic">
            "If at first you don’t succeed, call it version 1.0."
          </p>
        </div>
        <hr className="brInterruptionBIG my-4" />
        <div className="">
          <h4 className="descriptionSubtitle text-center fst-italic py-5 px-3">
            In this section, you can easily access your projects,
            <br />
            get a quick info overview, create new projects, <br />
            and manage them effortlessly by adding or removing partners!
          </h4>
        </div>
        <Row className="p-3 px-4">
          <Col className="unorderListDiv" lg={8}>
            {error && <p className="text-danger">{error}</p>}
            <ul className="unorderList p-0">
              {projects.length === 0 && !error && (
                <li className="singleProjectListNotFound p-3">
                  Project's list is empty :(
                </li>
              )}
              {projects.map((proj) => (
                <li key={proj.projectId} className="singleProjectList p-3 mb-4">
                  <Row className="d-flex flex-row">
                    <Col md={10} className="projectLi align-items-center">
                      <div className="w-100">
                        <div
                          className="d-flex align-items-center projectSingleTitle w-100"
                          onClick={() => handleOpenProject(proj.projectId)}
                        >
                          <i className="bulletPoint bi bi-folder2-open me-3"></i>{" "}
                          <div className="d-flex">
                            {proj.projectName}{" "}
                            {proj.isOverdue && (
                              <span style={{ color: "red" }}> [OVERDUE]</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="brInterruption my-4" />
                      <p className="descriptionTitle mt-2 m-0">
                        Project Description:
                      </p>
                      <div className="projectCardTextDescriptionSPECIAL p-2 mb-3">
                        {proj.projectDescription}{" "}
                      </div>
                      <hr className="brInterruption my-4" />
                      <Row className="">
                        <Col className="dxProjectCardDetails d-flex align-items-center">
                          <div className="d-flex flex-column flex-grow-1 pe-3">
                            <div className="d-flex justify-content-between align-items-center inputDateData">
                              <strong className="memberTaskCounters">
                                Members:
                              </strong>
                              <div className="projectCardTextDescription">
                                {proj.memberCount}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center inputDateData">
                              <strong className="memberTaskCounters">
                                Tasks:
                              </strong>
                              <div className="projectCardTextDescription">
                                {proj.taskCount}
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col className="">
                          <div className="inputDateData d-flex flex-column align-items-end">
                            <strong className="creationExpiryDates">
                              Creation Date:
                            </strong>
                            <div className="projectCardTextDescription">
                              {proj.creationDate}
                            </div>
                          </div>
                          <div className="inputDateData d-flex flex-column align-items-end">
                            <strong className="creationExpiryDates">
                              Expiry Date:
                            </strong>
                            <div className="projectCardTextDescription">
                              {proj.expiryDate}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex justify-content-end align-items-start"
                    >
                      <div className="d-flex flex-column align-bottom">
                        <Button
                          className="modalSaveButton mb-2"
                          onClick={() => handleShowUpdate(proj)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="modalDeleteButton"
                          onClick={() => handleProjectDelete(proj.projectId)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
          </Col>
          <Col
            className="sticky-sideBar d-flex flex-column justify-content-start"
            lg={4}
          >
            <div className="searchBox frosted-glass p-3 px-5">
              <div className="text-center">
                <Button
                  className="newProjectButton py-2 px-4"
                  onClick={handleShowProject}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <i className="newProjectIcon bi bi-kanban"></i>
                    <p className="m-0">NEW PROJECT</p>
                  </div>
                </Button>
              </div>
              <hr className="brInterruption my-3" />
              <div className="">
                <div>
                  <h3>Search</h3>
                </div>
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
              </div>

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
