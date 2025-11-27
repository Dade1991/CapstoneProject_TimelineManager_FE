import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../AuthContext"
import ProjectModalForm from "./ProjectModalForm"
import ProjectModalUpdate from "./ProjectModalUpdate"
import MemberModal from "./MemberModal"
import HomeFooter from "./HomeFooter"
import "./Projects.css"

function Projects() {
  const navigateHome = useNavigate()
  const navigateProject = useNavigate()

  const { token } = useContext(AuthContext)
  const { user } = useContext(AuthContext)

  const [projectMembers, setProjectMembers] = useState({})
  const [expandedProjects, setExpandedProjects] = useState({})

  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)

  const [showProjectModal, setShowProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [selectedProjectForMembers, setSelectedProjectForMembers] =
    useState(null)

  const [editingUserId, setEditingUserId] = useState(null)
  const [selectedRole, setSelectedRole] = useState("")

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

  const handleOpenProject = (projectId) => {
    navigateProject(`/project/${projectId}`)
  }

  const handleShowMemberModal = (project) => {
    setSelectedProjectForMembers(project)
    setShowMemberModal(true)
    fetchAllUsers()
  }

  const handleCloseMemberModal = () => {
    setSelectedProjectForMembers(null)
    setShowMemberModal(false)
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

  // ---------- PROJECTS ----------

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
        console.log("Projects data received:", data)
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

  // ---------- MEMBERS ----------

  // recupera membri del progetto

  const fetchProjectMembers = (projectId) => {
    if (!token) return
    fetch(`http://localhost:3001/api/projects/${projectId}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching members")
        return res.json()
      })
      .then((members) => {
        setProjectMembers((prev) => ({
          ...prev,
          [projectId]: members,
        }))
      })
      .catch(console.error)
  }

  // recupera tutti gli utenti "amici", in realtà di tutta l'app (dovrebbero essre gli amici ma non ho tempo)

  const fetchAllUsers = () => {
    if (!token) return
    fetch("http://localhost:3001/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.content)) {
          setAllUsers(data.content)
        } else {
          setAllUsers([])
          console.error("Unexpected data format for users:", data)
        }
      })
      .catch(console.error)
  }

  // aggiungi un membro al progetto

  const onAddMember = (user, role) => {
    if (!selectedProjectForMembers) return

    fetch(
      `http://localhost:3001/api/projects/${selectedProjectForMembers.projectId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.userId, role }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add member.")
        if (res.status === 201) {
          // 201 Created with empty body, non fare res.json()
          return null
        }
        return res.json()
      })
      .then(() => {
        fetchProjectMembers(selectedProjectForMembers.projectId)
      })
      .catch((err) => alert(err.message))
  }

  // cambia la authority del membro da aggiungere

  const onUpdateMemberRole = (projectId, userId, newRole) => {
    fetch(
      `http://localhost:3001/api/projects/${projectId}/members/${userId}/role`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newRole }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update member role")
        return res.json()
      })
      .then(() => {
        fetchProjectMembers(projectId)
      })
      .catch((err) => alert(err.message))
  }

  // elimina il membro dal progetto

  const handleDeleteMember = (projectId, userId) => {
    if (!userId) {
      alert("Invalid user ID to delete")
      return
    }
    fetch(`http://localhost:3001/api/projects/${projectId}/members/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to remove member.")
        }
      })
      .then(() => {
        setProjectMembers((prev) => {
          const updateMembers = prev[projectId].filter(
            (member) => member.userId !== userId
          )
          return { ...prev, [projectId]: updateMembers }
        })
      })
      .catch((err) => alert(err.message))
  }

  // COMPONENT

  return (
    <>
      <Navbar expand="lg" className="projectNavbar frosted-glass-project">
        <Container fluid className="d-flex justify-content-between">
          {/* <Navbar.Brand href="#">Logo</Navbar.Brand> */}
          <div className="d-flex flex-row align-items-baseline">
            <p className="loggedText m-0 me-2">Logged as</p>
            <p className="loggedNickname m-0">{user.nickname}</p>
          </div>
          <div>
            <Button
              className="returnHomeButton"
              onClick={() => {
                navigateHome("/Home")
              }}
            >
              <div className="d-flex flex-row">
                <p className="returnDetails m-0 me-2">Hompage</p>
                <i className="returnIcon bi bi-arrow-return-left"></i>
              </div>
            </Button>
          </div>
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
              {/* ___________________________________________________________________________________________________________________________ */}
              {projects.map((proj) => (
                <li
                  key={proj.projectId}
                  className="singleProjectList px-3 py-2 mb-4"
                >
                  {proj.creatorId === user.userId && (
                    <div className="creatorSPECIALindicator m-0 d-inline p-2">
                      <i className="creatorIcon bi bi-star-fill"></i>
                    </div>
                  )}
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
                      <hr className="brInterruption my-2" />
                      <p className="descriptionTitle mt-2 m-0">
                        Project Description:
                      </p>
                      <div className="projectCardTextDescriptionSPECIAL p-2 mb-3">
                        {proj.projectDescription}{" "}
                      </div>
                      <hr className="brInterruption my-2" />
                      <Row>
                        <Col className="projectCounter" md={6}>
                          <div className="d-flex justify-content-between align-items-center inputDateData">
                            <strong className="memberTaskCounters">
                              TOTAL Tasks:
                            </strong>
                            <div className="projectCardTextDescription">
                              {proj.taskCount}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center inputDateData">
                            <strong className="memberTaskCounters">
                              Members:
                            </strong>
                            <div className="projectCardTextDescription">
                              {proj.memberCount}
                            </div>
                          </div>
                        </Col>
                        <Col md={6} className="">
                          <div className="inputDateData d-flex flex-column align-items-end">
                            <strong className="creationExpiryDates">
                              Creation Date:
                            </strong>
                            <div className="projectCardTextDescription">
                              {proj.creationDate.split("T")[0]}
                            </div>
                          </div>
                          <div className="inputDateData d-flex flex-column align-items-end">
                            <strong className="creationExpiryDates">
                              Expiry Date:
                            </strong>
                            <div className="projectCardTextDescription">
                              {proj.expiryDate
                                ? proj.expiryDate.split("T")[0]
                                : ""}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="">
                        <Button
                          className="showMembersButton p-0"
                          onClick={() => {
                            setExpandedProjects((prev) => ({
                              ...prev,
                              [proj.projectId]: !prev[proj.projectId],
                            }))
                            if (!projectMembers[proj.projectId]) {
                              console.log(
                                "FETCHING MEMBERS FOR",
                                proj.projectId
                              )
                              fetchProjectMembers(proj.projectId)
                            }
                          }}
                        >
                          {expandedProjects[proj.projectId]
                            ? "HIDE MEMBERS"
                            : "SHOW MEMBERS"}{" "}
                          <i className="bi bi-caret-down-fill"></i>
                        </Button>
                      </div>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex flex-column align-items-center p-0 px-2"
                    >
                      <p className="projectSettingText mb-2 text-center">
                        PROJECT SETTINGS
                      </p>
                      <div className="d-flex flex-column align-bottom w-100">
                        <Button
                          className="modalSaveButton mb-2 d-flex justify-content-center align-items-center"
                          onClick={() => handleShowUpdate(proj)}
                        >
                          <p className="m-0">EDIT</p>
                        </Button>
                        <Button
                          className="memberButton mb-2 d-flex justify-content-center align-items-center"
                          onClick={() => handleShowMemberModal(proj)}
                        >
                          <p className="m-0">MEMBERS</p>
                        </Button>
                        <Button
                          className="modalDeleteButton d-flex justify-content-center align-items-center"
                          onClick={() => handleProjectDelete(proj.projectId)}
                        >
                          <p className="m-0">DELETE</p>
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  {expandedProjects[proj.projectId] &&
                    projectMembers[proj.projectId] && (
                      <div className="memberProjectCardDetails d-flex align-items-center p-2 mt-2">
                        <div className="d-flex flex-column flex-grow-1">
                          <ul className="p-0">
                            {projectMembers[proj.projectId].map((member) => (
                              <li
                                key={member.userId}
                                className="d-flex flex-row"
                              >
                                <Col md={2} className="p-2">
                                  <div className="avatarBox">
                                    <img
                                      className="avatarImg"
                                      src={member.avatarUrl || "/default.png"}
                                      alt={member.userFullName}
                                    />
                                  </div>
                                </Col>
                                <Col md={9} className="ps-2">
                                  <div className="">
                                    <div className="nicknameText">
                                      {member.userFullName}
                                    </div>
                                    <div className="projectInfosText d-flex flex-row">
                                      <p className="m-0 me-2">Role_</p>
                                      {editingUserId === member.userId ? (
                                        <>
                                          <select
                                            className="memberDropdown"
                                            value={selectedRole}
                                            onChange={(e) =>
                                              setSelectedRole(e.target.value)
                                            }
                                          >
                                            <option value="GUEST">Guest</option>
                                            <option value="ADMIN">Admin</option>
                                            <option value="CREATOR">
                                              Creator
                                            </option>
                                          </select>
                                          <Button
                                            className="roleEditSaveButton ms-2"
                                            onClick={() => {
                                              onUpdateMemberRole(
                                                proj.projectId,
                                                member.userId,
                                                selectedRole
                                              )
                                              setEditingUserId(null)
                                            }}
                                          >
                                            UPGRADE
                                          </Button>
                                          <Button
                                            className="roleEditCancelButton ms-2"
                                            onClick={() =>
                                              setEditingUserId(null)
                                            }
                                          >
                                            CLOSE
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <strong className="roleText m-0 me-2">
                                            {member.role}
                                          </strong>
                                          <Button
                                            className="memberEditButton"
                                            onClick={() => {
                                              setEditingUserId(member.userId)
                                              setSelectedRole(member.role)
                                            }}
                                          >
                                            <i className="memberIcon bi bi-pencil-square"></i>
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  {/* <div className="projectInfosText">
                                    Tasks Counter_{" "}
                                    <strong className="taskCounterText m-0">
                                      {member.taskCount}
                                    </strong>
                                  </div> */}
                                </Col>
                                <Col
                                  className="d-flex justify-content-center p-2"
                                  md={1}
                                >
                                  <Button
                                    // onClick={}
                                    className="memberDeleteButton"
                                    onClick={() =>
                                      handleDeleteMember(
                                        proj.projectId,
                                        member.userId
                                      )
                                    }
                                  >
                                    <div>
                                      <p className="removeMemberText m-0">
                                        REMOVE
                                      </p>
                                    </div>
                                  </Button>
                                </Col>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  {showMemberModal && selectedProjectForMembers && (
                    <MemberModal
                      show={showMemberModal}
                      handleClose={handleCloseMemberModal}
                      allUsers={allUsers || []}
                      onAddMember={onAddMember}
                      onUpdateMemberRole={onUpdateMemberRole}
                      projectId={selectedProjectForMembers.projectId}
                    />
                  )}
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
