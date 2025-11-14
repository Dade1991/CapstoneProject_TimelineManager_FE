import { Container, Row, Col } from "react-bootstrap"
import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import MainBoard from "./MainBoard"
import "./Project.css"
import ProjectModalForm from "./ProjectModalForm"
import TaskModalForm from "./TaskModalForm"
import ProjectModalUpdate from "./ProjectModalUpdate"
import TaskModalUpdate from "./TaskModalUpdate"
import AddMemberModal from "./AddMemberModal"
import { useNavigate } from "react-router-dom"

function Project() {
  const navigateHome = useNavigate()

  // Project

  const [showProjectModal, setShowProjectModal] = useState(false)

  const handleShowProject = () => setShowProjectModal(true)
  const handleCloseProject = () => setShowProjectModal(false)

  const handleProjectSubmit = (projectData) => {
    // Logica per inviare dati al backend o Redux
    console.log("Dati progetto da inviare:", projectData)
    // Chiudere modale dopo submit
    handleCloseProject()
  }

  // Task

  const [showTaskModal, setShowTaskModal] = useState(false)

  const handleShowTask = () => setShowTaskModal(true)
  const handleCloseTask = () => setShowTaskModal(false)

  const handleTaskSubmit = (taskData) => {
    console.log("Dati task da inviare:", taskData)
    handleCloseTask()
  }

  // Update Project

  const [showProjectModalUpdate, setShowProjectModalUpdate] = useState(false)

  const handleShowUpdateProject = () => setShowProjectModalUpdate(true)
  const handleCloseUpdateProject = () => setShowProjectModalUpdate(false)

  const handleUpdateProjectSubmit = (updatedProjectData) => {
    console.log("Dati progetto aggiornati:", updatedProjectData)
    handleCloseUpdateProject()
  }

  // Add Member

  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  const handleShowAddMember = () => setShowAddMemberModal(true)
  const handleCloseAddMember = () => setShowAddMemberModal(false)

  const handleAddMemberSubmit = (memberData) => {
    console.log("Nuovo membro aggiunto:", memberData)
    handleCloseAddMember()
  }

  return (
    <>
      <Navbar expand="lg" className="projectNavbar frosted-glass-project">
        <Container fluid>
          {/* <Navbar.Brand href="#">Logo</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link className="newProjectLink" onClick={handleShowProject}>
                New Project
              </Nav.Link>
              <ProjectModalForm
                show={showProjectModal}
                handleClose={handleCloseProject}
                onSubmit={handleProjectSubmit}
              />
              <NavDropdown
                title="Project Settings"
                className="projectSettingsLink z-3"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item onClick={handleShowUpdateProject}>
                  Update Project info
                </NavDropdown.Item>

                <ProjectModalUpdate
                  show={showProjectModalUpdate}
                  handleClose={handleCloseUpdateProject}
                  onSubmit={handleUpdateProjectSubmit}
                />
                <NavDropdown.Item onClick={handleShowAddMember}>
                  Add Members
                </NavDropdown.Item>
                <AddMemberModal
                  show={showAddMemberModal}
                  handleClose={handleCloseAddMember}
                  onSubmit={handleAddMemberSubmit}
                />
                <NavDropdown.Divider />
                <NavDropdown.Item>Delete Project</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="addTaskLink" onClick={handleShowTask}>
                Add task
              </Nav.Link>
              <TaskModalForm
                show={showTaskModal}
                handleClose={handleCloseTask}
                onSubmit={handleTaskSubmit}
              />
              {/* <Nav.Link className="activityLogLink" href="#">
                Activity_Log
              </Nav.Link> */}
            </Nav>
            <Form className="d-flex flex-row justify-content-center align-items-center">
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
              <Button className="saveProjectButton px-4 py-1">
                <div className="d-flex flex-row">
                  <i className="saveProjectButtonDetails bi bi-bookmark-check me-2"></i>
                  <p className="saveProjectButtonDetails m-0">Save</p>
                </div>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        fluid
        className="d-flex justify-content-center bg-info mt-4 z-0"
      >
        <MainBoard />
      </Container>
    </>
  )
}

export default Project
